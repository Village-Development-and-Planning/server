var Surveyor = require('../data/models/Surveyor');
var BaseController = require('./BaseController');

class SurveyorController extends BaseController {
  getFromID(surveyorID) {
    return Surveyor.findOne({ _id: surveyorID })
    .exec();
  }
}
Object.assign(SurveyorController, {
  collection: Surveyor,
  routeName: 'surveyors'
});

module.exports = SurveyorController;