import 'babel-polyfill';
import co from 'co';

import {ChildTemplate} from '../child-process';
import Mixin from '../../lib/Mixin';
import SurveyExport from '../concerns/SurveyExport';
import Cursor from '../concerns/Cursor';

import Statistic from '../../models/Statistic';
import Answer from '../../models/Answer';

import {Parser as FormulaParser} from 'hot-formula-parser';

export default class CollectResponses
extends Mixin.mixin(ChildTemplate, SurveyExport, Cursor) {
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
    }), 'collectOneAnswer').then((answers) => this.answers = answers)
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
    return co(function* () {
      for (let {question, context}
        of _this.survey.respondentsIn(
          answer, {keys: _this.collectionKeys}
        )
      ) {
        for (let o of question.collectRespondent(context)) {
          yield _this.writeStatsObj(o);
          ++statsCount;
        }
      }
      answer.set('lastExport', new Date());
      return answer.save()
      .then(() => _this.totalStatsCount = _this.totalStatsCount + statsCount)
      .then(() => ++_this.answersCount)
      .then(() => ({status: 'DONE', statsCount, _id: answer._id}));
    });
  }


  _parseExpression(exp) {
    const parsed = this.parser.parse(exp);
    if (parsed.error) {
      return;
    }
    return parsed.result;
  }

  _findAggregate({type, key}) {
    let objKey = `${type}/${key}`;
    let agg;
    if (agg = this.aggregates[objKey]) {
      return Promise.resolve(agg);
    }
    return this.aggregates[objKey] = Statistic.findOne({type, key})
    .then((stat) => stat || {type, key})
    .then((stat) => this.aggregates[objKey] = stat);
  }

  _saveAllAggregates() {
    return Promise.all(
      Object.keys(this.aggregates)
      .map((key) => {
        const agg = this.aggregates[key];
        if (agg.save) return agg.save();
        console.log(agg);
        return Statistic.findOneAndUpdate(
          {type: agg.type, key: agg.key},
          agg,
          {upsert: true, new: true}
        ).then((stat) => console.log('Saved stat: ', stat));
      })
    ).catch((err) => console.log('error saving aggreagtes'));
  }

  accumulateAggregates(stat) {
    if (!this.survey.aggregates || !this.survey.aggregates.length) return;
    if (!stat.data) return;

    this.parser = new FormulaParser();
    this.parser.on('callVariable', (name, done) => {
      const obj = stat.data;
      if (obj.hasOwnProperty(name)) {
        let val = obj[name];
         done(val);
      }
    });

    const promises = [];
    for (let agg of this.survey.aggregates) {
      let type, key, name, data;
      if (agg.select) {
        if (!this._parseExpression(agg.select)) continue;
      }
      if (agg.key) {
        key = this._parseExpression(agg.key);
      }
      if (!key) continue;
      key = key || null;

      if (agg.type) {
        type = this._parseExpression(agg.type);
      }
      type = type || 'Aggregate';

      if (agg.name) {
        name = this._parseExpression(agg.name);
      }
      name = name || this.survey.name || 'Unnamed';

      promises.push(
        this._findAggregate({type, key})
        // Statistic.findOne({type, key})
        // .then((stat) => stat || new Statistic({type, key}))
        .then((stat) => {
          if (typeof agg.data === 'object') {
            data = stat.data = stat.data || {};
            for (let dataKey of Object.keys(agg.data)) {
              let dataObj = agg.data[dataKey];
              if (!dataObj) continue;
              let formula, type;
              if (typeof dataObj === 'string') {
                formula = dataObj;
              } else {
                formula = dataObj.formula;
                type = dataObj.type;
              }
              type = type || 'count';

              if (!formula) {
                console.log(`No formula: ${dataKey}`);
                continue;
              } else {
                let value = this._parseExpression(formula);
                if (typeof value === 'undefined') continue;
                if (type === 'count') {
                  value = parseInt(value);
                  if (value === NaN) value = 0;

                  let obj = data[dataKey] = data[dataKey] || {};
                  obj.value = obj.value || 0;
                  obj.count = obj.count || 0;

                  obj.value = obj.value + value;
                  obj.count++;
                } else if (type === 'histogram') {
                  let obj = data[dataKey] = data[dataKey] || {};

                  obj.value = obj.value || {};
                  obj.count = obj.count || 0;
                  obj.value[value] = obj.value[value] || 0;
                  obj.value[value]++;
                  obj.count++;
                }
              }
            }
          } else {
            data = agg.data;
          }
        })
        .catch((err) => {
          console.log(err);
        })
      );
    }
    return Promise.all(promises).then((p) => p.length);
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
    ).then((stat) => this.accumulateAggregates(stat));
  }
}
