import 'babel-polyfill';
const Schema = require('./Schema');
const Text = require('./Text');
const mongoose = require('mongoose');

const questionSchema = new Schema({
  type: {type: String},
  tags: [{type: String}],
  text: {type: Text},
  number: {type: String},
  position: {type: String},
  options: [{
    position: {type: String, required: true},
    option: {type: {}, required: true},
  }],
  children: [{
    position: {type: String, required: true},
    question: {
      type: {},
      get(q) {
        return new Question(q);
      },
      required: true,
    },
  }],
  flow: {
    pre: {type: Object},
    question: {type: Object},
    answer: {type: Object},
    child: {type: Object},
    post: {type: Object},
    exit: {type: Object},
  },
});

Object.assign(questionSchema.methods, {
  isParent(number) {
    if (!this.number) return true;
    return (number === this.number)
      || number.startsWith(`${this.number}.`);
  },

  find(number) {
    if (!this.isParent(number)) return null;

    if (this.number === number) return this;
    let child = this.children.find(
      (el) => el.question && el.question.isParent(number)
    );
    if (child) {
      return child.question.find(number);
    } else {
      return null;
    }
  },

  findChildByPosition(pos) {
    const ret = this.children.find(
      (el) => (el.position == pos)
    );
    if (ret) {
      return ret.question;
    }
    return null;
  },

  findOptionByPosition(pos) {
    return this.options.find(
      (el) => (el.position == pos)
    );
  },

  * values(answer) {
    const
      qType = this.type,
      qFlow = this.flow;
    let qValue, qConcat;

    if (
      qType === 'ROOT'
      || qType === 'DUMMY'
      || qType === 'MESSAGE'
    ) return;

    const opts = answer.logged_options;
    if (!opts || !opts.length) return;

    if (qFlow && qFlow.pre.fill.length) qValue = 1;

    if (qType === 'MULTIPLE_CHOICE') qConcat = 1;
    if (
      qType === 'INPUT'
      || qType === 'INFO'
      || qType === 'CONFIRMATION'
      || qType === 'GPS'
    ) qValue = 1;

    const valueF = (el) => (
      qValue
      ? (el.value || el.text.english || '').toUpperCase()
      : (el.position)
    );

    if (qConcat) {
      for (let o of opts) {
        const value = valueF(o);
        if (!value) continue;
        yield {key: `_opt${valueF(o)}`, value: 1};
      }
      return;
    }
    const ansValue = valueF(opts[0]);
    if (qType === 'GPS') {
      let [lat, long] = ansValue.split(',');
      if (!lat || !long) return;
      yield {key: '_lat', value: lat};
      yield {key: '_long', value: long};
    } else {
      yield {key: '', value: ansValue};
    }
  },

});

const Question = mongoose.model('Question', questionSchema);
export default Question;
