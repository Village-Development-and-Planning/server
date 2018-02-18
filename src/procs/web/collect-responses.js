import 'babel-polyfill';
import {ChildTemplate} from '../child-process';

import Survey from '../../models/Survey';
import Answer from '../../models/Answer';
import Statistic from '../../models/Statistic';


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
      cursor.on('data', (ans) => this.collectOneAnswer(ans));
      cursor.on('error', rej);
      cursor.on('end', () => res(Promise.all(this.answersLog)));
    });
  }

  finishAnswer(answer, remarks) {
    remarks._id = answer._id;
    this.answersLog.push(
      Answer.findOneAndUpdate({_id: answer._id}, {lastExport: new Date()})
      .then(() => console.log(`Marked answer ${answer._id} as processed.`))
      .catch((err) => {
        console.log(`Error saving answer: ${err}`);
      }).then(() => remarks)
    );
  }

  sealAnswer(remarks) {
    remarks._id = this.currentAnswer._id;
    this.answersLog.push(
      Promise.all(this.statsPromises)
      .then(() => Answer.findOneAndUpdate(
        {_id: remarks._id},
        {lastExport: new Date()}
      )).catch((err) => {
        console.log(`Error saving answer: ${err}`);
      }).then(() => remarks)
    );
  }

  collectOneAnswer(answer) {
    if (!answer) return;
    this.currentAnswer = answer;

    if (!answer.rootQuestion) {
      this.sealAnswer({status: 'SKIPPED', reason: 'EMPTY'});
      return;
    }
    if (answer.version == 0) {
      this.sealAnswer({status: 'SKIPPED', reason: 'VERSION0'});
      return;
    }

    console.log(`Collecting answer: ${answer._id}`);
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
    .findOne({survey: this.surveyId, answer: null})
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
      {survey: this.surveyId, answer: null},
      {data},
      {upsert: true},
    );
  }

  writeStatsObj(obj) {
    const objKeys = Object.keys(obj);
    const objPromise = Promise.all(objKeys.map((k) => obj[k]))
    .then((arrObj) => objKeys.reduce((acc, el, idx) => {
      acc[el] = arrObj[idx];
      return acc;
    }, {}));

    this.statsPromises.push(
      objPromise.then(
        (obj) => Statistic.create({
          survey: this.surveyId,
          answer: this.currentAnswer,
          data: obj,
        })
      )
    );
  }
}
