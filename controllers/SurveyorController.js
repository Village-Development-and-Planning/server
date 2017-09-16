var Surveyor = require('../data/models/Surveyor');
var async = require('async');
var util = require('util');
var BaseController = require('./BaseController');

class SurveyorController extends BaseController {
  constructor() {
    super(Surveyor)
  }

  getFromID(surveyorID) {
    return Surveyor.findOne({ _id: surveyorID })
    .exec();
  }
}
module.exports = SurveyorController;