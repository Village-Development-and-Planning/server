import Mixin from '../../lib/Mixin';
import Survey from '../../models/Survey';
import Statistic from '../../models/Statistic';
/**
 * Handles Survey concerns
 */
export default class extends Mixin {
  getSurvey() {
    return Survey
    .findOne({_id: this.surveyId})
    .then((survey) => {
      this.survey = survey;
      if (!survey) {
        return Promise.reject(`Survey: ${this.surveyId} not found.`);
      }
      this.respondents = this.survey.getRespondents();
    });
  }


  getExportHeader() {
    this.answerKeys = {};
    return Promise.all(
      this.respondents.map(({number, opts}) => {
        this.answerKeys[String(number)] = {
          keys: [],
          keysHash: {},
        };
        return Statistic
        .findOne({
          key: `${this.surveyId}/${number}`,
          type: 'SurveyResponseHeader',
        })
        .then((stat) => {
          if (!stat || !stat.data || !stat.data.keys) return;
          const keys = stat.data.keys;
          const keysHash = keys.reduce(
            (acc, el) => ((acc[el.key] = 1), acc),
            {},
          );
          this.answerKeys[String(number)] = {keys, keysHash};
        });
      })
    );
  }

  updateExportHeader() {
    return Promise.all(
      Object.keys(this.answerKeys).map((key) => {
        const {keys} = this.answerKeys[key];
        return Statistic.findOneAndUpdate({
          key: `${this.surveyId}/${key}`,
          type: 'SurveyResponseHeader',
        }, {
          data: {keys: this.sortKeys(keys)},
        }, {upsert: 1, new: 1});
      })
    );
  }

  sortKeys(keys) {
    return keys.sort(this._keyListComparator.bind(this));
  }

  _questionNumberParser(acc, el) {
    let match = el.match(/^([a-zA-Z]*)([0-9]*)$/);
    if (match) {
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
      arr1 = arr1.split('').reverse().join('');
      arr2 = arr2.split('').reverse().join('');
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
}
