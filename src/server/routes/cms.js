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
    `Registered @ /${Controller.routeName} for ${Controller.name}`
  ));
}

const cmsRouter = new express.Router();
registerCmsRoutes(
  cmsRouter, appRequire('controllers/SurveyController')
);
registerCmsRoutes(
  cmsRouter,
  appRequire('controllers/AnswerController'),
  (app, ctrl) => {
    app.use('/:id/download', dispatcher(ctrl, 'download'));
  }
);
module.exports = cmsRouter;
