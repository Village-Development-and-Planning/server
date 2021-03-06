import Mixin from '../../lib/Mixin';

/**
 * Handles creating an object via POST
 */
export default class CreateConcerns extends Mixin {
  _create(query) {
    return this.constructor.collection
    .create(query)
    .then((obj) => this._filterObject(obj, this._createFields));
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
        if (e.errors) {
          e.details = Object.keys(e.errors).map(
            (key) => ({key, message: e.errors[key].message})
          );
        }
        return Promise.reject(e);
      })
    );
  }

  new() {
    this.renderer.render(null, {});
  }
}
