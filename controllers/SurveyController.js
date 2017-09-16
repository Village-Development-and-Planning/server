var Survey = require('../data/models/Survey');
var Question = require('../data/models/Question');
var BaseController = require('./BaseController');

var Busboy = require('busboy');
var Helpers = require('../config/Helpers');
var csv = require('csv');

class SurveyController extends BaseController {

  getFromId(surveyID) {
    return Survey.findOne({ _id: surveyID })
    .exec()
    .then(
      (survey) => {
        if (!survey) {
          return new Promise.reject(new Error("No Survey found!"));
        }
        survey.questions = survey.questions || [];
        return Promise.all(survey.questions.map(
          (q) => {
            if (q) {
              return Question.fetchDeep(q.question).then((qData) => {
                q.question = qData;
                return q;
              })
            } else {
              return null;
            }
          }))
          .then((ques) => {
            survey.questions = ques;
            return survey;
          })
      });
  }

  static router() {
    var router = super.router();
    router.post("/import", (...args) => {
      var ctrl = new this();
      ctrl.createFromMultipart(...args);
    });
    return router;
  }

  createFromMultipart(req, res, next) {
    // multipart data upload
    var busBoy = new Busboy({
      headers: req.headers
    });

    busBoy.on(
      'file', 
      ( fieldName, fileStream, fileName,
        encoding, mimeType ) => {

        var fileExtension = Helpers.getExtensionFromFileName(fileName);

        // Allow only if the file is a CSV type.
        if (fileExtension == 'csv') {

          // pipe with the parse Transform stream and read CSV data.
          fileName = fileName.slice(0, -4);
          this.parseCSV(fileStream, function (err, data) {
            if (err) {
              next(err);
            } else {
              console.log('Starting to save uploaded data. DATA:\n' + data.toString());
              this.uploadSurveyData(
                fileName, 
                JSON.parse(data.toString()), 
                function (err, dbResponse) {
                  if (err) {
                    next(err);
                  } else {
                    res.json(dbResponse.toObject());
                  }
              });
            }
          });

        } else {
          fileStream.resume();
          next(new Error('Please provide a .csv file only'));
        }

    });

    req.pipe(busBoy);
  }

  /**
   * @param datastream - The stream of data from upload
   * @param cb - error first callback
   */
  parseCSV(dataStrean, cb) {
    var parser = csv.parse({ delimiter: ',', columns: true });
    var stringifyer = csv.stringify();
    var mappingSurveyCSVParser = new MappingSurveyCSVParser();

    var jsonData = [];

    mappingSurveyCSVParser.on('data', function (data) {
      console.log('Data received!');
      console.log(data.toString());
      jsonData = data;
    });

    mappingSurveyCSVParser.on('error', function (err) {
      cb(err);
    });

    mappingSurveyCSVParser.on('finish', function () {
      cb(null, jsonData);
    });

    dataStrean.pipe(parser).pipe(stringifyer).pipe(mappingSurveyCSVParser);
  }

  /**
   * Upload the parsed CSV data.
   * @param data - The parsed CSV data.
   */
  uploadSurveyData(surveyName, data, cb) {
    Survey.saveDeep(surveyName, data).then(function (survey) {
      cb(null, survey);
    }).catch(function (err) {
      cb(new Error(err)); // This is a error string so convert to error object.
    });
  }

}

Object.assign(SurveyController, {
  collection: Survey,
  routeName: 'surveys'
});

module.exports = SurveyController;
