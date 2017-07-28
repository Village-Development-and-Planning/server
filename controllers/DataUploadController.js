var Busboy = require('busboy');
var Helpers = require('../other/Helpers');
var csv = require('csv');
var MappingCSVParser = require('../other/parsers/MappingCSVParser');
var fs = require('fs');

function DataUploadController() {
}

DataUploadController.prototype.parseCSV = function (dataStrean, cb) {
    var dataObjects = []; // The CSV data as objects

    var parser = csv.parse({ delimiter: ',', columns: true });
    var stringifyer = csv.stringify();
    var mappingCSVParser = new MappingCSVParser();

    mappingCSVParser.on('data', function (data) {
        dataObjects.push(data);
    });

    mappingCSVParser.on('error', function (err) {
        cb(err);
    });

    mappingCSVParser.on('finish', function () {
        cb(null, dataObjects);
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
            self.parseCSV(fileStream, function (err, data) {

                if (err) {
                    next(err);
                } else {
                    console.log(data.toString());
                    res.json({
                        msg: 'SUCCESS'
                    });
                }

            });

            fileStream.on('end', function () {
                // NOT IMPLEMENTED
            });

        } else {
            fileStream.resume();
            next(new Error("Please provide a .csv file only"));
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