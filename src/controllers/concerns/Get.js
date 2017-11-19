import Mixin from '../../lib/Mixin';
const mongoose = require('mongoose');

/**
 * Handles creating an object via POST
 */
export default class GetConcerns extends Mixin {
  _findOne(query) {
    return this.constructor.collection
      .findOne(query);
  }

  _getQuery() {
    let _id = this.req.params.id;
    if (_id && mongoose.Types.ObjectId.isValid(_id)) {
      return {_id};
    } else {
      return null;
    }
  }

  get() {
    let query = this._getQuery();
    this.renderer.renderPromise(
      Promise.resolve(
        query && this._findOne(query)
      )
      .then((e) => e || Promise.reject(new Error('Entity not found.')))
      .catch((e) => Promise.reject(Object.assign(e, {status: 404})))
    );
  }
}
