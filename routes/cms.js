var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var QuestionController = require('../controllers/QuestionController');
var SurveyController = require('../controllers/SurveyController');
var SurveyorController = require('../controllers/SurveyorController');

var questionController = new QuestionController();
var surveyController = new SurveyController();
var surveyorController = new SurveyorController();

/*
    Gendral /cms router.
    Following things happen here:
        + puts the specific controller object into the req.controller.<object>
*/
router.use(function (req, res, next) {
    var path = req.path;

    req.controller = {};

    if (path.startsWith('/question')) {
        req.controller.questionController = questionController;
    } else if (path.startsWith('/surveyor')) {
        req.controller.surveyorController = surveyorController;
    }
    else if (path.startsWith('/survey')) {
        req.controller.surveyController = surveyController;
    }

    next();
});

// middleware to check if the ObjectID provided by the client is in the right format.
var checkObjectID = function (req, res, next) {
    var _id = req.params.id;
    if (_id) {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            next(new Error("Please enter a valid ObjectID"));
            return;
        } else {
            next();
        }
    }
}

// question for id
router.get('/question/:id', checkObjectID, questionController.sendSingleQuestion);

// survey for id
router.get('/survey/:id', checkObjectID, surveyController.sendSingleSurvey);

// surveyor for id
router.get('/surveyor/:id', checkObjectID, surveyorController.sendSingleSurveyor);

module.exports = router;