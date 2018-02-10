import CSVParser from './csv-parser';
import User from '../../models/User';
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
    opts = Object.assign({
      columns: (r) => this._parseColumn(r),
      delimiter: ',',
    }, opts);
    super(opts);
    this.on('csvRecord', this._parseSurveyor.bind(this));
    this.on('finish', this._onFinish.bind(this));
    this.on('error', this._onError.bind(this));

    this.promise = new Promise((res, rej) => {
      this._res = res;
      this._rej = rej;
    });
    this.promises = [];
  }

  _onError(err) {
    this._rej(err);
  }

  _parseColumn(arr) {
    this.user = 'SURVEYOR';
    this.location = ['DISTRICT', 'BLOCK', 'PANCHAYAT'];
    return arr;
  }

  _parseSurveyor(row) {
    const panchayatUid = this.location.reduce(
      (acc, loc) => acc + '/' + row[loc + '_CODE'],
      '',
    ).slice(1);
    this.promises.push(
      Location.findOne({type: 'PANCHAYAT', uid: panchayatUid})
      .then(
        (loc) => loc || Promise.reject({
          message: 'Panchayat ' + panchayatUid + ' not found.',
        })
      ).then((loc) => {
        const userPayload = Object.assign(loc.payload || {}, row, {
          'HABITATION_NAME': loc.children.map((c) => c.name),
        });
        return User.create({
          username: row[this.user + '_CODE'],
          name: row.SURVEYOR_NAME,
          roles: ['SURVEYOR'],
          payload: userPayload,
        });
      })
    );
  }

  _onFinish() {
    this._res(Promise.all(this.promises));
  }
}

