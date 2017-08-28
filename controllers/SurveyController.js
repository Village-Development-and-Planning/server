var Survey = require('../data/models/Survey');
var Question = require('../data/models/Question');
var async = require('async');
var util = require('util');
var BaseController = require('./BaseController');

function SurveyController() {
    BaseController.call(this);
}

SurveyController.prototype.sendSingleSurvey = function (req, res, next) {
    var surveyID = req.params.id;
    var self = req.controller.surveyController;

    if (self) {
        self.getSurveyFromID(surveyID).then(function (survey) {
            res.json(survey);
        }).catch(function (err) {
            next(err);
        });
    } else {
        next(new Error('Self is undefined'));
    }
}

SurveyController.prototype.getSurveyFromID = function (surveyID) {
    var self = this;
    return Survey.findOne({ _id: surveyID })
        .exec()
        .then(function (survey) {
            if (!survey) {
                throw new Error('No survey found!');
            }

            if (survey.name) {
                console.log('Populating ' + survey.name + ' survey.');
            }

            var surveyQuestions = survey.questions;

            if (surveyQuestions) {
                return Promise.all(surveyQuestions.map(function (surveyQuestion) {
                    if (!surveyQuestion.question) {
                        return survey;
                    }
                    return self.populateChildren(Question, surveyQuestion.question);
                })).then(function (populatedSurveyQuestions) {
                    var surveyQuestionsPopulated = {
                        questions: survey.questions.map(function (question) {
                            var foundPopulatedSurveyQuestion =
                                populatedSurveyQuestions.find(function (element) {
                                    return question.question.equals(element._id);
                                });
                            return Object.assign(question.toObject()
                                , foundPopulatedSurveyQuestion);
                        })
                    }
                    return Object.assign(survey.toObject(), surveyQuestionsPopulated);
                });
            } else {
                return survey;
            }
        });
}

util.inherits(SurveyController, BaseController);

module.exports = SurveyController;