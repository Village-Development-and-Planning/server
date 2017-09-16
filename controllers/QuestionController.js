var Question = require('../data/models/Question');
var async = require('async');
var util = require('util');

var BaseController = require('./BaseController');

class QuestionController extends BaseController {
  constructor() {
    super(Question)
  }

  sendSingleQuestion(req, res, next) {
    var self = req.controller.questionController;

    if (self) {
        var questionID = req.params.id;
        self.getQuestionFromID(function (err, question) {

            if (err) {
                next(err);
            } else {
                res.json(question);
            }

        }, questionID);
    } else {
        console.log('Self is undefined');
        process.exit(1);
    }
  }

  getQuestionFromID(cb, questionID) {
    Question.find({ _id: questionID })
        .populate('options.option')
        .populate('children.question')
        .exec(cb);
  }
}

module.exports = QuestionController;