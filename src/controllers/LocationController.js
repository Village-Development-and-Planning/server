import Location from '../models/Location';
import EntityController from './EntitiyController';

import LocationParser from '../lib/csv/location-csv-parser';
import Statistic from '../models/Statistic';

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

  _indexQuery() {
    const query = super._indexQuery();
    const {type, prefix} = this.req.query;
    if (type) query.type = type;
    if (prefix) query.uid = new RegExp(`^${prefix}`);
    return query;
  }

  _getQuery() {
    let query = super._getQuery();
    if (!query) {
      let _id = this.req.params.id;
      if (_id) query = {uid: _id.replace(/_/g, '/')};
    }
    return query;
  }

  _findOne(query) {
    return super._findOne(query).then(
      (loc) => {
        if (loc) {
          const prefix = ['LocationAggregate', loc.type].join('/');
          return Statistic.find({
            type: new RegExp('^' + prefix),
            key: new RegExp(`^${loc.uid}`),
          }).then((stats) => {
            loc.set('aggregates', stats, {strict: false});
            return loc;
          });
        }
        return loc;
      }
    );
  }

  _parseEntity(obj) {
    let filter = 'name code type children _done csv';
    return this._filterObject(obj, filter);
  }

  _parseFileField({mime, field, file, fields}) {
    if (field === 'csv') {
      fields._done = true;
      const parser = new LocationParser({
        deleteExisting: fields['delete-existing'],
      });
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

  _findFields: '_id name code uid payload type modifiedAt',
  _createFields: '_id name code uid type children modifiedAt',
});
module.exports = LocationController;
