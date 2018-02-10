import Location from '../models/Location';
import EntityController from './EntitiyController';

import LocationParser from '../lib/csv/location-csv-parser';

/**
 * Location document controller.
 *
 * @class LocationController
 * @extends {BaseController}
 */
export default class LocationController extends EntityController {
  _create(query) {
    if (query._done) {
      delete query._done;
      return Promise.resolve(query);
    }
    return super._create(query);
  }

  _parseEntity(obj) {
    let filter = 'name code type children _done csv';
    return this._filterObject(obj, filter);
  }

  _parseFileField({mime, field, file, fields}) {
    if (field === 'csv') {
      fields._done = true;
      const parser = new LocationParser();
      file.pipe(parser);
      return parser.promise;
    }
    return null;
  }
}

Object.assign(LocationController, {
  collection: Location,
  entityName: 'Location',
  routeName: 'locations',

  _findFields: '_id name code type modifiedAt',
  _createFields: '_id name code type children modifiedAt',
});
module.exports = LocationController;
