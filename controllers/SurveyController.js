var Survey = require('../data/models/Survey');
var Question = require('../data/models/Question');
var async = require('async');
var util = require('util');
var BaseController = require('./BaseController');

var mongoose = require('mongoose');
var ObjId = mongoose.Types.ObjectId;

class SurveyController extends BaseController {
  constructor() {
    super(Survey)
  }

  getFromId(surveyID) {
    return Survey.findOne({ _id: surveyID })
    .exec()
    .then(
      (survey) => {
        if (!survey) {
          return new Promise.reject(new Error("No Survey found!"));
        }
        survey.questions = survey.questions || [];
        return Promise.all(survey.questions.map(
          (q) => {
            if (q) {
              return Question.fetchDeep(q.question).then((qData) => {
                q.question = qData;
                return q;
              })
            } else {
              return null;
            }
          }))
          .then((ques) => {
            survey.questions = ques;
            return survey;
          })
      });
  }
}

module.exports = SurveyController;