import fs from 'fs';
import CSVWriter from 'csv-stringify';


import Survey from '../data/models/Survey';
import Answer from '../data/models/Answer';
/**
 * Batch post-processor for Survey responses
 */
export default class SurveyResponseProcessor {
  constructor(surveyId) {
    this.surveyId = surveyId;
    this.survey = Survey.findOne({_id: surveyId});
  }

  processAnswers() {
    return new Promise((res, rej) => {
      let count = 0;
      const cursor = Answer.find({
        lastExport: null,
      }).cursor();

      const keys = this._readCSVHeader() || [];
      const csvWriter = this._csvWriter();

      cursor.on(
        'data',
        (answer) => {
          if (answer && answer.rootQuestion) {
            const obj = answer.rootQuestion.collect(undefined, keys);
            csvWriter.write(
              keys.map((k) => obj[k])
            );
            answer.lastExport = Date.now();
            answer.save();
            console.log(`Processed ${answer._id}`);
            ++count;
          }
        }
      );

      cursor.on('error', (err) => rej(err));

      cursor.on('end', () => {
        csvWriter.end();
        this._writeCSVHeader(keys);
        console.log(`Processed ${count} responses`);
        res(count);
      });
    });
  }

  static csvPath(surveyId) {
    return `data/survey-response/${surveyId}.csv`;
  }
  static csvHeaderPath(surveyId) {
    return `data/survey-response/${surveyId}-header.csv`;
  }

  _readCSVHeader() {
    const filePath = this.constructor.csvHeaderPath(this.surveyId);
    try {
      const keys = fs.readFileSync(filePath, 'utf8').trim().split(',');
      keys.forEach((e) => keys[`pos${e}`] = true);
      return keys;
    } catch (e) {
      return null;
    }
  }

  _writeCSVHeader(keys) {
    const filePath = this.constructor.csvHeaderPath(this.surveyId);
    const csvWriter = this._csvWriter(filePath);
    csvWriter.write(keys);
    csvWriter.end();
  }

  _csvWriter(path, mode) {
    if (!path) {
      path = this.constructor.csvPath(this.surveyId);
      mode = 'a';
    }
    if (!mode) mode = 'w';
    const fileStream = fs.createWriteStream(
      path,
      {encoding: 'utf8', flags: mode},
    );
    const csvWriter = new CSVWriter();
    csvWriter.pipe(fileStream);
    csvWriter.on('end', () => fileStream.end());
    return csvWriter;
  }
}
