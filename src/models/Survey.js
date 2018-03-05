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
});
surveySchema.index({name: 1});
surveySchema.index({enabled: 1, name: 1});

Object.assign(surveySchema.methods, {
  * respondentsIn(answer, context) {
    context = Object.assign({}, context, {refQ: this.question});
    if (!this.respondents || !this.respondents.length) {
      yield {question: answer.rootQuestion, context};
    } else {
      context.respondents = this.respondents;
      for (let idx=0; idx<this.respondents.length; idx++) {
        context.idx = idx;
        yield* answer.rootQuestion.findRespondents(context);
      }
    }
  },
});

module.exports = mongoose.model('Survey', surveySchema);
