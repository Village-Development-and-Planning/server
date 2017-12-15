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
    this.action = method;
    this[method]();
  }
}
export default BaseController;
