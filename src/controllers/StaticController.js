import BaseController from './BaseController';
import MPHandler from '../lib/utils/multipart-handler';

import path from 'path';
import fs from 'fs';
const constants = require('../config/Constants');

const pathPrefix = constants.staticPath;

/**
* Controller class for root access to DB
*
* @class StaticController
*/
export default class StaticController extends BaseController {
  _parseFileField({mime, field, file, fields, fname}) {
    fname = path.join(pathPrefix, fname);
    return new Promise((res, rej) => {
      const writer = fs.createWriteStream(fname);
      writer.on('finish', () => {
        res({done: true, fname});
      });
      writer.on('error', rej);
      file.on('end', () => writer.end());
      file.pipe(writer);
    });
  }

  upload() {
    this.renderer.renderPromise(this.push());
  }

  push() {
    if (this.req.is('multipart/form-data')) {
      return new MPHandler(
        this.req,
        this._parseFileField.bind(this),
      ).promise;
    } else {
      return Promise.reject(new Error('Unsupported upload type.'));
    }
  }
}
