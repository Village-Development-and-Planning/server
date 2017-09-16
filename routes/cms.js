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
        req.controller = new QuestionController();
    } else if (path.startsWith('/surveyor')) {
        req.controller = new SurveyorController();
    }
    else if (path.startsWith('/survey')) {
        req.controller = new SurveyController();
    }

    next();
});

// middleware to check if the ObjectId provided by the client is in the right format.
var checkFetchObjectId = function (req, res, next) {
    var _id = req.params.id;
    if (_id) {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            next(new Error("Please enter a valid ObjectId"));
            return;
        } else {
            req.controller.fetchFromId(req, res, next);
            return;
        }
    }
}

// Fetch for /<entity>/:id
router.get('/question/:id', checkFetchObjectId);
router.get('/survey/:id', checkFetchObjectId);
router.get('/surveyor/:id', checkFetchObjectId);

module.exports = router;