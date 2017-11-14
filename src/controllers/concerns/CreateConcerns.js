import Mixin from '../../lib/Mixin';

/**
 * Handles creating an object via POST
 */
export default class CreateConcerns extends Mixin {
  _createFromMultipart() {
    this.renderer.sendError({
      status: 400, details: 'Multipart is not implemented.',
    });
  }

  _createFromJson() {
    this.renderer.sendError({
      status: 400, details: 'JSON is not supported.',
    });
  }

  create() {
    const req = this.req;
    if (req.is('multipart/form-data')) {
      this._createFromMultipart();
    } else if (req.is('application/json') && req.body) {
      this._createFromJson();
    } else {
      this.renderer.sendError({
        status: 400, details: 'Unsupported upload type.',
      });
    }
  }
}
