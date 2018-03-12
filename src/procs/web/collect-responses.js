import 'babel-polyfill';
import co from 'co';

import {ChildTemplate} from '../child-process';
import Mixin from '../../lib/Mixin';

import SurveyExport from '../concerns/SurveyExport';
import Cursor from '../concerns/Cursor';
import Aggregation from '../concerns/Aggregation';

import AnswerCollector from '../concerns/AnswerCollector';

import Statistic from '../../models/Statistic';
import Answer from '../../models/Answer';
import Location from '../../models/Location';
import User from '../../models/User';


export default class CollectResponses
extends Mixin.mixin(ChildTemplate, SurveyExport, Cursor, Aggregation) {
  execute(proc) {
    this.surveyId = proc.args;
    return this.getSurvey()
    .then(() => this.getExportHeader())
    .then(() => this.collectAnswers())
    .then((response) => this.response = response)
    .then(() => this.updateExportHeader())
    .then(() => this.response);
  }

  collectAnswers() {
    this.answersCount = 0;
    this.totalStatsCount = 0;
    this.aggregates = {};

    return this.iterateCursor(Answer.find({
      survey: this.surveyId,
      lastExport: null,
    }).limit(50000), 'collectOneAnswer')
    .then((answers) => this.answers = answers)
    .then(() => this._saveAllAggregates())
    .then(() => ({
      answers: this.answers,
      answersCount: this.answersCount,
      totalStatsCount: this.totalStatsCount,
    }));
  }

  collectOneAnswer(answer) {
    if (!answer.rootQuestion) {
      return {status: 'SKIPPED', reason: 'EMPTY', _id: answer._id};
    }
    if (answer.version === 0) {
      return {status: 'SKIPPED', reason: 'VERSION0', _id: answer._id};
    }

    const survey = this.survey;
    const surveyPP = this.survey.postProcessing || [];
    let statsCount = 0;
    const collector = new AnswerCollector({
      survey, answer,
      keys: this.collectionKeys,
    });

    const promises = [];
    const self = this;
    for (let ctx of collector.collectRespondents()) {
      ctx.addValue('UPLOAD_TIME', answer.createdAt.getTime(), 'Upload time');
      ctx.addValue('ANSWER_ID', answer._id, 'Answer Id');
      promises.push(
        co(function* () {
          for (let p of surveyPP) {
            let func = p.class && self[`_ppClass${p.class}`];
            let ret;
            if (func) ret = yield (func(p, ctx) || {});
            if (ret && ret._ignore) return;
          }
          yield ctx.data;
          return self.writeStatsObj(ctx.data)
          .then(() => ++statsCount);
        })
      );
    }
    return Promise.all(promises)
    .then(() => {
      answer.set('lastExport', new Date());
      return answer.save();
    }).then(() => {
      this.totalStatsCount = this.totalStatsCount + statsCount;
      ++this.answersCount;
      return {status: 'DONE', statsCount, _id: answer._id};
    }).catch((e) => {
      e = e || {message: 'UNKNOWN'};
      console.error(e.message || e);
      return Promise.resolve({status: 'ERROR', _id: answer._id});
    });
  }

  _ppClassSurveyor({
    surveyorKey='Q_1_1',
  }, ctx) {
    const obj = ctx.data;
    const username = obj[surveyorKey];
    if (!username) return {_ignore: true};
    return User.findOne({username}).then((user) => {
      if (!user || !user.payload) return;
      ['DISTRICT', 'BLOCK', 'PANCHAYAT'].forEach((loc) => {
        ['NAME', 'CODE'].forEach((dat) => {
          ctx.addValue(
            `${loc}_${dat}`,
            user.payload[`${loc}_${dat}`],
            `Location payload`
          );
        });
      });
    });
  }

  _ppClassHabitation({habitationKey}, ctx) {
    if (!habitationKey) return;
    const obj = ctx.data;
    let locSpec = [];
    for (let loc of 'DISTRICT BLOCK PANCHAYAT'.split(' ')) {
      const key = `${loc}_CODE`;
      if (!obj[key]) return {_ignore: true};
      locSpec.push(obj[key]);
    }
    return Location.findOne({type: 'PANCHAYAT', uid: locSpec.join('/')})
    .then((loc) => {
      if (!loc || !loc.children || !loc.children.length) return;
      if (!obj[habitationKey]) return;
      let habitation = loc.children.find(
        (child) => (child.name === obj[habitationKey])
      );
      if (habitation) {
        ctx.addValue(
          'HABITATION_CODE',
          habitation.code,
          'Habitation Code',
        );
      }
    });
  }

  _ppClassDummy({select}, ctx) {
    const obj = ctx.data;
    if (select && !obj[select]) return {_ignore: true};
    for (let key of Object.keys(obj)) {
      if (typeof obj[key] === 'string') {
        if (obj[key].toUpperCase && obj[key].trim().toUpperCase() === 'DUMMY') {
          return {_ignore: true};
        }
      }
    }
  }

  _ppClassHousehold({
    select='Q_1_12',
    surveyorKey='Q_1_1',
    habitationKey='Q_1_6',
  }, ctx) {
    const obj = ctx.data;
    if (!obj[surveyorKey]) return;
    if (!obj[select]) return {_ignore: true};
    for (let key of Object.keys(obj)) {
      if (typeof obj[key] === 'string') {
        if (obj[key].toUpperCase && obj[key].trim().toUpperCase() === 'DUMMY') {
          return {_ignore: true};
        }
      }
    }
    const username = obj[surveyorKey];
    return User.findOne({username})
    .then((user) => {
      if (!user || !user.payload) return;
      let locSpec = [];
      ['DISTRICT', 'BLOCK', 'PANCHAYAT'].forEach((loc) => {
        ['NAME', 'CODE'].forEach((dat) => {
          ctx.addValue(
            `${loc}_${dat}`,
            user.payload[`${loc}_${dat}`],
            `Location payload`
          );
        });
        locSpec.push(obj[`${loc}_CODE`]);
      });
      return Location.findOne({type: 'PANCHAYAT', uid: locSpec.join('/')});
    }).then((loc) => {
      if (!loc || !loc.children || !loc.children.length) return;
      if (!obj[habitationKey]) return;
      let habitation = loc.children.find(
        (child) => (child.name === obj[habitationKey])
      );
      if (habitation) {
        ctx.addValue(
          'HABITATION_CODE',
          habitation.code,
          'Habitation Code',
        );
      }
    });
  }


  writeStatsObj(obj) {
    return Statistic.create({
      key: this.surveyId,
      type: 'SurveyResponse',
      data: obj,
    }).then(
      (stat) => this.accumulateAggregates(stat, this.survey.aggregates)
    );
  }
}
