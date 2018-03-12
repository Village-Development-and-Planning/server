import 'babel-polyfill';
import Mixin from '../../lib/Mixin';
import Statistic from '../../models/Statistic';
import co from 'co';
/**
 * Handles Survey concerns
 */
export default class extends Mixin {
  saveAggregates() {
    return co.call(this, function* () {
      let aKeys;
      while ((aKeys = Object.keys(this.aggregatesStore)).length) {
        const aKey = aKeys.find(
          (key) => {
            for (let dStat of this.aggregatesStore[key].dependencies) {
              if (dStat.isModified()) return false;
            }
            return true;
          }
        );
        if (!aKey) {
          console.error('Error: circular dependency!');
          return;
        }
        const agg = this.aggregatesStore[aKey];
        if (agg.aggregates) {
          yield Promise.resolve(
            this.accumulateAggregates({
              stat: agg,
              aggregates: agg.aggregates,
            })
          );
        }
        yield agg.save();
        delete this.aggregatesStore[aKey];
      }
    });
  }

  accumulateAggregates(context) {
    const {stat} = context;
    if (!stat.data && !stat.metadata) return;

    const promises = [];
    for (let ctx of stat.walkAggregates(context)) {
      Object.setPrototypeOf(ctx, context);
      promises.push(
        this.findAggregate(ctx).then(
          (tgStat) => tgStat.accumulate(ctx)
        )
      );
    }
    return Promise.all(promises).then(() => stat);
  }

  findAggregate(context) {
    if (!aggregateKey) throw new Error('Aggregate Key needed.');
    this.aggregatesStore = this.aggregatesStore || {};

    const {type, key} = context.aggregateKey;
    if (!type || !key) throw new Error('type, key needed in AggregateKey.');

    let cacheKey = `${type}//$$\\${key}`;
    if (this.aggregatesStore[cacheKey]) {
      let a = this.aggregatesStore[cacheKey];
      a.dependencies.push(stat);
      return Promise.resolve(this.aggregatesStore[cacheKey]);
    }

    return this.aggregatesStore[cacheKey] = Statistic.findOne({type, key})
    .then((stat) => stat && this.accumulateAggregates({
      stat,
      aggregates: context.aggregate.aggregates,
      invert: 1,
    })).then((stat) => {
      if (!stat) {
        stat = new Statistic();
        stat.set({type, key});
        stat.aggregates = context.aggregate.aggregates;
        stat.initialize(context);
      }
      stat.modifiedAt = Date.now();
      stat.dependencies = [context.stat];
      this.aggregatesStore[cacheKey] = stat;
      return stat;
    });
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
