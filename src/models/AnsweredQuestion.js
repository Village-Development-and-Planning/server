import AQConcerns from './concerns/AnsweredQuestion';
import AQWalk from './concerns/AnswerWalk';

const Schema = require('./Schema');
const mongoose = require('mongoose');

const aqSchema = new Schema({
  number: {type: String},
  answers: [{
    logged_options: {type: []},
    children: [{
      position: {type: String},
      question: {
        type: {},
        get(e) {
          return new AnsweredQuestionModel(e);
        },
      },
    }],
  }],
});

AQConcerns.copyTo(aqSchema.methods);
AQWalk.copyTo(aqSchema.methods);

const AnsweredQuestionModel = mongoose.model('AnsweredQuestion', aqSchema);
export default AnsweredQuestionModel;
