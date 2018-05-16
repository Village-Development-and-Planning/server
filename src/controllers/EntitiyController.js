import BaseController from './BaseController';
import Mixin from '../lib/Mixin';

import Listing from './concerns/Listing';
import Get from './concerns/Get';
import Delete from './concerns/Delete';
import Body from './concerns/Body';
import Create from './concerns/Create';
import Update from './concerns/Update';

/**
* Controller class for documents exposed via CMS APIs.
*
* @class EntityController
*/
class EntityController
  extends Mixin.mixin(
    BaseController,
    Listing, Get, Delete,
    Body, Create, Update,
  ) {
    constructor(...args) {
      super(...args);

      '_findFields _createFields'
      .split(' ').forEach((key) => {
        this[key] = this[key] || this.constructor[key];
      });
    }

    _parseBody() {
      return super._parseBody().then((obj) => {
        if (Array.isArray(obj)) {
          return Promise.all(obj.map((o) => this._parseEntity(o)));
        } else {
          return this._parseEntity(obj);
        }
      });
    }
};

Object.assign(EntityController, {
  _findFields: '_id name description modifiedAt',
  _createFields: '_id name description modifiedAt',
});

export default EntityController;
