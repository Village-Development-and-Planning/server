const express = require('express');
import dispatcher from './dispatcher';

/**
 * 
 * @param {Express.App} app
 * @param {Class.<BaseController>} Controller 
 */
function registerCmsRoutes(app, Controller) {
  const router = new express.Router();

  router.get('/', dispatcher(Controller, 'index'));
  router.post('/', dispatcher(Controller, 'create'));
  router.get('/new', dispatcher(Controller, 'new'));
  router.get('/:id', dispatcher(Controller, 'get'));
  router.patch('/:id', dispatcher(Controller, 'update'));
  router.delete('/:id', dispatcher(Controller, 'delete'));
  router.get('/:id/edit', dispatcher(Controller, 'edit'));
  app.use(`/${Controller.routeName}`, router);
  console.log(
    `Registered @ /${Controller.routeName} for ${Controller.name}`
  );
}

const cmsRouter = new express.Router();
['Survey', 'Surveyor', 'Answer'].forEach((ctrlName) => {
  registerCmsRoutes(
    cmsRouter,
    require(`../../controllers/${ctrlName}Controller`),
  );
});
module.exports = cmsRouter;
