const mongoose = require('mongoose');

import BaseController from './BaseController';

/**
* Controller class for documents exposed via CMS APIs.
* 
* @class EntityController
*/
class EntityController extends BaseController {
  findFromId({_id}) {
    return this.constructor.collection
      .findOne({_id})
      .then((e) => e || Promise.reject({status: 404}));
  }

  findAll(query) {
    return this.constructor.collection.find(query);
  }

  updateFromId({_id}) {
    return Promise.reject({status: 405});
  }

  _deleteQuery(query) {
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
        .then(({_id}) => this._deleteQuery({_id}))
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

  create() {
    const req = this.req;
    if (req.is('multipart/form-data')) {
      this.createFromMultipart();
    } else if (req.is('application/json') && req.body) {
      this.createFromJson();
    } else {
      this.renderer.sendError({
        status: 400, details: 'Unsupported upload type.',
      });
    }
  }

  createFromMultipart() {
    this.renderer.sendError({
      status: 400, details: 'Multipart is not implemented.',
    });
  }

  createFromJson() {
    this.renderer.sendError({
      status: 400, details: 'JSON is not supported.',
    });
  }
};

export default EntityController;
