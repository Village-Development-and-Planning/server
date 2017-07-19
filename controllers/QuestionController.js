var Question = require('../data/models/Question');
var async = require('async');
var util = require('util');
var BaseController = require('./BaseController');

function QuestionController() {
    BaseController.call(this, Question);
}

var proto = {};

proto.sendSingleQuestion = function(req, res) {
    // BaseController.prototype.getForID(this, id).populate('options.option').exec(cb);
    res.send("NOT IMPLEMENTED: sendSingleQuestion id: " + req.params.id);
}

QuestionController.prototype = proto;

util.inherits(QuestionController, BaseController);

module.exports = QuestionController;