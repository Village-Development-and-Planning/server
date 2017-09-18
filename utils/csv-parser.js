const EventEmitter = require('events');
const csv = require('csv')
const { PassThrough, Writable } = require('stream');

/**
 * Wrapper class around csv.parse with our default options.
 */

class CSVParser extends Writable {
  constructor(opts) {
    super();    
    opts = Object.assign({ columns: true, delimiter: ',' }, opts);
    this.csvParser = csv.parse(opts);
    this.csvParser.on('readable', this._onReadable.bind(this));
    this.csvParser.on('finish', this._onFinish.bind(this));
  }

  parse(stream) {
    stream.on('data', data => this.csvParser.write(data));
    stream.on('end', () => {
      this.csvParser.end();
    });
  }

  _onError(err) {
    throw err;
  }

  _onFinish() {
    this.emit('finish');
  }

  _onReadable() {
    var record = null;
    while (record = this.csvParser.read()) {
      this.emit('csvRecord', record);
    }
  }
}
module.exports = CSVParser;