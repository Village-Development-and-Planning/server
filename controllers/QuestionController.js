var Question = require('../data/models/Question');
var async = require('async');
var util = require('util');

var BaseController = require('./BaseController');

class QuestionController extends BaseController {
  constructor() {
    super(Question)
  }


  getFromId(questionId) {
    Question.findOne({ _id: questionId })
        .populate('options.option')
        .populate('children.question')
        .exec();
  }

}

module.exports = QuestionController;