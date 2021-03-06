const CSVParser = require('./csv-parser');

/** 
 * A stack-based parser to parse hierarchical CSVs.
 *
 * Uses options:
 *
 * {
 *   csv: CSVParser opts,
 *   tree: {
 *     sectionField:  col for sec. numbering (1, 1.2, 1.2.4, etc.)
 *   }
 * }
 */
class TreeParser extends CSVParser {
  constructor(opts) {
    opts.csv = Object.assign(
      opts.csv || {}, {columns: (r) => this._parseColumn(r)}
    );
    super(opts.csv);

    opts = opts.tree;
    this.sectionField = opts.sectionField || 'Section';
    this.subTextField = opts.subTextField || 'Opt.Text';
    this.subField = opts.subField || 'Opt.No';

    this.on('csvRecord', this._parseRecord.bind(this));
    this.on('finish', this._onFinish.bind(this));

    this.parentStack = [];
  }

  _parseColumn(row) {
    if (row.indexOf(this.sectionField) == -1) {
      throw new Error(
        `Section field: ${this.sectionField} not found in header.`
      );
    }
    this.subTextFields = row.reduce(
      (acc, e) => {
        if (e.startsWith(this.subTextField + '.')) {
          acc.push(e);
        }
        return acc;
      }, []
    );
    return row;
  }

  _parseRecord(record) {
    // 1. Pop from stack until we find parent of the current record.
    while (!this._lastIsParent(record)) {
      this._popStack();
    }

    // 2. Push the current record into the stack.
    this.parentStack.push(record);
    this.emit('nodePushed', this.parentStack);

    // 3. Finally, for compatibility emulate records for options stored in the
    // same cell as the question itself.
    let recSection = record[this.sectionField];
    let recSubText = record[this.subTextFields[0]];
    if (recSubText != '' && recSection != '') {
      this._doCompatibilityParsing(record);
    }
  }

  _doCompatibilityParsing(record) {
    let recSubTexts = this.subTextFields.reduce((acc, f) => {
      return record[f].split(/([0-9]+\.)/).reduce((acc, e, i, arr) => {
        let m = null;
        let pos = null;
        if (
          (m = e.match(/([0-9]+)\./)) &&
          (m.index == 0) &&
          (pos = m[1]) &&
          (i < arr.length - 1)
        ) {
          acc[pos] = acc[pos] || {};
          acc[pos][f] = arr[i+1].trim();
        }
        return acc;
      }, acc);
    }, {});

    for (let k in recSubTexts) {
      let dupRecord = Object.create(record);
      dupRecord[this.sectionField] = '';
      dupRecord[this.subField] = k;
      for (let kk in recSubTexts[k]) {
        dupRecord[kk] = recSubTexts[k][kk];
      }
      this._parseRecord(dupRecord);
    }
  }

  _onFinish() {
    while (!this._lastIsParent(null)) {
      this._popStack();
    }
  }

  _lastIsParent(record) {
    let len = this.parentStack.length;

    // An empty stack is always the parent of any record.
    if (len == 0) return true;

    // No record implies end of doc, so we pop out everything.
    if (!record) return false;

    let parentRecord = this.parentStack[len-1];
    let recordSection = record[this.sectionField] || '';
    let parentSection = parentRecord[this.sectionField] || '';

    if (
      parentSection != '' &&
      (
        recordSection.startsWith(parentSection + '.') ||
        recordSection == ''
      )) {
      return true;
    }
    return false;
  }

  _popStack() {
    let record = this.parentStack.pop();
    let parent = null;
    let len = this.parentStack.length;

    if (len != 0) {
      parent = this.parentStack[len - 1];
    }

    this.emit(
      'nodeCompleted',
      {node: record, parent: parent, stack: this.parentStack},
    );
  }
}

module.exports = TreeParser;
