const mongoose = require('mongoose');

import BaseController from './BaseController';

/**
* Controller class for documents exposed via CMS APIs.
* 
* @class EntityController
*/
class EntityController extends BaseController {
  constructor(opts) {
    super(opts);
    this.router.get('/', this.getList.bind(this));
    this.router.get('/:id', this.getOne.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.patch('/:id', this.patch.bind(this));
  }


  /**
  * Get one object matching query.
  * Uses findOne with _id of Object.
  * Derived controllers can augment behaviour.
  * @param  {Object.<_id>} _id Object ID to search for.
  * @return {Promise} Document.
  */
  findFromId({_id}) {
    return this.constructor.collection
      .findOne({_id}).exec()
      .then((e) => e || Promise.reject(this._httpError(404)));
  }

  findAll(query) {
    return this.constructor.collection.find(query);
  }

  updateFromId({_id}) {
    return Promise.reject(this._httpError(405));
  }

  _httpError(code, message) {
    const err = new Error(message);
    err.status = code;
    return err;
  }

  _servePromise(p, res, next) {
    return p
    .then((json) => res.json(json))
    .catch((err) => next(err));
  }

  /**
  * Serve a list of items matching query.
  * Base implementation returns all objects using `findAll`.
  * 
  * @param {Request} req 
  * @param {Response} res 
  * @param {Next} next 
  */
  getList(req, res, next) {
    this._servePromise(
      this.findAll({}),
      res,
      next
    );
  }

  getOne(req, res, next) {
    let _id = req.params.id;
    if (_id && mongoose.Types.ObjectId.isValid(_id)) {
      this._servePromise(
        this.findFromId({_id}),
        res,
        next,
      );
    } else {
      next(this._httpError(400));
    }
  }

  patch(req, res, next) {
    let _id = req.params.id;
    if (_id && mongoose.Types.ObjectId.isValid(_id)) {
      this._servePromise(
        this.updateFromId({_id}),
        res, next
      );
    } else {
      next(this._httpError(400));
    }
  }

  create(req, res, next) {
    if (req.is('multipart/form-data')) {
      this.createFromFiles(req, res, next);
    } else if (req.is('application/json') && req.body) {
      this.createFromJson(req, res, next);
    } else {
      res.status(400).end();
    }
  }

  createFromFiles(_, res, __) {
    res.status(400).end();
  }

  createFromJson(_, res, __) {
    res.status(400).end();
  }
};

export default EntityController;
