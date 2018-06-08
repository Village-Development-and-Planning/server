const Artifact = require('../models/Artifact');
import EntityController from './EntitiyController';

import streamToArray from 'stream-to-array';
import fileType from 'file-type';
import path from 'path';

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
      if (fType) {
        obj.mimeType = fType.mime;
      } else if (obj.extension === '.csv') {
        obj.mimeType = 'text/csv';
      }
    }

    let filter = 'name description type mimeType data extension'.split(' ');
    return this._filterObject(obj, filter);
  }

  _parseFileField({mime, field, fname, file, fields}) {
    if (field === 'data') {
      if (fname) {
        fields.extension = path.extname(fname);
        fields.name = path.basename(fname, fields.extension);
      }
      return streamToArray(file).then((arr) => Buffer.concat(arr));
    }
    return null;
  }

  _findOne(query) {
    return super._findOne(query).then((a) => {
      delete a.data;
      return a;
    });
  }

  _indexQuery() {
    const query = super._indexQuery();
    const {type} = this.req.query;
    if (type) query.type = type;
    return query;
  }

  download(query) {
    query = query || this._getQuery();
    this.renderer.renderPromise(
      Promise.resolve(
        query && super._findOne(query)
      )
      .then((e) => e || Promise.reject(new Error('Entity not found.')))
      .then((e) => {
        const res = this.renderer.res;
        res.contentType(e.mimeType);
        res.attachment(`${e.name}${e.extension || ''}`);
        res.send(e.data);
        res.end();
      })
      .catch((e) => Promise.reject(Object.assign(e, {status: 404})))
    );
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
