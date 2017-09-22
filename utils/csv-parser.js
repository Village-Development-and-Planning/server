const EventEmitter = require('events');
const csv = require('csv')
const { PassThrough, Writable } = require('stream');
const { Parser } = require('csv-parse');

/**
 * Wrapper class around csv-parse's Parser with our default options.
 */

class CSVParser extends Parser {
  constructor(opts) {
    opts = Object.assign({ 
      columns: true,
      delimiter: ',' }, opts);
    super(opts);
    this.on('readable', this._onReadable.bind(this));
  }  


  _onReadable() {
    var record = null;
    while (record = this.read()) {
      this.emit('csvRecord', record);
    }
  }
}
module.exports = CSVParser;