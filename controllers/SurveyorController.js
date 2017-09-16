var Surveyor = require('../data/models/Surveyor');
var async = require('async');
var util = require('util');
var BaseController = require('./BaseController');

class SurveyorController extends BaseController {
  constructor() {
    super(Surveyor)
  }

  sendSingleSurveyor(req, res, next) {
    var id = req.params.id;
    var self = req.controller.surveyorController;

    if (self) {
      self.getSurveyorFromID(function (err, surveyor) {

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

  }
  getSurveyorFromID(cb, surveyorID) {
    return Surveyor.find({ _id: surveyorID })
    .exec(cb);
  }
}
module.exports = SurveyorController;