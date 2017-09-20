const CSVParser = require('./csv-parser');

/** 
 * A stack-based parser to parse hierarchical CSVs.
 */
class TreeParser extends CSVParser {
  constructor(opts) {
    super(opts);
    this.sectionField = opts.sectionField || "Q.No";
    this.subField = opts.subField || "Opt.No";
    this.subTextFields = opts.subTextFields || ["Opt.Text.English", "Opt.Text.Tamil"];
    this.compatibilityMode  = true;

    this.on('csvRecord', this._parseRecord.bind(this));
    this.parentStack = [];
  }

  _parseRecord(record) {

    // 1. Ignore record unless it has valid sectionField or subField
    var recSection = record[this.sectionField]
    var recSub = record[this.subField]
    if (recSection == '' && recSub == '')
      return;

    // 2. Pop from stack until we find parent of the current record.
    var len = 0;
    while (!this._lastIsParent(record)) {
      this._popStack();
    }

    // 3. Push the current record into the stack.
    this.parentStack.push(record);

    // 4. Finally, for compatibility emulate records for options stored in the
    // same cell as the question itself.
    var recSubText = record[this.subTextFields[0]];
    if (recSubText != '' && recSection != '') {
      this._doCompatibilityParsing(record);
    }
  }

  _doCompatibilityParsing(record) {
    var recSection = record[this.sectionField]
    var recSub = record[this.subField]

    var recSubTexts = this.subTextFields.reduce((acc, f) => {
      return record[f].split(/([0-9]+\.)/).reduce((acc, e, i, arr) => {
        var m = null, pos = null;
        if (
          (m = e.match(/([0-9]+)\./)) && 
          (m.index == 0) &&
          (pos = m[1]) &&
          (i < arr.length - 1)
        ) {
          acc[pos] = acc[pos] || {};
          acc[pos][f] = arr[i+1].trim()
        }
        return acc;
      }, acc)
    }, {})
    for (var k in recSubTexts) {
      var dupRecord = Object.create(record);
      dupRecord[this.sectionField] = '';
      dupRecord[this.subField] = k;
      for (var kk in recSubTexts[k]) {
        dupRecord[kk] = recSubTexts[k][kk];
      }
      this._parseRecord(dupRecord);
    }
  }

  _onFinish() {
    while (!this._lastIsParent(null)) {
      this._popStack();
    }
    super._onFinish();
  }

  _lastIsParent(record) {
    var len = this.parentStack.length;
    // An empty stack is always the parent of any record.
    if (len == 0) return true;
    if (!record) return false;

    var parentRecord = this.parentStack[len-1];
    var recordSection = record[this.sectionField];
    var parentSection = parentRecord[this.sectionField];
    if (
        parentSection != '' &&
        (
          recordSection.startsWith(parentSection + ".") ||
          (
            recordSection == '' &&
            recordSection[this.subField] != ''
          )
        )
    ) {
      return true;
    }    
    return false;
  }

  _popStack() {
    var record = this.parentStack.pop();
    var parent = null;
    var len = this.parentStack.length;
    if (len != 0)
      parent = this.parentStack[len - 1];
    this.emit('nodeCompleted', {node: record, parent: parent});
    var node = record;
  }
}
module.exports = TreeParser;
