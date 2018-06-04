import CSVParser from './csv-parser';
import User from '../../models/User';
import Location from '../../models/Location';
import Survey from '../../models/Survey';

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

    this.on('csvRecord', this._parseSurveyor.bind(this));
    this.on('finish', this._onFinish.bind(this));
    this.on('error', this._onError.bind(this));

    this.promise = new Promise((res, rej) => {
      this._res = res;
      this._rej = rej;
    });
    this.promises = [];
    this.initialPromise = Promise.resolve({});
  }

  _onError(err) {
    this._rej(err);
  }

  _parseColumn(arr) {
    this.location = ['DISTRICT', 'BLOCK', 'PANCHAYAT'];
    if (this.opts.deleteExisting) {
      this.initialPromise = User.deleteMany({roles: 'SURVEYOR'});
    }
    return arr;
  }

  _parseSurveyor(row) {
    const panchayatUid = this.location.reduce(
      (acc, loc) => acc + '/' + row[loc + '_CODE'],
      '',
    ).slice(1);
    this.promises.push(
      this.initialPromise.then(() =>
        Location.findOne({type: 'PANCHAYAT', uid: panchayatUid})
        .then(
          (loc) => loc || Promise.reject({
            message: 'Panchayat ' + panchayatUid + ' not found.',
          })
        ).then((loc) => {
          const userPayload = Object.assign(loc.payload || {}, row, {
            'HABITATION_NAME': loc.children.map((c) => c.name),
          });
          const surveyName = row['SURVEY'];
          return Survey.findOne({
            enabled: true, name: surveyName,
          }).then((survey) => {
            userPayload.surveyId = survey._id;
            return User.findOneAndUpdate(
              {username: row['SURVEYOR_CODE']},
              {
                name: row.SURVEYOR_NAME,
                roles: ['SURVEYOR'],
                payload: userPayload,
              },
              {new: true, upsert: true}
            );
          });
        })
      ),
    );
  }

  _onFinish() {
    this._res(Promise.all(this.promises));
  }
}

