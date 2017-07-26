var express = require('express');
var router = express.Router();

var DataUploadController = require('../controllers/DataUploadController');

var dataUploadController = new DataUploadController();

/*
    Gendral /mapping router.
    Following things happen here:
        + puts the specific controller object into the req.controller.<object>
*/
router.use(function (req, res, next) {
    var path = req.path;

    req.controller = {};

    if (path.startsWith('/dataupload')) {
        req.controller.dataUploadController = dataUploadController;
    }

    next();
});

router.post('/dataupload', dataUploadController.receiveMultiPartData);

module.exports = router;