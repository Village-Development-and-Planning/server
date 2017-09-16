var Survey = require('../data/models/Survey');
var Question = require('../data/models/Question');
var Option = require('../data/models/Option');

class BaseController {
  constructor(collection) {
    this.collection = collection;
  }

  /**
   * Generic fetch API endpoint template.  Calls getFromId with callback to return response in JSON.
   * @param  {[type]}   req  request
   * @param  {[type]}   res  response
   * @param  {Function} next next
   * @return {[type]}        None
   */
  fetchFromId(req, res, next) {
    return this.getFromId(req.params.id)
      .then((json) => { res.json(json) })
      .catch((err) => { next(err) });
  }

  /**
   * Base implementation of getFromId.  Derived controllers can augment behaviour.
   * @param  {[type]} _id Object ID to search for.
   * @return {[type]}     Promise that resolves to one object corresponding to id.
   */
  getFromId(_id) {
    return this.collection.findOne({_id})
  }

}
module.exports = BaseController;