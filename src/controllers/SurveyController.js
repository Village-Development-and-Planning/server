const Survey = require('../data/models/Survey');
import EntityController from './EntitiyController';
import MPHandler from '../lib/utils/multipart-handler';
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
    this.router.post('/', this.createFromFiles.bind(this));
  }

  createAnswer(req, res, next) {
    res.json({error: 'Unimplemented'});
  }

  createFromFiles(req, res, next) {
    new MPHandler(
      req, res,
      (field, file, fname, encoding, mime, data) => {
        if (mime == 'application/octet-stream' || mime == 'text/csv') {
          return this.parseCSV(file, {
            name: data[`${field}Name`] || field,
            description: data[`${field}Description`] || field,
          });
        } else {
          return null;
        }
      }
    );
  }

  findFromId(surveyID) {
    return Survey.findOne({_id: surveyID})
      .exec()
      .then(
        (survey) => {
          if (!survey) {
            return Promise.reject(new Error('No Survey found!'));
          }
          return survey;
          // return Question.fetchDeep(survey.question).then((q) => {
          //   survey.question = q;
          //   return survey;
          // });
        });
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
