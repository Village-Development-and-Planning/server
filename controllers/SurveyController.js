var Survey = require('../data/models/Survey');
var Question = require('../data/models/Question');
var BaseController = require('./BaseController');

var Busboy = require('busboy');
var Helpers = require('../config/Helpers');
var csv = require('csv');
var MappingSurveyCSVParser = require('../config/parsers/MappingSurveyCSVParser');

const MPHandler = require('../utils/multipart-handler');

class SurveyController extends BaseController {

  constructor(opts) {
    super(opts);
    this.router.post(
      "/import",
      MPHandler(this.createFromFile.bind(this)));
  }

  createFromFile(field, file, fname) {
    if (fname.endsWith(".csv")) {
      return this.parseCSV(file)
        .then( data => this.uploadSurveyData(fname, JSON.parse(data.toString())) );            
    } else {
      return null;
    }

  }

  getFromId(surveyID) {
    return Survey.findOne({ _id: surveyID })
    .exec()
    .then(
      (survey) => {
        if (!survey) {
          return Promise.reject(new Error("No Survey found!"));
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

  createFromMultipart(req, res, next) {
    // multipart data upload
    var busBoy = new Busboy({
      headers: req.headers
    });

    busBoy.on(
      'file', 
      ( fieldName, fileStream, fileName, encoding, mimeType ) => {

        var fileExtension = Helpers.getExtensionFromFileName(fileName);

        // Allow only if the file is a CSV type.
        if (fileExtension == 'csv') {

          // pipe with the parse Transform stream and read CSV data.
          fileName = fileName.slice(0, -4);
          this.parseCSV(fileStream, (err, data) => {
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
  parseCSV(dataStream) {
    return new Promise((res, rej) => {
      var parser = csv.parse({ delimiter: ',', columns: true });
      var stringifyer = csv.stringify();
      var mappingSurveyCSVParser = new MappingSurveyCSVParser();
      var jsonData = [];

      mappingSurveyCSVParser.on('data', function (data) {
        jsonData = data;
      });
      mappingSurveyCSVParser.on('error', function (err) {
        rej(err);
      });

      mappingSurveyCSVParser.on('finish', function () {
        res(jsonData);
      });
      dataStream.pipe(parser).pipe(stringifyer).pipe(mappingSurveyCSVParser);
    });
  }

  /**
   * Upload the parsed CSV data.
   * @param data - The parsed CSV data.
   */
  uploadSurveyData(surveyName, data) {
    return Survey.saveDeep(surveyName, data);
  }

}

Object.assign(SurveyController, {
  collection: Survey,
  routeName: 'surveys'
});

module.exports = SurveyController;
