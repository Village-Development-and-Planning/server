var Survey = require('../data/models/Survey');
var async = require('async');
var util = require('util');
var BaseController = require('./BaseController');

function SurveyController() {
    BaseController.call(this, Survey);
}

SurveyController.prototype.sendSingleSurvey = function (req, res, next) {
    var surveyID = req.params.id;
    var self = req.controller.surveyController;

    if (self) {
        self.getSurveyFromID(function(err, survey) {

            if (err) {
                next(err);
            } else { 
                res.json(survey);
            }

        }, surveyID);
    } else {
        console.log('Self is undefined');
        process.exit(1);
    }
}

SurveyController.prototype.getSurveyFromID = function (cb, surveyID) {
    this.getForID(surveyID)
        .populate({
            path: 'questions.question',
            populate: {
                path: 'children.question'
            }
        })
        .exec(cb);
}

util.inherits(SurveyController, BaseController);

module.exports = SurveyController;