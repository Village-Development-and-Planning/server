const express = require('express');

/**
 * Base Controller.
 * 
 * @class BaseController
 */
class BaseController {
  constructor({router}) {
    this.router = router;
  }

  static registerRoute(app) {
    if (this.routeName) {
      (console.log(`Registering: /${this.routeName} => ${this.name}`));
      let ctrl = new this({router: new express.Router()});
      app.use('/' + this.routeName, ctrl.router);
    }
  }
}
export default BaseController;
