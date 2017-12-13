import fs from 'fs';
import CSVWriter from 'csv-stringify';
import CSVParser from 'csv-parse';

import Survey from '../data/models/Survey';
import Answer from '../data/models/Answer';

/**
 * Batch post-processor for Survey responses
 */
export default class SurveyResponseProcessor {
  constructor(surveyId) {
    this.surveyId = surveyId;
    this.surveyPromise = Survey.findOne({_id: surveyId});
  }

  processAnswers() {
    return this.surveyPromise
    .then((s) => s && s.respondents)
    .then((respondents) => this.surveyRespondents = respondents)
    .then(
      () => this._readCSVHeader().then(
        (keys) => this.csvKeys = keys,
        () => this.csvKeys = [],
      )
    ).then(
      () => console.log(`Got ${this.csvKeys.length} keys`)
    ).then(() =>
      new Promise((res, rej) => {
        const cursor = Answer.find({
          survey: this.surveyId,
        }).cursor();

        this.csvWriter = this._createCsvWriter();

        const result = [];
        cursor.on(
          'data',
          (answer) => {
            if (!answer) return;
            this._collectAnswer(answer);
            answer.lastExport = Date.now();
            result.push(
              answer.save().then(() => answer._id),
            );
          }
        );
        cursor.on('error', (err) => rej(err));
        cursor.on('end', () => {
          this.csvWriter.end();
          this._writeCSVHeader();
          res(Promise.all(result));
        });
      })
    );
  }

  _writeCSVObj(obj) {
    this.csvWriter.write(
      this.csvKeys.map((k) => obj[k])
    );
  }

  _collectAnswer(answer) {
    if (!answer || !answer.rootQuestion) return;

    if (!this.surveyRespondents) {
      const obj = answer.rootQuestion.collect({keys: this.csvKeys});
      console.log(`Starting to process answer ${answer._id}`);
      this._writeCSVObj(obj);
    } else {
      this.surveyRespondents.forEach((resp, idx) => {
        answer.rootQuestion.findRespondents({
          keys: this.csvKeys,
          respondents: this.surveyRespondents,
          cb: this._collectRespondent.bind(this),
          idx,
        });
      });
    }
  }

  _collectRespondent(question, {acc, prefix}) {
    question.answers.forEach((ans, idx) => {
      const obj = question.collectAnswer({
        ans, idx, acc,
        keys: this.csvKeys,
        ansKey: prefix,
      });
      this._writeCSVObj(obj);
    });
  }

  static csvPath(surveyId) {
    return `data/survey-response/${surveyId}.csv`;
  }
  static csvHeaderPath(surveyId) {
    return `data/survey-response/${surveyId}-header.csv`;
  }

  _readCSVHeader() {
    return new Promise((res, rej) => {
      const filePath = this.constructor.csvHeaderPath(this.surveyId);
      const reader = this._createCsvReader(filePath, rej);

      let rows = [];
      reader.on('end', () => res(rows));
      reader.on('error', rej);

      reader.on('readable', () => {
        let data = null;
        while (data = reader.read()) {
          rows.push(data);
        }
      });
    }).then((rows) => {
      const keys = rows[0];
      keys.forEach(
        (e, i) =>
          keys[`pos${e}`] = (rows[1] && rows[1][i]) || true
      );
      return keys;
    });
  }

  _writeCSVHeader() {
    if (!this.csvKeys || !this.csvKeys.length) return;
    const filePath = this.constructor.csvHeaderPath(this.surveyId);
    return new Promise((res, rej) => {
      const csvWriter = this._createCsvWriter(filePath, 'w', rej);
      csvWriter.on('error', rej);
      csvWriter.write(this.csvKeys);
      csvWriter.end(null, null, res);
    });
  }

  _createCsvReader(path, errH) {
    const fileStream = fs.createReadStream(path, {encoding: 'utf8'});
    if (errH) fileStream.on('error', errH);
    const csvReader = new CSVParser();
    fileStream.pipe(csvReader);
    return csvReader;
  }

  _createCsvWriter(path, mode, errH) {
    if (!path) {
      path = this.constructor.csvPath(this.surveyId);
      mode = 'a';
    }
    if (!mode) mode = 'w';

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
