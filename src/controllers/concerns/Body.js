import Mixin from '../../lib/Mixin';
import MPHandler from '../../lib/utils/multipart-handler';

/**
 * Handles creating an object via POST
 */
export default class BodyConcerns extends Mixin {
  _parseFileField() {
    return null;
  }

  _parseMultipart() {
    return new MPHandler(
      this.req,
      this._parseFileField.bind(this),
    ).promise;
  }

  _parseJson() {
    return Promise.resolve(this.req.body);
  }

  _parseBody() {
    this._parseWarnings = [];
    const req = this.req;
    if (req.is('multipart/form-data')) {
      return this._parseMultipart();
    } else if (req.is('application/json') && req.body) {
      return this._parseJson();
    } else {
      return Promise.reject(new Error('Unsupported upload type.'));
    }
  }
}
