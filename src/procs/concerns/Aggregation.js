import 'babel-polyfill';
import Mixin from '../../lib/Mixin';
import {Parser as FormulaParser} from 'hot-formula-parser';
import co from 'co';
import Statistic from '../../models/Statistic';
import YAML from 'js-yaml';

/**
 * Handles Survey concerns
 */
export default class extends Mixin {
  _parseExpression(parser, exp) {
    const parsed = parser.parse(exp);
    if (parsed.error) {
      return;
    }
    return parsed.result;
  }

  _findAggregate({type, key}) {
    let objKey = `${type}/${key}`;
    let agg;
    if (agg = this.aggregates[objKey]) {
      return Promise.resolve(agg);
    }
    return this.aggregates[objKey] = Statistic.findOne({type, key})
    .catch((err) => null)
    .then((stat) => stat ? stat.toObject({versionKey: false}) : {type, key})
    .then((stat) => this.aggregates[objKey] = stat)
    .then((stat) => {
      if (stat.aggregates) {
        return Promise.resolve(
          this.accumulateAggregates(stat, stat.aggregates, true)
        ).then(() => stat);
      }
      return stat;
    });
  }

  _saveAllAggregates() {
    const self = this;
    if (!self.aggregates) return;
    return co(function* () {
      let key, agg;
      while (key = Object.keys(self.aggregates).find(
        (key) => self.aggregates[key]._modified)
      ) {
        agg = self.aggregates[key];
        yield Promise.resolve(
          self.accumulateAggregates(agg, agg.aggregates)
        );
        agg._modified = false;
      }
    })
    .then(() => Promise.all(
      Object.keys(this.aggregates)
      .map((key) => {
        const agg = this.aggregates[key];
        return Statistic.findOneAndUpdate(
          {type: agg.type, key: agg.key},
          agg,
          {upsert: true, new: true}
        ).then(
          (stat) => console.log(
            `Stat: ${stat.key} (${stat.type})`
          ) || console.log(
            YAML.safeDump(stat.data)
          )
        );
      })
    ))
    .catch((err) => console.error('Error saving aggreagtes', err));
  }

  accumulateAggregates(stat, aggregates, revert=false) {
    if (!aggregates || !aggregates.length) return;
    if (!stat.data) return;
    const parser = new FormulaParser();
    const parseF = (...a) => this._parseExpression(parser, ...a);
    parser.on('callVariable', (name, done) => {
      // Check in metadata
      let obj = stat.metadata;
      if (obj && obj.hasOwnProperty(name)) {
        const val = obj[name];
        if (val !== undefined) {
          done(val);
          return;
        }
      }

      // Check in data
      obj = stat.data;
      let type;
      if (name.endsWith('__value')) {
        name = name.slice(0, -7);
        type = 'value';
      } else if (name.endsWith('__count')) {
        name = name.slice(0, -7);
        type = 'count';
      }
      type = type || 'average';
      if (obj && obj.hasOwnProperty(name)) {
        const val = obj[name];

        if (val) {
          if (val.count) {
            if (type === 'average') {
              done(val.value / val.count);
            } else if (type === 'count') {
              done(val.count);
            } else {
              done(val.value);
            }
          } else {
            done(val);
          }
          return;
        }
      }
    });
    parser.on('callFunction', (name, params, done) => {
      if (name === 'TO_DATE') {
        done(new Date(parseInt(params[0])));
      }
    });

    const promises = [];
    for (let agg of aggregates) {
      let type, key, name;
      if (agg.select) {
        if (!parseF(agg.select)) continue;
      }
      if (agg.key) {
        key = parseF(agg.key);
      }
      if (!key) {
        console.error(`Error parsing key: ${agg.key}`);
        continue;
      };
      key = key || null;

      if (agg.type) {
        type = parseF(agg.type);
      }
      type = type || 'Aggregate';
      if (!revert) {
        if (agg.name) {
          name = parseF(agg.name);
        }
        name = name || this.survey.name || 'Unnamed';
        promises.push(
          this._findAggregate({type, key})
          .then((stat) => {
            this._evaluateMetadata(agg, stat, parseF);
            this._evaluateAggregate(agg, stat, parseF);
            if (agg.aggregates && !stat.aggregates) {
              stat.aggregates = agg.aggregates;
            }
          })
        );
      } else {
        promises.push(
          this._findAggregate({type, key})
          .then((stat) => {
            if (stat && stat.data) {
              this._evaluateAggregate(agg, stat, parseF, revert);
            }
          })
        );
      }
    }
    return Promise.all(promises).then((p) => p.length);
  }

  * _iterateObj(obj, parseF) {
    for (let key of Object.keys(obj)) {
      let valObj = obj[key];
      let valType = typeof valObj;
      if (valType === 'undefined') continue;
      let formula, type;
      if (valType === 'string') {
        formula = valObj;
      } else if (valType === 'object' && valObj) {
        formula = valObj.formula;
        type = valObj.type;
      }
      let value, count;
      formula = formula || key;
      type = type || 'count';
      if (type === 'value') {
        count = parseF(formula + '__count');
        if (count) formula = formula + '__value';
        type = 'count';
      }
      value = parseF(formula);
      if (value !== null && value !== undefined) {
        yield {key, value, type, count};
      }
    }
  }

  _accumulateObj(data, {key, value, type, count}) {
    const obj = data[key] = data[key] || {};
    count = count || 1;

    obj.count = obj.count || 0;
    obj.count += count;
    if (type === 'count') {
      obj.value = obj.value || 0;

      if (typeof value !== 'number') value = parseFloat(value);
      if (value === NaN) value = 0;
      obj.value = obj.value + value;
    } else if (type === 'histogram') {
      obj.value = obj.value || {};

      obj.value[value] = obj.value[value] || 0;
      obj.value[value]++;
    }
  }

  _decumulateObj(data, {key, value, type, count}) {
    const obj = data[key];
    if (!obj || !obj.count || !obj.value) return;
    count = count || 1;
    obj.count -= count;

    if (type === 'count') {
      value = parseInt(value);
      if (value === NaN) value = 0;
      obj.value = obj.value - value;
    } else if (type === 'histogram') {
      obj.value = obj.value || {};

      if (!obj.value[value]) return;
      obj.value[value]--;
    }
  }

  _evaluateAggregate(agg, stat, parseF, revert) {
    if (!typeof agg.data === 'object') return;
    stat.data = stat.data || {};
    stat._modified = true;
    for (let o of this._iterateObj(agg.data, parseF)) {
      if (!revert) {
        this._accumulateObj(stat.data, o);
      } else {
        this._decumulateObj(stat.data, o);
      }
    }
  }

  _evaluateMetadata(agg, stat, parseF) {
    if (stat.metadata || !agg.metadata) return;
    if (typeof agg.metadata !== 'object') return;
    stat.metadata = stat.metadata || {};
    for (let {key, value} of this._iterateObj(agg.metadata, parseF)) {
      stat.metadata[key] = value;
    }
  }
}
