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


}
module.exports = BaseController;