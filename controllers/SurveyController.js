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
    var promise = Survey.find({ _id: surveyID }).exec();

    promise = promise.then(function (survey) {
        return survey;
    }).then(function (survey) {
        return self.populateSurveys(survey);
    });

    return promise;
}

util.inherits(SurveyController, BaseController);

module.exports = SurveyController;