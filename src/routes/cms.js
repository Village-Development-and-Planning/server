const express = require('express');
import dispatcher from './dispatcher';

/**
 *
 * @param {Express.App} app
 * @param {Class.<BaseController>} Controller
 * @param {Function} extra
 */
function registerCmsRoutes(app, Controller, extra) {
  const router = new express.Router();

  router.get('/', dispatcher(Controller, 'index'));
  router.post('/', dispatcher(Controller, 'create'));
  router.get('/new', dispatcher(Controller, 'new'));
  router.get('/:id', dispatcher(Controller, 'get'));
  router.patch('/:id', dispatcher(Controller, 'update'));
  router.delete('/:id', dispatcher(Controller, 'delete'));
  router.get('/:id/edit', dispatcher(Controller, 'edit'));
  extra && extra(router, Controller);
  app.use(`/${Controller.routeName}`, router);
  (console.log(
    `[CMS] Registered @ /${Controller.routeName} for ${Controller.name}`
  ));
}

const cmsRouter = new express.Router();
registerCmsRoutes(
  cmsRouter,
  require('../controllers/SurveyController'),
  (app, ctrl) => {
    app.get('/:id/download', dispatcher(ctrl, 'download'));
    app.get('/:id/answers', dispatcher(ctrl, 'answers'));
    app.post('/:id/reset', dispatcher(ctrl, 'reset'));
  }
);
registerCmsRoutes(
  cmsRouter,
  require('../controllers/AnswerController'),
);
registerCmsRoutes(
  cmsRouter,
  require('../controllers/ArtifactController'),
  (app, ctrl) => {
    app.get('/:id/download', dispatcher(ctrl, 'download'));
  }
);
registerCmsRoutes(
  cmsRouter,
  require('../controllers/ProcessController'),
);
registerCmsRoutes(
  cmsRouter,
  require('../controllers/LocationController'),
);
registerCmsRoutes(
  cmsRouter,
  require('../controllers/SurveyorController'),
);
registerCmsRoutes(
  cmsRouter,
  require('../controllers/UserController'),
);
module.exports = cmsRouter;
