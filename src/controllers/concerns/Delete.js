import Mixin from '../../lib/Mixin';

/**
 * Handles creating an object via POST
 */
export default class DeleteConcerns extends Mixin {
  _remove(query) {
    return this.constructor.collection.remove(query);
  }

  delete() {
    let query = this._getQuery();
    this.renderer.renderPromise(
      Promise.resolve(
        query && this._remove(query)
      )
      .then((e) => e || Promise.reject(new Error('Entity not found.')))
      .catch((e) => {
        e.status = 404;
        return Promise.reject(e);
      })
    );
  }
}
