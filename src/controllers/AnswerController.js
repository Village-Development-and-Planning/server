import Answer from '../models/Answer';
import EntityController from './EntitiyController';
import CSVWriter from 'csv-write-stream';
import streamToString from 'stream-to-string';
/**
 * Question document controller
 * 
 * @class QuestionController
 * @extends {BaseController}
 */
class AnswerController extends EntityController {
  _find(query) {
    return super._find(query)
      .select('name description surveyor survey modifiedAt');
  }

  _create(...args) {
    return super._create(...args)
      .then(
        (obj) => this._filterObject(
          obj,
          [
            '_id', 'name', 'description', 'version',
            'surveyor', 'survey',
            'modifiedAt',
          ]
        )
      );
  }
  _parseDataFile(json, fields) {
    if (!json) return;
    fields.version = fields.version || json.version || 0;
    if (fields.version == 0) {
      if (json.id) fields.survey = json.id;
      if (json.questions && json.questions[0]) {
        fields.rootQuestion = json.questions[0];
      }
    } else {
      fields.rootQuestion = json.question;
      fields.survey = json._id;
    }
    return;
  }

  _parseFileField({mime, field, file, fields}) {
    if (field === 'dataFile') {
      return streamToString(file)
        .then((jsonStr) => JSON.parse(jsonStr))
        .then(
          (json) =>
            this._parseDataFile ?
              this._parseDataFile(json, fields) :
              Promise.reject({
                message: `Unknown data format: ${field}`,
                status: 400,
              })
        );
    } else {
      return null;
    }
  }

  _parseEntity(obj) {
    return this._filterObject(obj,
      ['name', 'description', 'rootQuestion', 'surveyor', 'survey', 'version']
    );
  }

  download() {
    const query = this._getQuery();
    Promise.resolve(
      query && this._findOne(query)
    )
    .then((e) => e || Promise.reject(new Error('Entity not found.')))
    .catch((err) => this.renderer.renderPromise(Promise.reject(err)))
    .then((answer) => {
      const res = this.renderer.res;
      res.attachment(`${answer._id}.csv`);

      const csvWriter = new CSVWriter();
      csvWriter.pipe(res);

      csvWriter.on('end', () => res.end());
      csvWriter.write(answer.rootQuestion.collect({}));
      csvWriter.end();
    })
    .catch((err) => {
    });
  }
}
Object.assign(AnswerController, {
  collection: Answer,
  routeName: 'answers',
});
module.exports = AnswerController;
export default AnswerController;
