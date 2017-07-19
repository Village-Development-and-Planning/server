var express = require('express');
var router = express.Router();

var QuestionController = require('../controllers/QuestionController');
var SurveyController = require('../controllers/SurveyController');
var SurveyorController = require('../controllers/SurveyorController');

var questionController = new QuestionController();
var surveyController = new SurveyController();
var surveyorController = new SurveyorController();

// question for id
router.get('/question/:id', questionController.sendSingleQuestion);

// survey for id
router.get('/survey/:id', surveyController.sendSingleSurvey);

// surveyor for id
router.get('/surveyor/:id', surveyorController.sendSingleSurveyor);

module.exports = router;