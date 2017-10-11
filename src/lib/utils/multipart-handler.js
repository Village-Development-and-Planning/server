import Busboy from 'busboy';

/**
* Our multi-part form handler.
*/
class MPHandler extends Busboy {
  constructor(request, response, fileHandler) {
    super({headers: request.headers});

    this.fileHandler = fileHandler || this.fileHandler;
    this.promise = new Promise((resolve, reject) => {
      this.data = {};
      this.on('file', this._fileHandler.bind(this));
      this.on('field', (field, val) => {
        this.data[field] = val;
      });
      this.on('finish', () => {
        resolve(this.data);
        response.json(this.data);
      });
    });
    request.pipe(this);
  }

  _fileHandler(field, file, fname, encoding, mime) {
    const filePromise = this.fileHandler(
      field, file, fname, encoding, mime, this.data
    );
    if (filePromise && filePromise.then) {
      filePromise.then((fileData) => {
        this.data[field] = fileData;
      }).catch((err) => {
        file.resume();
        (console.log(err));
        this.data[field] = {error: err};
      });
    } else {
      file.resume();
    }
  }
}

export default MPHandler;
