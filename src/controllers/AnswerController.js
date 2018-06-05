import Answer from '../models/Answer';
import EntityController from './EntitiyController';

import streamToArray from 'stream-to-array';

import crypto from 'crypto';

/**
 * Question document controller
 *
 * @class QuestionController
 * @extends {BaseController}
 */
class AnswerController extends EntityController {
  _create(query) {
    return super._findOne({checksum: query.checksum})
    .then((ans) => {
      if (ans) {
        ans = ans.toObject();
        ans.existing = true;
        return this._filterObject(ans, this._createFields);
      } else {
        return super._create(query);
      }
    });
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

  _parseFileField({mime, field, file, fields, encoding}) {
    if (field === 'data-file' || field === 'dataFile' || field === 'data') {
      return streamToArray(file)
        .then((arr) => Buffer.concat(arr))
        .then((buff) => {
          fields.checksum = crypto.createHash('sha256')
          .update(buff)
          .digest('hex');
          return buff.toString();
        })
        .then((jsonStr) => JSON.parse(jsonStr))
        .then((json) => {
          return json;
        }).then(
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
    return this._filterObject(
      obj,
      'name description rootQuestion surveyor survey version checksum',
    );
  }
}

Object.assign(AnswerController, {
  collection: Answer,
  routeName: 'answers',

  _findFields: 'name description surveyor survey checksum modifiedAt',
  _createFields:
    '_id name description survey surveyor checksum modifiedAt existing',
});

module.exports = AnswerController;
export default AnswerController;
