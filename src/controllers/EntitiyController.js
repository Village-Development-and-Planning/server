const mongoose = require('mongoose');

import BaseController from './BaseController';
import Mixin from '../lib/Mixin';

import Create from './concerns/CreateConcerns';

/**
* Controller class for documents exposed via CMS APIs.
* 
* @class EntityController
*/
class EntityController extends Mixin.mixin(BaseController, Create) {
  findFromId({_id}) {
    return this.constructor.collection
      .findOne({_id})
      .then((e) => e || Promise.reject({status: 404}));
  }

  findAll(query) {
    return this.constructor.collection.find(query);
  }

  _updateableAttributes() {
    return null;
  }

  updateFromId({_id}) {
    let updateableAttributes;
    if (!(updateableAttributes = this._updateableAttributes())) {
      return Promise.reject({status: 405});
    } else {
      const updation = Object.keys(updateableAttributes).reduce(
        (acc, key) => {
          if (this.req.query[key]) {
            acc[key] = this.req.query[key];
          }
          return acc;
        },
        {},
      );
      return this.constructor.collection
        .findOneAndUpdate({_id}, updation, {new: true})
        .then((e) => e || Promise.reject({status: 404}));
    }
  }

  deleteFromId(query) {
    return this.constructor.collection.remove(query);
  }

  _validateId() {
    let _id = this.req.params.id;
    if (_id && mongoose.Types.ObjectId.isValid(_id)) {
      return Promise.resolve({_id});
    } else {
      return Promise.reject({status: 400, details: 'Unreadable Id'});
    }
  }


  index() {
    this.renderer.renderPromise(
      this.findAll({}),
    );
  }

  delete() {
    this.renderer.renderPromise(
      this._validateId()
        .then(({_id}) => this.deleteFromId({_id}))
    );
  }

  get() {
    this.renderer.renderPromise(
      this._validateId()
        .then(({_id}) => this.findFromId({_id}))
    );
  }

  update() {
    this.renderer.renderPromise(
      this._validateId()
        .then(({_id}) => this.updateFromId({_id}))
    );
  }


  new() {
    this.renderer.render(null, {});
  }

  edit() {
    this.renderer.render(null, {});
  }
};

export default EntityController;
