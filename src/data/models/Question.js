const Schema = require('./Schema');
const Text = require('./Text');
const mongoose = require('mongoose');

const questionSchema = new Schema({
  type: {type: String},
  tags: [{type: String}],
  text: {type: Text},
  number: {type: String},
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
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;


