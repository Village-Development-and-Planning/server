const express = require('express');
const cmsRouter = new express.Router();

require('../../controllers/QuestionController').registerRoute(cmsRouter);
require('../../controllers/SurveyController').registerRoute(cmsRouter);
require('../../controllers/SurveyorController').registerRoute(cmsRouter);
require('../../controllers/AnswerController').registerRoute(cmsRouter);

module.exports = cmsRouter;
