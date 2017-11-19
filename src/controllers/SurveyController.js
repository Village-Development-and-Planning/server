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
  _find(query) {
    return super._find(query)
      .select('name description enabled modifiedAt');
  }


  _parseEntity(obj) {
    obj.enabled = !!obj.enabled;
    obj.respondents = obj.respondents && obj.respondents.split(',');

    if (obj.csv) {
      if (obj.csv.warnings) {
        this._parseWarnings.push(...obj.csv.warnings);
      }
      obj.question = obj.csv.root;
    }

    return this._filterObject(
      obj,
      ['name', 'description', 'respondents', 'enabled', 'question'],
    );
  }

  _parseFileField({mime, field, file, fields}) {
    if (mime == 'application/octet-stream' ||
      mime == 'text/csv' ||
      mime == 'application/vnd.ms-excel'
    ) {
      return this._parseCSV(file);
    } else {
      return null;
    }
  }

  /**
   * parse CSV from stream and return promise that resolves to created DB
   * record.
   * @param  {Stream} stream Readable stream of CSV file
   * @return {Promise.<Survey>} Promise resolving to Survey record
   */
  _parseCSV(stream) {
    const parser = new SurveyCSVParser();
    stream.pipe(parser);
    return parser.promise;
  }
}

Object.assign(SurveyController, {
  collection: Survey,
  entityName: 'survey',
  routeName: 'surveys',
});
module.exports = SurveyController;
