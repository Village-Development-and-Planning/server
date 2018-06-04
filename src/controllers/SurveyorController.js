import EntityController from './EntitiyController';
import SurveyorParser from '../lib/csv/surveyor-csv-parser';

import User from '../models/User';
import Statistic from '../models/Statistic';

import Location from '../models/Location';

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

  _addLocationPayload(obj, loc) {
    if (!loc.payload) return obj;
    for (let key of Object.keys(loc.payload || {})) {
      obj[`payload.${key}`] = loc.payload[key];
    }
    obj[`payload.HABITATION_NAME`] = loc.children.map((c) => c.name);
    return obj;
  }

  _parseEntity(obj) {
    let filter = 'username name roles payload surveyor-csv _done';
    const payload = {};
    let promise = false;
    if (obj.panchayat) {
      promise = Location.findOne({type: 'PANCHAYAT', uid: obj.panchayat}).then(
        (loc) => loc && this._addLocationPayload(payload, loc)
      );
    }
    if (obj.survey) {
      payload['payload.SURVEY'] = obj.survey;
    }
    payload['payload.SURVEYOR_CODE'] = obj.username;
    payload['payload.SURVEYOR_NAME'] = obj.name;
    return promise ? promise.then(
      () => Object.assign(payload, this._filterObject(obj, filter))
    ) : Object.assign(payload, this._filterObject(obj, filter));
  }

  _parseFileField({mime, field, file, fields}) {
    if (field === 'surveyor-csv') {
      fields._done = true;
      const parser = new SurveyorParser({
        deleteExisting: fields['delete-existing'],
      });
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

  _indexQuery() {
    return {roles: 'SURVEYOR'};
  }

  _getQuery() {
    let query = super._getQuery();
    if (!query) {
      let _id = this.req.params.id;
      if (_id) query = {username: _id};
    }
    return query && Object.assign(query, this._indexQuery());
  }

  _findOne(query) {
    return super._findOne(query).then((surveyor) => {
      if (!surveyor) return null;
      surveyor.set('code', surveyor.username, {strict: false});
      if (this.queryZone !== 'app') {
        return Statistic.find({
          type: /^SurveyorAggregate/,
          key: new RegExp(`^${surveyor.username}`),
        }).then((stats) => {
          surveyor.set('aggregates', stats, {strict: false});
          return surveyor;
        });
      }
      return surveyor;
    }).then((surveyor) => {
      if (surveyor && surveyor.payload) {
        surveyor.set(
          'surveyId', surveyor.payload.surveyId, {strict: false}
        );
      }
      return surveyor;
    });
  }

  appInfo() {
    this.queryZone = 'app';
    this.get({username: this.req.user.username});
  }
}

Object.assign(SurveyorController, {
  collection: User,
  entityName: 'User',
  routeName: 'surveyors',

  _findFields: '_id name username payload roles modifiedAt',
  _createFields: '_id name username roles modifiedAt',
});
module.exports = SurveyorController;
