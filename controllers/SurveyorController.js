const Surveyor = require('../data/models/Surveyor');
const BaseController = require('./BaseController');

/**
 * Surveyor document controller
 * 
 * @class SurveyorController
 * @extends {BaseController}
 */
class SurveyorController extends BaseController {
  getFromID(surveyorID) {
    return Surveyor.findOne({_id: surveyorID})
    .exec();
  }
}
Object.assign(SurveyorController, {
  collection: Surveyor,
  routeName: 'surveyors',
});

module.exports = SurveyorController;
