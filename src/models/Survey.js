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

module.exports = mongoose.model('Survey', surveySchema);
