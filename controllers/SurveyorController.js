var Surveyor = require('../data/models/Surveyor');
var async = require('async');
var util = require('util');
var BaseController = require('./BaseController');

function SurveyorController() {
    BaseController.call(this, Surveyor);
}

var proto = {};

proto.sendSingleSurveyor = function(req, res) {
    // BaseController.prototype.getForID(this, id).exec(cb);;
    res.send("NOT IMPLEMENTED: sendSingleSurveyor id: " + req.params.id);
}

SurveyorController.prototype = proto;

util.inherits(SurveyorController, BaseController);

module.exports = SurveyorController;