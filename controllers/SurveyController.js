const Survey = require('../data/models/Survey');
const Question = require('../data/models/Question');
import EntityController from './EntitiyController';

const mpHandler = require('../lib/utils/multipart-handler');
let SurveyCSVParser = require('../lib/csv/survey-csv-parser');


/**
 * Survey document controller.
 * 
 * @class SurveyController
 * @extends {BaseController}
 */
class SurveyController extends EntityController {
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
          return Question.fetchDeep(survey.question).then((q) => {
            survey.question = q;
            return survey;
          });
        });
  }

  createFromFile(name, file, fname) {
    if (fname.endsWith('.csv')) {
      return this.parseCSV(file, {name});
    } else {
      return null;
    }
  }

  /**
   * parse CSV from stream and return promise that resolves to created DB
   * record.
   * @param  {Stream} stream Readable stream of CSV file
   * @param  {Object} surveyOpts survey options
   * @return {Promise.<Survey>}        Promise resolving to Survey record
   */
  parseCSV(stream, surveyOpts) {
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
