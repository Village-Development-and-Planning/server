const mongoose = require('mongoose');
const express = require('express');

/**
 * Base Controller class for documents exposed via CMS APIs.
 * 
 * @class BaseController
 */
class BaseController {
  constructor(opts) {
    Object.assign(this, opts);
    this.router.get('/', this.fetchList.bind(this));
    this.router.get('/:id', this.fetchObject.bind(this));
  }

  fetchFromId(req, res, next) {
    this.getFromId(req.params.id)
      .then((json) => {
        res.json(json);
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
   * Base implementation of getFromId.  
   * Derived controllers can augment behaviour.
   * @param  {MongoId} _id Object ID to search for.
   * @return {Promise} Document.
   */
  getFromId(_id) {
    return this.constructor.collection.findOne({_id});
  }

  getList(query) {
    return this.constructor.collection.find(query);
  }

  fetchList(req, res, next) {
    this.getList({})
      .then((json) => {
        res.json(json);
      })
      .catch((err) => {
        next(err);
      });
  }

  fetchObject(req, res, next) {
    let _id = req.params.id;
    if (_id) {
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        next(new Error('Object ID invalid.'));
        return;
      } else {
        this.fetchFromId(req, res, next);
        return;
      }
    }
  }

  static registerRoute(app) {
    if (this.routeName) {
      console.log('Registering: /' + this.routeName);
      let ctrl = new this({router: new express.Router()});
      app.use('/' + this.routeName, ctrl.router);
    }
  }
}
module.exports = BaseController;
