const Survey = require('../data/models/Survey');
import fs from 'fs';
import StreamConcat from 'stream-concat';
import EntityController from './EntitiyController';
let SurveyCSVParser = require('../lib/csv/survey-csv-parser');
import SurveyResponse from '../procs/survey-response.proc';

/**
 * Survey document controller.
 * 
 * @class SurveyController
 * @extends {BaseController}
 */
class SurveyController extends EntityController {
  download() {
    return Promise.resolve(this._getQuery())
    .then((q) => q && this._findOne(q))
    .then((e) => e || Promise.reject(new Error('Entity not found.')))
    .catch((err) => this.renderer.renderPromise(Promise.reject(err)))
    .then((survey) => {
      const _id = survey._id;
      const path = SurveyResponse.csvPath(_id);
      const headerPath = SurveyResponse.csvHeaderPath(_id);
      if (fs.existsSync(path) && fs.existsSync(headerPath)) {
        const csvOutput = new StreamConcat([
          fs.createReadStream(headerPath),
          fs.createReadStream(path),
        ]);
        const res = this.renderer.res;
        res.attachment(`${survey.name || _id}.csv`);
        csvOutput.on('end', () => res.end());
        csvOutput.pipe(res);
      } else {
        this.renderer.renderPromise(
          Promise.reject(
            new Error('Export file not found.')
          )
        );
      }
    });
  }


  _find(query) {
    return super._find(query)
      .select('name description enabled modifiedAt');
  }


  _parseEntity(obj) {
    obj.enabled = !!obj.enabled;
    if (typeof obj.respondents === 'string') {
      if (obj.respondents == 'none') {
        obj.respondents = null;
      } else {
        obj.respondents = obj.respondents.split(',');
      }
    }

    if (obj.csv) {
      if (obj.csv.warnings) {
        this._parseWarnings.push(...obj.csv.warnings);
      }
      obj.question = obj.csv.root;
    }

    let filter = ['name', 'description', 'respondents', 'enabled', 'question'];
    if (this.action === 'create') {
      filter = filter.concat('_id');
    }
    return this._filterObject(obj, filter);
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
