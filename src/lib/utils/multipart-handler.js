import Busboy from 'busboy';

/**
* Our multi-part form handler.
*/
class MPHandler extends Busboy {
  constructor(request, fileHandler) {
    super({headers: request.headers});

    this.childPromises = [];
    this.fileHandler = fileHandler || this.fileHandler;
    this.promise = new Promise((resolve, reject) => {
      this.data = {};
      this.on('file', this._fileHandler.bind(this));
      this.on('field', (field, val) => {
        if (field.endsWith('[]')) {
          field = field.slice(0, -2);
          this.data[field] = this.data[field] || [];
          console.log(field, this.data[field]);
          this.data[field].push(val);
        } else {
          this.data[field] = val;
        }
      });
      this.on('finish', () => {
        resolve(
          Promise.all(
            this.childPromises
          ).then(() => {
            return this.data;
          }),
        );
      });
    });
    request.pipe(this);
  }

  _fileHandler(field, file, fname, encoding, mime) {
    const filePromise = this.fileHandler(
      {field, file, fname, encoding, mime, fields: this.data}
    );
    if (filePromise && filePromise.then) {
      this.childPromises.push(
        filePromise.then((fileData) => {
          this.data[field] = fileData;
        }).catch((err) => {
          file.resume();
          this.data[field] = {error: err};
          return Promise.reject(err);
        })
      );
    } else {
      file.resume();
    }
  }
}

export default MPHandler;
