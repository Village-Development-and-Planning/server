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
    .then(() => {
      if (this.survey.answerStats) {
        this.surveyProcessed = this.survey.answerStats.processed;
      }
      if (!this.surveyProcessed) this.surveyProcessed = 0;
    })
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
    .then(() => this.saveAggregates())
    .then(() => this._saveAnswerStats())
    .then(() => console.log(JSON.stringify({
      _logHeader: 'stats',
      answers: this.answers,
      answersCount: this.answersCount,
      totalStatsCount: this.totalStatsCount,
    })));
  }

  _saveAnswerStats() {
    this.survey.answerStats = {
      processed: this.surveyProcessed + this.answersCount,
    };
    this.survey.markModified('answerStats');
    return this.survey.save();
  }

  collectOneAnswer(answer) {
    if (!answer.rootQuestion) {
      (console.log(JSON.stringify({_logHeader: 'answer',
        _id: answer._id,
        status: 'SKIPPED', reason: 'EMPTY',
      })));
      return;
    }
    if (answer.version === 0) {
      (console.log(JSON.stringify({_logHeader: 'answer',
        _id: answer._id,
        status: 'SKIPPED', reason: 'VERSION0',
      })));
      return;
    }

    const survey = this.survey;
    const surveyPP = this.survey.postProcessing || [];
    let statsCount = 0;
    const collector = new AnswerCollector({
      survey, answer,
      keys: this.answerKeys,
      respondents: this.respondents,
    });

    const promises = [];
    for (let ctx of collector.collectRespondents()) {
      ctx.addValue('UPLOAD_TIME', answer.createdAt.getTime(), 'Upload time');
      ctx.addValue('ANSWER_ID', answer._id, 'Answer Id');
      promises.push(
        co.call(this, function* () {
          // console.log('Survey Response constructed.');
          for (let p of surveyPP) {
            let func = p.class && this[`_ppClass${p.class}`];
            let ret;
            if (func) ret = yield Promise.resolve(func(p, ctx));
            if (ret && ret._ignore) {
              return;
            }
          }
          yield ctx.data;
          return this.writeStatsObj(ctx.data, ctx.respondent || null)
          .then(() => ++statsCount);
        }),
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
      console.error('Error saving answer:');
      console.error(e.message || e);
      console.error(e.stack);
      return Promise.resolve({status: 'ERROR', _id: answer._id});
    }).then((remarks) => {
      if (this.answersCount && !(this.answersCount % 100)) {
        return this._saveAnswerStats()
        .then(() => remarks);
      }
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
    if (select) {
      const stat = new Statistic();
      stat.data = ctx.data;
      const parser = stat.parser();
      let value;
      if (typeof select === 'string') {
        value = parser.value(select);
      } else if (Array.isArray(select)) {
        value = select.some(parser.value.bind(parser));
      }
      if (!value) {
        return {_ignore: true};
      }
    }
    for (let key of Object.keys(obj)) {
      if (typeof obj[key] === 'string') {
        if (obj[key].toUpperCase && obj[key].trim().toUpperCase() === 'DUMMY') {
          return {_ignore: true};
        }
      }
    }
  }

  writeStatsObj(obj, resp) {
    return Statistic.create({
      key: `${this.surveyId}/${resp}`,
      type: 'SurveyResponse',
      data: obj,
    })
    .then((stat) => {
      return stat;
    })
    .then(
      (stat) => this.accumulateAggregates(
        {stat, aggregates: this.survey.aggregates}
      )
    );
  }
}
