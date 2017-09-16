const cmsRouter = require('express').Router()

require('../../controllers/QuestionController').registerRoute(cmsRouter)
require('../../controllers/SurveyController').registerRoute(cmsRouter)
require('../../controllers/SurveyorController').registerRoute(cmsRouter)

module.exports = cmsRouter;