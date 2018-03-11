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
    let statsCount = 0;
    const collector = new AnswerCollector({
      survey, answer,
      keys: this.collectionKeys,
    });

    const promises = [];
    for (let ctx of collector.collectRespondents()) {
      ctx.addValue('UPLOAD_TIME', answer.createdAt.getTime(), 'Upload time');
      ctx.addValue('ANSWER_ID', answer._id, 'Answer Id');
      promises.push(
        this.writeStatsObj(ctx.data).then(() => 1),
      );
      ++statsCount;
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
      return Promise.resolve({status: 'ERROR', _id: answer._id});
    });
  }

  writeStatsObj(obj) {
    const self = this;
    return co(function* () {
      obj = yield obj;
      const pp = self.survey.postProcessing;
      if (!pp || !pp.length) return;

      for (let post of pp) {
        if (!post.class || !self[`_ppClass${post.class}`]) continue;
        const ret = yield Promise.resolve(
          self[`_ppClass${post.class}`](post, obj)
        );
        if (ret && ret._ignore) {
          return true;
        }
      }
      return;
    }).then(
      (ignore) => ignore || Statistic.create({
        key: this.surveyId,
        type: 'SurveyResponse',
        data: obj,
      }).then(
        (stat) => this.accumulateAggregates(stat, this.survey.aggregates)
      )
    );
  }
}
