import 'babel-polyfill';
import {ChildTemplate} from '../child-process';

import Survey from '../../models/Survey';
import Answer from '../../models/Answer';
import Statistic from '../../models/Statistic';

import {Parser as FormulaParser} from 'hot-formula-parser';

export default class CollectResponses extends ChildTemplate {
  execute(proc) {
    this.surveyId = proc.args;
    return this.getSurvey()
    .then(() => this.getExportHeader())
    .then(() => this.collectAnswers())
    .then((response) => this.response = response)
    .then(() => this.updateExportHeader())
    .then(() => this.response);
  }

  getSurvey() {
    return Survey
    .findOne({_id: this.surveyId})
    .then((survey) => {
      this.survey = survey;
      if (!survey) {
        return Promise.reject(`Survey: ${this.surveyId} not found.`);
      }
    });
  }

  collectAnswers() {
    this.answersLog = [];
    const cursor = Answer.find({
      survey: this.surveyId,
      lastExport: null,
    }).cursor();
    return new Promise((res, rej) => {
      cursor.on(
        'data',
        (ans) => this.collectOneAnswer(ans),
      );
      cursor.on('error', rej);
      cursor.on('end', () => res(Promise.all(this.answersLog)));
    });
  }

  sealAnswer(remarks) {
    remarks._id = this.currentAnswer._id;
    this.answersLog.push(
      Promise.all(this.statsPromises)
      .then(() => Answer.findOneAndUpdate(
        {_id: remarks._id},
        {lastExport: new Date()}
      )).catch((err) => console.log(err))
      .then(() => remarks)
    );
  }

  collectOneAnswer(answer) {
    if (!answer) return;
    this.currentAnswer = answer;
    this.currentWaitPromise = Promise.all([].concat(this.answersLog))
      .then(() => answer);

    if (!answer.rootQuestion) {
      this.sealAnswer({status: 'SKIPPED', reason: 'EMPTY'});
      return;
    }
    if (answer.version == 0) {
      this.sealAnswer({status: 'SKIPPED', reason: 'VERSION0'});
      return;
    }

    this.statsPromises = [];
    let statsCount = 0;
    for (let {question, context}
      of this.survey.respondentsIn(
        answer, {keys: this.collectionKeys}
      )
    ) {
      for (let o of question.collectRespondent(context)) {
        this.writeStatsObj(o);
        ++statsCount;
      }
    }
    this.sealAnswer({status: 'DONE', statsCount});
  }

  getExportHeader() {
    return Statistic
    .findOne({key: this.surveyId, type: 'SurveyResponse', name: 'objKeys'})
    .then((stat) => {
      this.collectionKeys = [];
      if (stat && stat.data) {
        this.collectionKeys = stat.data.keys;
        if (stat.data.keyDescriptions) {
          this.collectionKeys.forEach((key, idx) => {
            this.collectionKeys[`pos${key}`] = stat.data.keyDescriptions[idx];
          });
        }
      }
    });
  }

  sortKeys() {
    return this.collectionKeys
    .map((key, index) => ({key, index}))
    .sort(this._keyListComparator.bind(this));
  }

  _questionNumberParser(acc, el) {
    let match = el.match(/^([a-zA-Z]*)([0-9]*)$/);
    if (match && match[2]) {
      acc.push({
        num: parseInt(match[2]),
        type: match[1] || '|question',
      });
    }
    return acc;
  }

  _keyListComparator(arr1, arr2) {
    arr1 = arr1.key;
    arr2 = arr2.key;
    const isQNum = arr1.startsWith('Q_');
    const otherIsQNum = arr2.startsWith('Q_');
    if (isQNum) {
      if (!otherIsQNum) return 1;
    } else {
      if (otherIsQNum) return -1;
      if (arr1 < arr2) return -1;
      if (arr1 > arr2) return 1;
      return 0;
    }
    arr1 = arr1.split('_').reduce(this._questionNumberParser, []);
    arr2 = arr2.split('_').reduce(this._questionNumberParser, []);

    let len = arr1.length;
    if (arr2.length < len) len = arr2.length;
    for (let i=0; i<len; i++) {
      if (arr1[i].type < arr2[i].type) return -1;
      if (arr2[i].type < arr1[i].type) return 1;

      if (arr1[i].num < arr2[i].num) return -1;
      if (arr2[i].num < arr1[i].num) return 1;
    }
    return (arr1.length - arr2.length);
  }


  updateExportHeader() {
    const data = this.sortKeys().reduce(
      ({keys, keyDescriptions}, {key, index}) => {
        keys.push(key);
        keyDescriptions.push(this.collectionKeys[`pos${key}`]);
        return {keys, keyDescriptions};
      },
      {keys: [], keyDescriptions: []},
    );
    return Statistic
    .findOneAndUpdate(
      {key: this.surveyId, type: 'SurveyResponse', name: 'objKeys'},
      {data},
      {upsert: true},
    );
  }

  _resolvePromiseObject(obj) {
    const objKeys = Object.keys(obj);
    return Promise.all(objKeys.map((k) => obj[k]))
    .then((arrObj) => objKeys.reduce((acc, el, idx) => {
      acc[el] = arrObj[idx];
      return acc;
    }, {}));
  }

  _parseExpression(exp) {
    const parsed = this.parser.parse(exp);
    if (parsed.error) {
      console.log(`Formula parse error: ${exp}: ${parsed.error}`);
      return;
    }
    return parsed.result;
  }

  accumulateAggregates(stat) {
    if (!this.survey.aggregates || !this.survey.aggregates.length) return;
    if (!stat.data) return;

    this.parser = new FormulaParser();
    this.parser.on('callVariable', (name, done) => {
      const obj = stat.data;
      if (obj.hasOwnProperty(name)) {
        let val = obj[name];
        if (typeof val === 'string') {
          if (val.match(/^[1-9][0-9]*$/)) {
            val = parseInt(val);
          } else if (val.match(/^[0-9]*\.[0-9]*/)) {
            val = parseFloat(val);
          }
        }
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
        Statistic.findOne({type, key, name})
        .then((stat) => stat || {type, key, name})
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
        }).then(() => Statistic.findOneAndUpdate(
          {type, key, name},
          {data},
          {upsert: true},
        )).catch((err) => {
          console.log(err);
        })
      );
    }
    return Promise.all(promises).then((p) => p.length);
  }

  writeStatsObj(obj) {
    const waitPromise = this.currentWaitPromise;
    const objPromise = this._resolvePromiseObject(obj)
    .then((obj) => Statistic.create({
      key: this.surveyId,
      type: 'SurveyResponse',
      name: 'obj',
      data: obj,
    }))
    .then((stat) => waitPromise.then(() => stat))
    .then((stat) => this.accumulateAggregates(stat));
    this.statsPromises.push(objPromise);
  }
}
