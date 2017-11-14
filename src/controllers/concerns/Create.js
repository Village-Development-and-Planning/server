import Mixin from '../../lib/Mixin';

/**
 * Handles creating an object via POST
 */
export default class CreateConcerns extends Mixin {
  _create(query) {
    return this.constructor.collection.create(query);
  }

  _createQuery() {
    return this._parseBody();
  }

  create() {
    let query = this._createQuery();
    this.renderer.renderPromise(
      query
      .then((o) => o && this._create(o))
      .then((e) => e || Promise.reject(new Error('Entity not created.')))
      .then((e) => ({
        warnings: this._parseWarnings,
        [this.constructor.entityName || 'entity']: e,
      }))
      .catch((e) => {
        e.status = 400;
        return Promise.reject(e);
      })
    );
  }

  new() {
    this.renderer.render(null, {});
  }
}
