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
      if (fType) obj.mimeType = fType.mime;
    }

    let filter = 'name description type mimeType data extension'.split(' ');
    if (this.action === 'create') {
      filter = filter.concat('_id');
    }
    return this._filterObject(obj, filter);
  }

  _parseFileField({mime, field, fname, file, fields}) {
    if (field === 'data') {
      if (fname) fields.extension = path.extname(fname);
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
