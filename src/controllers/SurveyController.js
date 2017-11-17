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

  _setIf(dest, key, val) {
    if (val) {
      dest[key] = val;
    }
    return dest;
  }

  _parseBody() {
    return super._parseBody().then(
      ({name, description, csv,
        enabled, respondents}) => {
        const entity = {};
        this._setIf(entity, 'name', name);
        this._setIf(entity, 'description', description);
        this._setIf(
          entity,
          'respondents', respondents && respondents.split(',')
        );
        if (csv) {
          if (csv.warnings) {
            this._parseWarnings.push(...csv.warnings);
          }
          entity.question = csv.root;
        }
        entity.enabled = !!enabled;
        return entity;
      }
    );
  }

  _parseFileField({mime, field, file, fields}) {
    if (mime == 'application/octet-stream' ||
      mime == 'text/csv' ||
      mime == 'application/vnd.ms-excel'
    ) {
      return this.parseCSV(file);
    } else {
      (console.log(`File has unknown mime-type: ${mime}`));
      return null;
    }
  }

  /**
   * parse CSV from stream and return promise that resolves to created DB
   * record.
   * @param  {Stream} stream Readable stream of CSV file
   * @return {Promise.<Survey>} Promise resolving to Survey record
   */
  parseCSV(stream) {
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
