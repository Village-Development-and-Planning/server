var Surveyor = require('../data/models/Surveyor');
var async = require('async');
var util = require('util');
var BaseController = require('./BaseController');

function SurveyorController() {
    BaseController.call(this, Surveyor);
}

SurveyorController.prototype.sendSingleSurveyor = function (req, res, next) {
    var id = req.params.id;
    var self = req.controller.surveyorController;

    if (self) {
        self.getSurveyorFromID(function(err, surveyor) {

            if (err) {
                next(err);
            } else {
                res.json(surveyor);
            }

        }, id);
    } else {
        console.log('Self is undefined');
        process.exit(1);
    }

};

SurveyorController.prototype.getSurveyorFromID = function (cb, surveyorID) {
    this.getForID(surveyorID)
        .exec(cb);
}

util.inherits(SurveyorController, BaseController);

module.exports = SurveyorController;