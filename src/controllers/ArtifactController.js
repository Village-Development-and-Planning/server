const Artifact = require('../models/Artifact');
import EntityController from './EntitiyController';

import streamToArray from 'stream-to-array';
import fileType from 'file-type';

/**
 * Artifact document controller.
 *
 * @class ArtifactController
 * @extends {BaseController}
 */
class ArtifactController extends EntityController {
  _parseEntity(obj) {
    if (obj.data && !obj.mimeType) {
      const fType = fileType(obj.data);
      if (fType) obj.mimeType = fType.mime;
    }

    let filter = ['name', 'description', 'type', 'mimeType', 'data'];
    if (this.action === 'create') {
      filter = filter.concat('_id');
    }
    return this._filterObject(obj, filter);
  }

  _parseFileField({mime, field, file, fields}) {
    if (field === 'data') {
      return streamToArray(file).then((arr) => Buffer.concat(arr));
    }
    return null;
  }

  _findOne(query) {
    return super._findOne(query).then((a) => {
      if (a) {
        const b = this._findFields.split(' ').reduce(
          (acc, key) => {
            acc[key] = a[key];
            return acc;
          },
          {},
        );
        b.dataBase64 = a.data.toString('base64');
        delete b.data;
        return b;
      }
    });
  }
}

Object.assign(ArtifactController, {
  collection: Artifact,
  entityName: 'Artifact',
  routeName: 'artifacts',

  _findFields: '_id name description type mimeType modifiedAt',
  _createFields: '_id name description type mimeType modifiedAt',
});
module.exports = ArtifactController;
