import Schema from './Schema';
import mongoose from 'mongoose';

/**
 * Provides export functionalities
 */
class AnsweredQuestion {
  constructor(obj) {
    Object.assign(this, obj);
  }

  getValue(idx) {
    idx = idx || 0;
    return this.answers
      && this.answers[idx]
      && this.answers[idx]
        .logged_options
        .map((opt) => {
          return opt.position || opt.text.english;
        })
        .join(',');
  }

  collect(prefix='Q', keys, acc) {
    acc = acc || {};
    return (this.answers ? (this.answers.reduce(
      (acc, ans, idx) => {
        let ansKey = `${prefix}${this.position || ''}`;
        if (idx) ansKey += `/${idx}`;

        acc[ansKey] = this.getValue(idx);
        if (keys && !keys[`pos${ansKey}`]) {
          keys.push(ansKey);
          keys[`pos${ansKey}`] = true;
        }

        if (ans.children) {
          ans.children.reduce(
            (acc, child, childIdx) => {
              return (new AnsweredQuestion(child))
                .collect(`${ansKey}.`, keys, acc);
            },
            acc,
          );
        }
        return acc;
      },
      acc,
    )) : acc);
  }
}

const answerSchema = new Schema({
  survey: {type: Schema.Types.ObjectId, ref: 'Survey', required: true},
  surveyor: {type: Schema.Types.ObjectId, ref: 'Surveyor'},
  rootQuestion: {type: {}, required: true, get: (a) => new AnsweredQuestion(a)},
});


module.exports = mongoose.model('Answer', answerSchema);
