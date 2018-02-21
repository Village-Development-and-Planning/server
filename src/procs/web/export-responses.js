import {ChildTemplate} from '../child-process';
import Mixin from '../../lib/Mixin';
import SurveyExport from '../concerns/SurveyExport';
import Cursor from '../concerns/Cursor';

import Statistic from '../../models/Statistic';

import CSVWriter from 'csv-stringify';
import fs from 'fs';

export default class ExportResponses
extends Mixin.mixin(ChildTemplate, SurveyExport, Cursor) {
  execute(proc) {
    this.surveyId = proc.args;
    return this.getSurvey()
    .then(() => this.getExportHeader())
    .then(() => this.collectStatistics());
  }

  collectStatistics() {
    return new Promise((res, rej) => {
      this.writer = this._createCsvWriter(this.surveyId, rej);
      this.writer.on('error', rej);
      this.writer.write(this.collectionKeys);
      this.writer.write(this.collectionKeys.map(
        (k) => this.collectionKeys[`pos${k}`]
      ));
      this.rowCount = 2;
      this.iterateCursor(
        Statistic.find({
          type: 'SurveyResponse',
          key: this.surveyId,
        }),
        'collectOneStatistic',
      ).then((out) => {
        this.writer.end(null, null, () => res({
          processedStats: out,
          numRows: this.rowCount,
        }));
      });
    });
  }

  collectOneStatistic(stat) {
    return new Promise((res, rej) => {
      this.writer.write(
        this.collectionKeys.map((k) => stat.data[k]),
        null,
        () => {
          ++this.rowCount;
          res(stat._id);
        }
      );
    });
  }

  _createCsvWriter(surveyId, errH) {
    const path = `data/export-responses/${surveyId}.csv`;
    const mode = 'w';
    const fileStream = fs.createWriteStream(
      path,
      {encoding: 'utf8', flags: mode},
    );
    if (errH) fileStream.on('error', errH);

    const csvWriter = new CSVWriter();
    csvWriter.pipe(fileStream);
    csvWriter.on('end', () => fileStream.end());
    return csvWriter;
  }
}
