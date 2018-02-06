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
  _find(query) {
    return super._find(query)
      .select('name description type mimeType modifiedAt');
  }

  _create(...args) {
    return super._create(...args)
    .then(
      (o) => this._filterObject(
        o, 
        ['_id', 'name', 'description', 'modifiedAt', 'type', 'mimeType'],
      )
    );
  }

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
}

Object.assign(ArtifactController, {
  collection: Artifact,
  entityName: 'Artifact',
  routeName: 'artifacts',
});
module.exports = ArtifactController;
