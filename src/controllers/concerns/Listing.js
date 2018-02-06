import Mixin from '../../lib/Mixin';

/**
 * Handles creating an object via POST
 */
export default class ListingConcerns extends Mixin {

  _find(query) {
    if (this.constructor.collection) {
      return this.constructor.collection.find(query).select(this._findFields);
    }
  }

  _indexQuery() {
    return {};
  }

  index() {
    this.renderer.renderPromise(
      this._find(this._indexQuery()),
    );
  }
}
