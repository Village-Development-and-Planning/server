var Survey = require('../data/models/Survey');
var Question = require('../data/models/Question');
var BaseController = require('./BaseController');

// var csv = require('csv');
// var MappingSurveyCSVParser = require('../config/parsers/MappingSurveyCSVParser');

const MPHandler = require('../utils/multipart-handler');
var SurveyCSVParser = require('../utils/survey-csv-parser');

class SurveyController extends BaseController {

  constructor(opts) {
    super(opts);
    this.router.post(
      "/import", MPHandler(this.createFromFile.bind(this))
    );
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

  createFromFile(name, file, fname) {
    if (fname.endsWith(".csv")) {
      return this.parseCSV(name, file);
    } else {
      return null;
    }

  }

  /**
   * parse CSV from stream and return promise that resolves to created DB
   * record.
   * @param  {[type]} stream Readable stream of CSV file
   * @return {[type]}        Promise resolving to Survey record
   */
  parseCSV(name, stream) {
    var parser = new SurveyCSVParser({surveyName: name});
    parser.parse(stream);
    return parser.promise;
  }

  /**
   * @param datastream - The stream of data from upload
   */
  // _parseCSV(dataStream) {
  //   return new Promise((res, rej) => {
  //     var parser = csv.parse({ delimiter: ',', columns: true });
  //     var stringifyer = csv.stringify();
  //     var mappingSurveyCSVParser = new MappingSurveyCSVParser();
  //     var jsonData = [];

  //     mappingSurveyCSVParser.on('data', function (data) {
  //       jsonData = data;
  //     });
  //     mappingSurveyCSVParser.on('error', function (err) {
  //       rej(err);
  //     });

  //     mappingSurveyCSVParser.on('finish', function () {
  //       res(jsonData);
  //     });
  //     dataStream.pipe(parser).pipe(stringifyer).pipe(mappingSurveyCSVParser);
  //   });
  // }

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
