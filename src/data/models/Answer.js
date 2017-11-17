import Schema from './Schema';
import mongoose from 'mongoose';
import Question from './Question';

/**
 * Provides export functionalities
 */
class AnsweredQuestion extends Question {
  getValue(idx) {
    idx = idx || 0;
    return answers
      && answers[idx]
      && answers[idx]
        .logged_options
        .map((opt) => {
          return opt.position || opt.text.english;
        })
        .join(',');
  }
}

const answerSchema = new Schema({
  survey: {type: Schema.Types.ObjectId, ref: 'Survey', required: true},
  surveyor: {type: Schema.Types.ObjectId, ref: 'Surveyor'},
  rootQuestion: {type: {}, required: true, get: (a) => new AnsweredQuestion(a)},
});

module.exports = mongoose.model('Answer', answerSchema);
