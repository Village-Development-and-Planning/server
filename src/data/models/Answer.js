import Schema from './Schema';
import mongoose from 'mongoose';

/**
 * Provides export functionalities
 */
class AnsweredQuestion {
  constructor(obj, position) {
    Object.assign(this, obj);
    if (position) this.position = position;
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
        if (idx) ansKey += `_${idx}`;

        acc[ansKey] = this.getValue(idx);
        if (keys && !keys[`pos${ansKey}`]) {
          keys.push(ansKey);
          keys[`pos${ansKey}`] = true;
        }

        if (ans.children) {
          ans.children.reduce(
            (acc, child, childIdx) => {
              let childAnswer;
              if (child.question) {
                // Version 1
                childAnswer = new AnsweredQuestion(
                  child.question, child.position
                );
              } else {
                childAnswer = new AnsweredQuestion(child);
              }
              return childAnswer.collect(
                `${ansKey}_`, keys, acc
              );
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
  name: {type: String},
  description: {type: String},
  survey: {type: Schema.Types.ObjectId, ref: 'Survey', required: true},
  surveyor: {type: Schema.Types.ObjectId, ref: 'Surveyor'},
  version: {type: Number, default: 0},
  rootQuestion: {
    type: {}, required: true,
    get: (a) => new AnsweredQuestion(a),
  },

  // Post-processing concerns
  lastExport: {type: Date},
});
answerSchema.index({survey: 1, lastExport: 1});

module.exports = mongoose.model('Answer', answerSchema);
