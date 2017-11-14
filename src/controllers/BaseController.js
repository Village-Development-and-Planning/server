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
    if (this[`_pre${method}`]) {
      this[`_pre${method}`]();
    }
    this[method]();
    if (this[`_post${method}`]) {
      this[`_post${method}`]();
    }
  }
}
export default BaseController;
