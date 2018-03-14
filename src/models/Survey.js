import 'babel-polyfill';
const Schema = require('./Schema');
const mongoose = require('mongoose');
import Question from './Question';

const surveySchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  enabled: {type: Boolean, default: true},
  question: {type: {}, get: (q) => new Question(q), required: true},
  respondents: {type: []},
  aggregates: {type: []},
  postProcessing: {type: []},
  answerStats: {type: {}},
});
surveySchema.index({name: 1});
surveySchema.index({enabled: 1, name: 1});

surveySchema.methods = {
  getRespondents() {
    if (!this.respondents || !this.respondents.length) {
      this.respondents = [null];
    }
    return this.respondents.map((resp) => {
      let number = null, opts = {};
      if (!resp) return {number, opts};
      if (typeof resp !== 'object') {
        number = String(resp);
        if (!number) number = null;
        return {number, opts};
      }
      ({number, opts} = resp);
      if (!number) number = null;
      return {number, opts};
    });
  },

};

module.exports = mongoose.model('Survey', surveySchema);
