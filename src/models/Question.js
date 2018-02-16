import 'babel-polyfill';
const Schema = require('./Schema');
const Text = require('./Text');
const mongoose = require('mongoose');

let Question;

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
      get: (q) => new Question(q),
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
      return new Question(ret.question, ret.position);
    }
    return null;
  },

  findOptionByPosition(pos) {
    return this.options.find(
      (el) => (el.position == pos)
    );
  },
});

const QuestionM = mongoose.model('Question', questionSchema);
module.exports = Question = class Question extends QuestionM {
  constructor(obj, position) {
    super(obj);
    Object.assign(this, obj);
    if (position) this.position = position;
  }
};


