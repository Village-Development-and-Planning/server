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
      this._findFields = this._findFields || this.constructor._findFields;
    }
    _parseBody() {
      return super._parseBody().then((obj) => {
        if (Array.isArray(obj)) {
          return obj.map((o) => this._parseEntity(o));
        } else {
          obj = this._parseEntity(obj);
          return obj;
        }
      });
    }
};

EntityController._findFields = 'name description modifiedAt';

export default EntityController;
