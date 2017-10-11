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
  }


  /**
  * Get one object matching query.
  * Uses findOne with _id of Object.
  * Derived controllers can augment behaviour.
  * @param  {Object.<_id>} _id Object ID to search for.
  * @return {Promise} Document.
  */
  findFromId({_id}) {
    return this.constructor.collection.findOne({_id}).exec();
  }

  findAll(query) {
    return this.constructor.collection.find(query);
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
      next(new Error('Object ID missing or invalid.'));
    }
  }
};

export default EntityController;
