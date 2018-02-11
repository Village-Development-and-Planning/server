import CSVParser from './csv-parser';
import Location from '../../models/Location';

/**
 * Abstraction for csv-parse with our default options.
 *
 * @class CSVParser
 * @extends {Parser}
 */
export default class extends CSVParser {
  /**
   * Creates an instance of CSVParser.
   * @param {any} opts (passed to csv-parse)
   *
   * @memberOf CSVParser
   */
  constructor(opts) {
    super(Object.assign({
      columns: (r) => this._parseColumn(r),
      delimiter: ',',
    }, opts && opts.csv));
    this.opts = opts || {};
    this.on('csvRecord', this._parseLocation.bind(this));
    this.on('finish', this._createLocations.bind(this));
    this.on('error', this._onError.bind(this));

    this.promise = new Promise((res, rej) => {
      this._res = res;
      this._rej = rej;
    });
    this.initialPromise = Promise.resolve({});
  }

  _onError(err) {
    this._rej(err);
  }

  _parseColumn(arr) {
    this.types = [];
    this.locations = [];
    arr.forEach((element) => {
      if (element.endsWith('_CODE')) {
        this.types.push(element.slice(0, -5));
        this.locations.push({});
      }
    });
    if (this.opts.deleteExisting) {
      this.initialPromise = Location.deleteMany({type: {$in: this.types}});
    }
    return arr;
  }

  _parseLocation(row) {
    this.types.forEach((loc, idx) => {
      const codeKey = loc + '_CODE';
      const trueCodeKey = loc + '_TRUECODE';

      if (idx == 0) {
        row[trueCodeKey] = row[codeKey];
      } else {
        const lastLocKey = this.types[idx - 1] + '_TRUECODE';
        row[trueCodeKey] = row[lastLocKey] + '/' + row[codeKey];
      }
    });

    const payload = {};
    this.types.forEach((loc, idx) => {
      const codeKey = loc + '_CODE';
      const nameKey = loc + '_NAME';
      const trueCodeKey = loc + '_TRUECODE';

      payload[codeKey] = row[codeKey];
      payload[nameKey] = row[nameKey];

      this.locations[idx][row[trueCodeKey]]
      = this.locations[idx][row[trueCodeKey]]
      || {
        type: loc,
        name: row[nameKey],
        code: row[codeKey],
        uid: row[trueCodeKey],
        children: [],
        payload: Object.assign({}, payload),
      };
    });
    this.types.forEach((loc, idx) => {
      const trueCodeKey = loc + '_TRUECODE';
      const jidx = idx + 1;
      const locObj = this.locations[idx][row[trueCodeKey]];
      if (jidx < this.types.length) {
        const jloc = this.types[jidx];
        const jTrueCodeKey = jloc + '_TRUECODE';
        const jlocObj = this.locations[jidx][row[jTrueCodeKey]];
        this._addChild(locObj, jlocObj);
      }
    });
  }

  _addChild(parent, child) {
    let exists = false;
    parent.children.forEach((c) => {
      if (child.code == c.code) {
        exists = true;
      }
    });
    if (!exists) {
      const {name, code, uid} = child;
      parent.children.push({name, code, uid});
    }
  }

  _createLocations() {
    this._res(
      this.initialPromise.then(
        () => Promise.all(
          this.locations.reduce(
            (acc, locs, idx) => {
              return acc.concat(
                Object.keys(locs)
                .map((k) => locs[k])
                .map(
                  (loc) => Location
                  .create(loc)
                )
              );
            },
            [],
          )
        )
      )
    );
  }
}

