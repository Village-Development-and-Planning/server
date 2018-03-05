import 'babel-polyfill';
import co from 'co';

import {ChildTemplate} from '../child-process';
import Mixin from '../../lib/Mixin';
import SurveyExport from '../concerns/SurveyExport';
import Cursor from '../concerns/Cursor';
import Aggregation from '../concerns/Aggregation';

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
    }).limit(5000), 'collectOneAnswer')
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

    const _this = this;
    let statsCount = 0;
    const keys = this.collectionKeys;
    if (!keys.posUPLOAD_TIME) {
      keys.push('UPLOAD_TIME');
      keys.posUPLOAD_TIME = 'Time of upload.';
    }
    if (!keys.posANSWER_ID) {
      keys.push('ANSWER_ID');
      keys.posANSWER_ID = 'Answer _id';
    }
    return co(function* () {
      try {
        for (let {question, context} of _this.survey.respondentsIn(
            answer, {keys: _this.collectionKeys}
          )
        ) {
          for (let o of question.collectRespondent(context)) {
            if (answer.createdAt) {
              o.UPLOAD_TIME = answer.createdAt.getTime();
              o.ANSWER_ID = answer._id;
            }
            yield _this.writeStatsObj(o);
            ++statsCount;
          }
        }
        answer.set('lastExport', new Date());
        return answer.save()
        .then(() => _this.totalStatsCount = _this.totalStatsCount + statsCount)
        .then(() => ++_this.answersCount)
        .then(() => ({status: 'DONE', statsCount, _id: answer._id}));
      } catch (e) {
        return Promise.resolve({status: 'ERROR', _id: answer._id});
      }
    });
  }

  writeStatsObj(obj) {
    return co(function* () {
      return yield obj;
    }).then(
      (obj) => Statistic.create({
        key: this.surveyId,
        type: 'SurveyResponse',
        data: obj,
      })
    ).then((stat) => this.accumulateAggregates(stat, this.survey.aggregates));
  }
}
