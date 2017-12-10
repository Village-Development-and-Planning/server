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

export default EntityController;
