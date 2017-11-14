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

  _questionParser({mime, field}) {
    if (mime == 'application/octet-stream' ||
      mime == 'text/csv' ||
      mime == 'application/vnd.ms-excel'
    ) {
      entities.push(field);
      return this.parseCSV(file, {
        name: data[`${field}Name`] || field,
        description: data[`${field}Description`] || field,
      });
    } else {
      (console.log(`File has unknown mime-type: ${mime}`));
      return null;
    }
  }

  createFromMultipart() {
    const entities = [];
    this.renderer.renderPromise(
      new MPHandler(
        this.req,
        (field, file, fname, encoding, mime, data) =>
          this._questionParser({mime, field}),
      ).promise.then(
        (body) => entities.map(
          (key) => body[key]
        )
      )
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
    return parser.promise
      .then((s) => {
        return Survey.create(this.survey);
      })
      .catch((e) => {
        e.status = 400;
        return Promise.reject(e);
      });
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
