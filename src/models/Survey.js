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
  collectProcessId: {type: String},
  collectExportId: {type: String},
});
surveySchema.index({name: 1});
surveySchema.index({enabled: 1, name: 1});

surveySchema.methods = {
  getRespondents() {
    if (!this.respondents || !this.respondents.length) {
      this.respondents = [null];
    }
    return this.respondents.map((resp) => {
      if (!resp) return {number: null};
      if (typeof resp !== 'object') {
        return {number: String(resp)};
      }
      if (!resp.number) resp.number = null;
      return resp;
    });
  },

};

module.exports = mongoose.model('Survey', surveySchema);
