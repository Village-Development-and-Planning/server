const Schema = require('./Schema');
const mongoose = require('mongoose');

const surveySchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  enabled: {type: Boolean, default: true},
  question: {type: {}, required: true},
  respondents: {type: []},
});
surveySchema.index({name: 1});
surveySchema.index({enabled: 1, name: 1});

Object.assign(surveySchema.methods, {
  * respondentsIn(answer, context) {
    if (!this.respondents || !this.respondents.length) {
      yield {question: answer.rootQuestion, context};
    } else {
      for (let idx=0; i<this.respondents.length; i++) {
        yield* answer.rootQuestion.findRespondents(
          Object.assign({
            respondents: this.respondents,
            refQ: this.rootQuestion,
            idx,
          }, context)
        );

        ++respIdx;
      }
    }
  },
});

module.exports = mongoose.model('Survey', surveySchema);