const Survey = require('../models/Survey');
import Answer from '../models/Answer';
import Statistic from '../models/Statistic';

import fs from 'fs';
import co from 'co';
import EntityController from './EntitiyController';
let SurveyCSVParser = require('../lib/csv/survey-csv-parser');

/**
 * Survey document controller.
 *
 * @class SurveyController
 * @extends {BaseController}
 */
class SurveyController extends EntityController {
  reset() {
    let _id = this.req.params.id;
    this.renderer.renderPromise(
      Statistic.deleteMany({key: _id})
      .then(() => Answer.update(
        {survey: _id, lastExport: {$ne: null}},
        {lastExport: null},
        {multi: true}
      )).then(() => this._findOneAndUpdate(
        this._getQuery(),
        {answerStats: {processed: 0}},
      ))
    );
  }

  answers() {
    let _id = this.req.params.id;
    this.renderer.renderPromise(
      Statistic.findOne({type: 'SurveyResponseHeader', key: _id})
      .then(
        (header) => (header && header.data) || {keys: [], keyDescriptions: []}
      ).then(({keys, keyDescriptions}) => {
        return Statistic.find({
          type: 'SurveyResponse', key: _id,
        }).limit(50)
        .then((stats) => stats.reduce(
          (acc, stat) => {
            let data = stat.data;
            if (data) {
              acc.push(
                keys.map((k) => data[k])
              );
            }
            return acc;
          },
          [keys, keyDescriptions],
        ));
      })
    );
  }

  download() {
    return Promise.resolve(this._getQuery())
    .then((q) => q && this._findOne(q))
    .then((e) => e || Promise.reject(new Error('Entity not found.')))
    .catch((err) => this.renderer.renderPromise(Promise.reject(err)))
    .then((survey) => {
      const _id = survey._id;
      const path = `data/export-responses/${_id}.csv`;
      if (fs.existsSync(path)) {
        const res = this.renderer.res;
        res.attachment(`${survey.name || _id}.csv`);
        const csvOutput = fs.createReadStream(path);
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

  _findOne(query) {
    return super._findOne(query)
    .then((survey) => survey.toObject())
    .then((survey) => co(function* () {
      let aStats = survey.answerStats = survey.answerStats || {};
      aStats.total = yield Answer.count({
        survey: survey._id,
      });
      aStats.processed = aStats.processed || 0;
      return survey;
    }));
  }


  _parseEntity(obj) {
    if (typeof obj.enabled !== 'undefined') obj.enabled = !!obj.enabled;
    if (typeof obj.respondents === 'string') {
      if (!obj.respondents || obj.respondents == 'none') {
        obj.respondents = null;
      } else {
        obj.respondents = obj.respondents && obj.respondents.split(',');
      }
    }

    if (obj.csv) {
      if (obj.csv.warnings) {
        this._parseWarnings.push(...obj.csv.warnings);
      }
      obj.question = obj.csv.root;
    }

    let filter = 'name description respondents enabled question aggregates'
      + ' postProcessing';
    if (this.action === 'create') {
      filter = filter + ' _id';
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
