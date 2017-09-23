const Survey = require('../data/models/Survey');
const Question = require('../data/models/Question');
const BaseController = require('./BaseController');

const mpHandler = require('../utils/multipart-handler');
let SurveyCSVParser = require('../utils/survey-csv-parser');


/**
 * Survey document controller.
 * 
 * @class SurveyController
 * @extends {BaseController}
 */
class SurveyController extends BaseController {
  /**
   * Creates an instance of SurveyController.
   * @param {any} opts 
   * 
   * @memberOf SurveyController
   */
  constructor(opts) {
    super(opts);
    this.router.post(
      '/import', mpHandler(this.createFromFile.bind(this))
    );
  }


  getFromId(surveyID) {
    return Survey.findOne({_id: surveyID})
      .exec()
      .then(
        (survey) => {
          if (!survey) {
            return Promise.reject(new Error('No Survey found!'));
          }
          survey.questions = survey.questions || [];
          return Promise.all(survey.questions.map(
            (q) => {
              if (q) {
                return Question.fetchDeep(q.question).then((qData) => {
                  q.question = qData;
                  return q;
                });
              } else {
                return null;
              }
            }))
            .then((ques) => {
              survey.questions = ques;
              return survey;
            });
        });
  }

  createFromFile(name, file, fname) {
    if (fname.endsWith('.csv')) {
      return this.parseCSV({name, stream: file});
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
  parseCSV({stream, ...surveyOpts}) {
    let parser = new SurveyCSVParser({survey: surveyOpts});
    stream.pipe(parser);
    return parser.promise;
  }
}

Object.assign(SurveyController, {
  collection: Survey,
  routeName: 'surveys',
});
module.exports = SurveyController;
