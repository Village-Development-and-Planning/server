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

  dispatch(method, ...args) {
    this.action = method;
    this[method](...args);
  }
}
export default BaseController;
