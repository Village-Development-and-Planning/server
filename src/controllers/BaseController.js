/**
 * Base Controller.
 * 
 * @class BaseController
 */
class BaseController {
  constructor({renderer, req}) {
    this.req = req;
    this.renderer = renderer;
  }

  dispatch(method) {
    let promise = Promise.resolve(
      (this[`_pre${method}`]) &&
      (this[`_pre${method}`])()
    );
    promise = promise.then(() => this[method]());
    promise = promise.then(
      () => (
        (this[`_post${method}`]) &&
        (this[`_post${method}`])()
      )
    );
    return promise;
  }
}
export default BaseController;
