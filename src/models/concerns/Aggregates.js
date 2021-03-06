import Mixin from '../../lib/Mixin';
import {Parser as FormulaParser} from 'hot-formula-parser';

export default class extends Mixin {
  initialize({stat, aggregate}) {
    if (!aggregate.metadata) return;
    const parser = stat.parser();
    const metadata = this.metadata || {};

    for (let key of Object.keys(aggregate.metadata)) {
      const formula = aggregate.metadata[key] || key;
      const val = parser.value(formula);
      if (val === null || val === undefined) continue;

      metadata[key] = val;
    }
    this.metadata = metadata;
    this.markModified('metadata');
  }

  accumulate({stat, aggregate, invert}) {
    if (!aggregate.data) return;

    const parser = stat.parser();
    const data = this.data || {};

    if (aggregate.select && !parser.value(aggregate.select)) return;

    for (let key of Object.keys(aggregate.data)) {
      let formula, type, select;
      formula = aggregate.data[key];
      if (formula && typeof formula === 'object') {
        type = formula.type;
        select = formula.select;
        formula = formula.formula;
      }
      if (!formula) formula = key;
      if (select && !parser.value(select)) continue;
      if (!type) type = 'count';

      const val = parser.value(formula);
      if (val === null || val === undefined) continue;
      data[key] = this._accumulateRegister(data[key], {val, type, invert});
    }
    this.data = data;
    this.markModified('data');
  }

  _accumulateRegister(obj, {val, type, invert}) {
    obj = obj || {};
    obj.count = obj.count || 0;
    if (type === 'count') {
      obj.value = obj.value || 0;
      let count, value;
      if (typeof val === 'object') {
        count = val.count || 1;
        value = val.value || 0;
      } else {
        count = 1;
        value = parseFloat(val);
        if (value === NaN) value = 0;
      }
      if (invert) {
        obj.value = obj.value - value;
        obj.count = obj.count - count;
      } else {
        obj.value = obj.value + value;
        obj.count = obj.count + count;
      }
      if (obj.count <= 0) {
        obj.count = 0;
        obj.value = 0;
      }
    } else if (type === 'histogram') {
      obj.value = obj.value || {};
      let count, value;
      if (typeof val === 'object') {
        count = val.count || 0;
        value = val.value || {};
      } else {
        value = {[val]: 1};
        count = 1;
      }
      if (typeof value !== 'object') {
        value = {[value]: 1};
        count = 1;
      }
      if (!count) count = 1;
      for (let k of Object.keys(value)) {
        obj.value[k] = obj.value[k] || 0;
        if (invert) {
          obj.value[k] = obj.value[k] - value[k];
        } else {
          obj.value[k] = obj.value[k] + value[k];
        }
        if (obj.value[k] <= 0) delete obj.value[k];
      }
      if (invert) {
        obj.count = obj.count - count;
      } else {
        obj.count = obj.count + count;
      }
      if (obj.count <= 0) {
        obj.count = 0;
        obj.value = {};
      }
    }
    return obj;
  }

  * walkAggregates(ctx) {
    let {aggregates} = ctx;
    aggregates = aggregates || this.aggregates;
    if (!aggregates) return;
    if (!aggregates.length) return;

    const parser = this.parser();
    for (let agg of aggregates) {
      let type, key;
      if (agg.preSelect && !parser.value(agg.preSelect)) continue;
      if (!agg.key || !(key = parser.value(agg.key))) continue;
      if (agg.type) {
        type = parser.value(agg.type);
      }
      if (!type) type === 'Aggregate';
      yield {aggregate: agg, aggregateKey: {key, type}};
    }
  }

  parser() {
    if (this._parser) return this._parser;

    const parser = new FormulaParser();
    parser.on('callVariable', (name, done) => {
      const data = this.metadata;
      if (data && data.hasOwnProperty(name)) {
        return done(data[name]);
      }
    });
    parser.on('callVariable', (name, done) => {
      const data = this.data;
      if (!data) return;
      let suffix;
      if (name.endsWith('__value')) {
        name = name.slice(0, -7);
        suffix = 'value';
      } else if (name.endsWith('__count')) {
        name = name.slice(0, -7);
        suffix = 'count';
      }
      if (data && data.hasOwnProperty(name)) {
        const obj = data[name];
        if (!suffix || !obj || !(typeof obj === 'object')) return done(obj);
        return done(obj[suffix]);
      }
    });
    parser.on('callFunction', (name, params, done) => {
      if (name === 'TO_DATE') {
        done(new Date(parseInt(params[0])));
      }
    });
    parser.value = (exp) => parser.parse(exp).result;
    return this._parser = parser;
  }
}
