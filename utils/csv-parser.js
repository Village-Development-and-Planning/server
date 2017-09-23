const {Parser} = require('csv-parse');

/**
 * Abstraction for csv-parse with our default options.
 * 
 * @class CSVParser
 * @extends {Parser}
 */
class CSVParser extends Parser {
  /**
   * Creates an instance of CSVParser.
   * @param {any} opts (passed to csv-parse)
   * 
   * @memberOf CSVParser
   */
  constructor(opts) {
    opts = Object.assign({
      columns: true,
      delimiter: ','}, opts);
    super(opts);
    this.on('readable', this._onReadable.bind(this));
  }


  /**
   * 'readable' event listener 
   * 
   * 
   * @memberOf CSVParser
   * @private
   */
  _onReadable() {
    let record = null;
    while (record = this.read()) {
      this.emit('csvRecord', record);
    }
  }
}
module.exports = CSVParser;
