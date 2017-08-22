var Busboy = require('busboy');
var Helpers = require('../other/Helpers');
var csv = require('csv');
var MappingCSVParser = require('../other/parsers/MappingCSVParser');
var BaseController = require('./BaseController');
var util = require('util');

function DataUploadController() {
    BaseController.call(this);
}

util.inherits(DataUploadController, BaseController);

/**
 * Upload the parsed CSV data.
 * @param data - The parsed CSV data.
 */
DataUploadController.prototype.uploadSurveyData = function (surveyName, data, cb) {
    this.saveSurvey(surveyName, data).then(function (survey) {
        cb(null, survey);
    }).catch(function (err) {
        cb(new Error(err)); // This is a error string so convert to error object.
    });
}

/**
 * @param datastream - The stream of data from upload
 * @param cb - error first callback
 */
DataUploadController.prototype.parseCSV = function (dataStrean, cb) {
    var self = this;

    var parser = csv.parse({ delimiter: ',', columns: true });
    var stringifyer = csv.stringify();
    var mappingCSVParser = new MappingCSVParser();

    var jsonData = [];

    mappingCSVParser.on('data', function (data) {
        var dataObj = JSON.parse(data);
        jsonData.push(dataObj);
    });

    mappingCSVParser.on('error', function (err) {
        cb(err);
    });

    mappingCSVParser.on('finish', function () {
        cb(null, jsonData);
    });

    dataStrean.pipe(parser).pipe(stringifyer).pipe(mappingCSVParser);
}

DataUploadController.prototype.receiveMultiPartData = function (req, res, next) {
    var self = req.controller.dataUploadController;

    // multipart data upload
    var busBoy = new Busboy({
        headers: req.headers
    });

    busBoy.on('file', function (fieldName
        , fileStream
        , fileName
        , encoding
        , mimeType) {

        var fileExtension = Helpers.getExtensionFromFileName(fileName);

        // Allow only if the file is a CSV type.
        if (fileExtension == 'csv') {

            // pipe with the parse Transform stream and read CSV data.
            fileName = fileName.slice(0, -4);
            self.parseCSV(fileStream, function (err, data) {

                console.log('Starting to save uploaded data. DATA:\n' + data.toString());

                self.uploadSurveyData(fileName, data, function (err, dbResponse) {
                    if (err) {
                        next(err);
                    } else {
                        res.json(dbResponse.toObject());
                    }
                });
            });

            fileStream.on('end', function () {
                // NOT IMPLEMENTED
            });

        } else {
            fileStream.resume();
            next(new Error('Please provide a .csv file only'));
        }

    });

    busBoy.on('field', function (fieldname
        , val
        , fieldnameTruncated
        , valTruncated
        , encoding
        , mimetype) {

    });

    busBoy.on('finish', function () {
        // NOT IMPLEMENTED
    });

    req.pipe(busBoy);
}

module.exports = DataUploadController;