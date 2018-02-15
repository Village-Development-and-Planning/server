import Mixin from '../../lib/Mixin';

/**
 * Handles creating an object via POST
 */
export default class UpdateConcerns extends Mixin {
  _findOneAndUpdate(getQuery, query, opts={}) {
    return this.constructor.collection
      .findOneAndUpdate(getQuery, query, Object.assign({new: true}, opts));
  }

  _updateQuery() {
    return this._parseBody();
  }

  update() {
    this.renderer.renderPromise(
      Promise.resolve(
        this._getQuery() || Promise.reject(new Error('Entity not found.'))
      ).then(
        (getQ) => this._updateQuery().then(
          (updQ) => this._findOneAndUpdate(getQ, updQ)
        )
      ).then(
        (e) => e || Promise.reject(new Error('Entity not created.'))
      ).then(
        (e) => ({
          warnings: this._parseWarnings,
          [this.constructor.entityName || 'entity']: e,
        })
      ).catch((e) => {
        e.status = 400;
        return Promise.reject(e);
      })
    );
  }

  edit() {
    this.get();
  }
}
