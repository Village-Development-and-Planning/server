const express = require('express');
const cmsRouter = new express.Router();

['Survey', 'Surveyor', 'Answer'].forEach((ctrlName) => {
  require(`../../controllers/${ctrlName}Controller`).registerRoute(cmsRouter);
});

module.exports = cmsRouter;
