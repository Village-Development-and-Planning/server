var mongoose = require('mongoose');
var express = require('express');

class BaseController {
  constructor(opts) {
    Object.assign(this, opts);
  }

  /**
   * Generic fetch API endpoint template.  Calls getFromId and responds according to the promise.
   * @param  {[type]}   req  request
   * @param  {[type]}   res  response
   * @param  {Function} next next
   * @return {[type]}        None
   */
  fetchFromId(req, res, next) {
    this.getFromId(req.params.id)
      .then((json) => { res.json(json) })
      .catch((err) => { next(err) });
  }

  /**
   * Base implementation of getFromId.  Derived controllers can augment behaviour.
   * @param  {[type]} _id Object ID to search for.
   * @return {[type]}     Promise that resolves to one object corresponding to id.
   */
  getFromId(_id) {
    return this.constructor.collection.findOne({_id})
  }

  fetchObject(req, res, next) {
    var _id = req.params.id;
    if (_id) {
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        next(new Error("Object ID invalid."));
        return;
      } else {
        this.fetchFromId(req, res, next);
        return;
      }
    }
  }

  static registerRoute(app) {
    if (this.routeName) {
      console.log("Registering: " + this.routeName)
      app.use('/' + this.routeName, this.router());
    }
  }

  static router() {
    var router = express.Router();
    router.get("/:id", (...args) => {
      var ctrl = new this();
      ctrl.fetchObject(...args);
    });
    return router;
  }
}
module.exports = BaseController;
