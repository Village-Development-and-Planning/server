import {ChildTemplate} from '../child-process';

import Survey from '../../models/Survey';
import Statistic from '../../models/Statistic';

import CSVWriter from 'csv-stringify';
import fs from 'fs';

export default class ExportResponses extends ChildTemplate {
  execute(proc) {
    this.surveyId = proc.args;
    return this.getSurvey()
    .then(() => this.getExportHeader())
    .then(() => this.collectStatistics());
  }

  getSurvey() {
    return Survey
    .findOne({_id: this.surveyId})
    .then((survey) => {
      this.survey = survey;
      if (survey) {
        this.surveyRespondents = survey.respondents;
      } else {
        return Promise.reject(`Survey: ${this.surveyId} not found.`);
      }
    });
  }

  collectStatistics() {
    this.log = [];
    const cursor = Statistic.find({
      type: 'SurveyResponse',
      key: this.surveyId,
      name: 'obj',
    }).cursor();
    return new Promise((res, rej) => {
      this.writer = this._createCsvWriter(this.surveyId, rej);
      this.writer.on('error', rej);
      this.writer.write(this.collectionKeys);
      this.writer.write(this.collectionKeys.map(
        (k) => this.collectionKeys[`pos${k}`]
      ));
      cursor.on('data', (stat) => stat && this.collectOneStatistic(stat));
      cursor.on('error', rej);
      cursor.on('end', () => this.writer.end(null, null, res));
    });
  }


  collectOneStatistic(stat) {
    this.writer.write(
      this.collectionKeys.map((k) => stat.data[k])
    );
  }


  getExportHeader() {
    return Statistic
    .findOne({type: 'SurveyResponse', key: this.surveyId, name: 'objKeys'})
    .then((stat) => {
      this.collectionKeys = [];
      if (stat && stat.data) {
        this.collectionKeys = stat.data.keys;
        if (stat.data.keyDescriptions) {
          this.collectionKeys.forEach((key, idx) => {
            this.collectionKeys[`pos${key}`] = stat.data.keyDescriptions[idx];
          });
        }
      }
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
