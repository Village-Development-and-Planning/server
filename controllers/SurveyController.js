var Survey = require('../data/models/Survey');
var async = require('async');
var util = require('util');
var BaseController = require('./BaseController');

function SurveyController() {
    BaseController.call(this, Survey);
}

var proto = {};

proto.sendSingleSurvey = function(req, res) {
    // BaseController.prototype.getForID(this, id).exec(cb);
    res.send("NOT IMPLEMENTED: sendSingleSurvey id: " + req.params.id);
}

SurveyController.prototype = proto;

util.inherits(SurveyController, BaseController);

module.exports = SurveyController;