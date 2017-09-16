var express = require('express');
var router = express.Router();

var SurveyUploadController = require('../../controllers/SurveyUploadController');

var surveyUploadController = new SurveyUploadController();

/*
  General /mapping router.
  Following things happen here:
      + puts the specific controller object into the req.controller.<object>
*/
router.use(function (req, res, next) {
  var path = req.path;

  req.controller = {};

  if (path.startsWith('/surveyupload')) {
      req.controller.surveyUploadController = surveyUploadController;
  }

  next();
});

router.post('/surveyupload', surveyUploadController.receiveMultiPartData);

module.exports = router;