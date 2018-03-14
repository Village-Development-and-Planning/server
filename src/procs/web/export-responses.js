import {ChildTemplate} from '../child-process';
import Mixin from '../../lib/Mixin';
import SurveyExport from '../concerns/SurveyExport';
import Cursor from '../concerns/Cursor';

import Statistic from '../../models/Statistic';

import CSVWriter from 'csv-stringify';
import fs from 'fs';
import co from 'co';

export default class ExportResponses
extends Mixin.mixin(ChildTemplate, SurveyExport, Cursor) {
  execute(proc) {
    this.surveyId = proc.args;
    return this.getSurvey()
    .then(() => this.getExportHeader())
    .then(() => this.collectStatistics());
  }

  collectStatistics() {
    return co.call(this, function* () {
      for (let {number} of this.respondents) {
        if (!number) number = null;
        const writer = this._createCsvWriter(this.surveyId, number);
        const {keys} = this.answerKeys[number];
        writer.write(keys.map(({key}) => key));
        writer.write(keys.map(({description}) => description));
        this.writer = writer;
        this.rowCount = 0;
        this.keys = keys;
        yield this.iterateCursor(
          Statistic.find({
            type: 'SurveyResponse',
            key: `${this.surveyId}/${number}`,
          }),
          'collectOneStatistic'
        ).then((out) => {
          console.log(JSON.stringify({
            _logHeader: 'stats',
            respondent: number,
            processed: out,
            numRows: this.rowCount,
          }));
        });
      }
    });
  }

  collectOneStatistic(stat) {
    return new Promise((res, rej) => {
      this.writer.write(
        this.keys.map(({key}) => stat.data[key]),
        null,
        () => {
          ++this.rowCount;
          res(stat._id);
        }
      );
    });
  }

  _createCsvWriter(surveyId, resp) {
    const path = `data/export-responses/${surveyId}-${resp}.csv`;
    const mode = 'w';
    const fileStream = fs.createWriteStream(
      path,
      {encoding: 'utf8', flags: mode},
    );
    fileStream.on('error', (err) => {
      throw err;
    });

    const csvWriter = new CSVWriter();
    csvWriter.on('error', (err) => {
      throw err;
    });

    csvWriter.pipe(fileStream);
    csvWriter.on('end', () => fileStream.end());
    return csvWriter;
  }
}
