import Mixin from '../../lib/Mixin';
import Survey from '../../models/Survey';
import Statistic from '../../models/Statistic';
import Location from '../../models/Location';
import User from '../../models/User';
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
    });
  }

  _pushKey(key, description) {
    const keys = this.collectionKeys;
    if (!keys[`pos${key}`]) {
      keys.push(key);
      keys[`pos${key}`] = description;
    }
  }

  getExportHeader() {
    return Statistic
    .findOne({key: this.surveyId, type: 'SurveyResponseHeader'})
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
      {key: this.surveyId, type: 'SurveyResponseHeader'},
      {data},
      {upsert: true},
    );
  }

  sortKeys() {
    return this.collectionKeys
    .map((key, index) => ({key, index}))
    .sort(this._keyListComparator.bind(this));
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

  _ppClassHousehold({
    select='Q_1_12',
    surveyorKey='Q_1_1',
    habitationKey='Q_1_6',
  }, obj) {
    if (!obj[surveyorKey]) return;
    if (!obj[select]) return {_ignore: true};
    const username = obj[surveyorKey];
    return User.findOne({username})
    .then((user) => {
      if (!user || !user.payload) return;
      let locSpec = [];
      ['DISTRICT', 'BLOCK', 'PANCHAYAT'].forEach((loc) => {
        ['NAME', 'CODE'].forEach((dat) => {
          this._pushKey(`${loc}_${dat}`, `Location payload`);
          obj[`${loc}_${dat}`] = user.payload[`${loc}_${dat}`];
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
      this._pushKey('HABITATION_CODE', habitationKey);
      if (habitation) obj['HABITATION_CODE'] = habitation.code;
    });
  }
}
