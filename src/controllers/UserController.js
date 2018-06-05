import EntityController from './EntitiyController';
import User from '../models/User';

/**
 * Surveyor document controller.
 *
 * @class LocationController
 * @extends {BaseController}
 */
export default class UserController extends EntityController {
  _findOne(...args) {
    return super._findOne(...args).select('-passphrase');
  }
  _indexQuery() {
    return {roles: {$ne: 'SURVEYOR'}};
  }

  _parseEntity(obj) {
    return this._filterObject(
      obj,
      'name username roles passphrase',
    );
  }
}

Object.assign(UserController, {
  collection: User,
  entityName: 'User',
  routeName: 'users',

  _findFields: '_id name username roles modifiedAt',
  _createFields: '_id name username roles modifiedAt',
});
module.exports = UserController;
