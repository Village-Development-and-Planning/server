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
    ).then(() =>
      new Promise((res, rej) => {
        const cursor = Answer.find({
          survey: this.surveyId,
        }).cursor();

        this.csvWriter = this._createCsvWriter(
          this.constructor.csvPath(this.surveyId), 'a', rej
        );

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

  sortAnswers() {
    return this._readCSVHeader()
      .then((keys) => this.csvKeys = keys)
      .then(
        () => new Promise((res, rej) => {
          const inPath = this.constructor.csvPath(this.surveyId);
          const outPath = this.constructor.csvSortedPath(this.surveyId);
          const reader = this._createCsvReader(inPath, rej);
          const writer = this._createCsvWriter(outPath, 'w', rej);

          const sortedKeyIndices = this.csvKeys
            .map((key, index) => ({key: key, index}))
            .sort((a, b) => {
              if (a.key < b.key) return -1;
              if (a.key > b.key) return 1;
              return 0;
            });
          reader.on('end', () => {
            writer.end(null, null, () => {
              this.csvKeys = sortedKeyIndices.map(({key}) => key);
              res(
                this._writeCSVHeader(
                  this.constructor.csvSortedHeaderPath(this.surveyId)
                )
              );
            });
          });

          reader.on('readable', () => {
            let data = null;
            while (data = reader.read()) {
              const out = sortedKeyIndices.map(({key, index}) => data[index]);
              writer.write(out);
            }
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
    console.log(`Starting to process answer ${answer._id}`);
    if (answer.version == 0) {
      console.log(`Skipping because version 0`);
      return;
    }
    if (!this.surveyRespondents || !this.surveyRespondents.length) {
      const obj = answer.rootQuestion.collect({keys: this.csvKeys});
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
        ans, idx,
        acc: Object.assign({}, acc),
        keys: this.csvKeys,
        ansKey: prefix,
      });
      this._writeCSVObj(obj);
    });
  }

  static csvPath(surveyId) {
    return `data/survey-response/${surveyId}.csv`;
  }
  static csvSortedPath(surveyId) {
    return `data/survey-response/${surveyId}-sorted.csv`;
  }
  static csvHeaderPath(surveyId) {
    return `data/survey-response/${surveyId}-header.csv`;
  }
  static csvSortedHeaderPath(surveyId) {
    return `data/survey-response/${surveyId}-sorted-header.csv`;
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

  _writeCSVHeader(path) {
    if (!this.csvKeys || !this.csvKeys.length) return;
    const filePath = path || this.constructor.csvHeaderPath(this.surveyId);
    return new Promise((res, rej) => {
      const csvWriter = this._createCsvWriter(filePath, 'w', rej);
      csvWriter.on('error', rej);
      csvWriter.write(this.csvKeys);
      csvWriter.write(this.csvKeys.map((k) => this.csvKeys[`pos${k}`]));
      csvWriter.end(null, null, res);
    });
  }

  _createCsvReader(path, errH) {
    const fileStream = fs.createReadStream(path, {encoding: 'utf8'});
    if (errH) fileStream.on('error', errH);
    const csvReader = new CSVParser({relax_column_count: true});
    fileStream.pipe(csvReader);
    return csvReader;
  }

  _createCsvWriter(path, mode, errH) {
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
