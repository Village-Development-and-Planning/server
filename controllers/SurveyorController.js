const Surveyor = require('../data/models/Surveyor');
import EntityController from './EntitiyController';

/**
 * Surveyor document controller
 * 
 * @class SurveyorController
 * @extends {BaseController}
 */
class SurveyorController extends EntityController {
}
Object.assign(SurveyorController, {
  collection: Surveyor,
  routeName: 'surveyors',
});

module.exports = SurveyorController;
