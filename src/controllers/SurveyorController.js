import EntityController from './EntitiyController';
import SurveyorParser from '../lib/csv/surveyor-csv-parser';
import User from '../models/User';

/**
 * Surveyor document controller.
 *
 * @class LocationController
 * @extends {BaseController}
 */
export default class SurveyorController extends EntityController {
  _create(query) {
    if (query._done) {
      delete query._done;
      return Promise.resolve(query);
    }
    return super._create(query);
  }

  _parseEntity(obj) {
    let filter = 'username name roles payload surveyor-csv _done';
    return this._filterObject(obj, filter);
  }

  _parseFileField({mime, field, file, fields}) {
    if (field === 'surveyor-csv') {
      fields._done = true;
      const parser = new SurveyorParser();
      file.pipe(parser);
      return parser.promise;
    }
    return null;
  }

  auth() {
    this.renderer.renderPromise(
      User.find({roles: 'SURVEYOR'})
      .then(
        (users) => users.reduce(
          (acc, user) => {
            acc[user.username] = user.payload;
            return acc;
          },
          {},
        )
      )
    );
  }
}

Object.assign(SurveyorController, {
  collection: User,
  entityName: 'User',
  routeName: 'surveyors',

  _findFields: '_id name username roles modifiedAt',
  _createFields: '_id name username roles modifiedAt',
});
module.exports = SurveyorController;
