import Schema from './Schema';
import mongoose from 'mongoose';
import Question from './Question';

/**
 * Provides export functionalities
 */
class AnsweredQuestion extends Question {
  constructor(obj, position) {
    super(obj);
    Object.assign(this, obj);
    if (position) this.position = position;
  }

  accumulateValue(ans, ansKey) {
    if (!ans.logged_options) return {};
    if (this.type == 'ROOT' || !this.number) {
      return {};
    }
    const ret = {};
    if (this.type == 'MULTIPLE_CHOICE') {
      ans.logged_options.reduce((acc, opt) => {
        if (opt.position !== null) acc[`${ansKey}_opt${opt.position}`] = 1;
        return acc;
      }, ret);
    } else {
      ret[ansKey] = ans.logged_options.map(
        (opt) => (opt.position || opt.text.english)
      ).join(',');
    }
    return ret;
  }


  findRespondents({acc, prefix, keys, respondents, idx, cb}) {
    const number = respondents[idx];
    if (!this.isParent(number)) return;
    if (!this.answers) return;

    acc = acc || {};
    prefix = prefix || 'Q';
    keys = keys || [];
    prefix = `${prefix}${this.position || ''}`;

    if (this.number === number) {
      cb(this, {acc, keys, prefix});
      return;
    }

    this.answers.forEach((ans, ansIdx) => {
      if (ans.children) {
        let respChild = null;
        ans.children.find(
          (child, idx) => {
            child = AnsweredQuestion.fromChild(child);
            if (child.isParent(number)) {
              return respChild = child;
            } else {
              return false;
            }
          }
        );
        if (respChild) {
          const newAcc = this.collectAnswer({
            ans, keys,
            idx: ansIdx,
            ansKey: prefix,

            ignore: respondents,
            acc: Object.assign({}, acc),
          });
          respChild.findRespondents({
            acc: newAcc,
            prefix: `${prefix}_`,
            keys, respondents, idx, cb,
          });
        }
      }
    });
  }


  collectAnswer({ans, idx, acc, ansKey, suffix, keys, ignore}) {
    acc = acc || {};
    ansKey = ansKey || 'Q';
    suffix = suffix || '';
    keys = keys || [];

    const valObj = this.accumulateValue(ans, ansKey);
    Object.keys(valObj).forEach((key) => {
      const oKey = key + suffix;
      acc[oKey] = valObj[key];
      if (!keys[`pos${oKey}`]) {
        keys.push(oKey);
        let text = '';
        if (this.number) text = text + this.number;
        if (this.text && this.text.english) {
          text = text + ` ${this.text.english}`;
        }
        keys[`pos${oKey}`] = text || 'UNKNOWN';
      }
    });

    if (ans.children) {
        ans.children.reduce(
        (acc, child) => {
          const childAnswer = AnsweredQuestion.fromChild(child);
          if (ignore && ignore.reduce(
            (acc, ign) => (acc || childAnswer.isParent(ign)),
            false,
          )) return acc;

          return childAnswer.collect({
            prefix: `${ansKey}_`,
            suffix, keys, acc, ignore,
          });
        },
        acc,
      );
    }
    return acc;
  }

  collect({acc, prefix, suffix, keys, ignore}) {
    acc = acc || {};
    prefix = prefix || 'Q';
    suffix = suffix || '';
    keys = keys || [];

    let pos = this.position || '';
    pos = pos.replace(/\./g, '_');
    prefix = `${prefix}${pos}`;
    return (this.answers ? (this.answers.reduce(
      (acc, ans, idx) => {
        let ansKey = prefix;
        let newSuffix = suffix;
        if (this.flow && this.flow.answer.scope == 'multiple') {
          newSuffix = suffix + `_ans${idx}`;
        }
        return this.collectAnswer({
          ans, idx, acc, ansKey, keys, ignore,
          suffix: newSuffix,
        });
      },
      acc,
    )) : acc);
  }

  static fromChild(child) {
    let childAnswer;
    if (child.question) {
      // Version 1
      childAnswer = new AnsweredQuestion(
        child.question, child.position
      );
    } else {
      childAnswer = new AnsweredQuestion(child);
    }
    return childAnswer;
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
