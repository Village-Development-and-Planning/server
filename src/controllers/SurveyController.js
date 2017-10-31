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
  findAll(query) {
    return super
    .findAll(query)
    .select('name description enabled modifiedAt');
  }
  createFromMultipart() {
    this.renderer.renderPromise(
      new MPHandler(
        this.req,
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
      ).promise
    );
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

  _updateableAttributes() {
    return {enabled: true, name: true, description: true};
  }
}

Object.assign(SurveyController, {
  collection: Survey,
  routeName: 'surveys',
});
module.exports = SurveyController;
