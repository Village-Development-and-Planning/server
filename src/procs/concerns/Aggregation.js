import 'babel-polyfill';
import Mixin from '../../lib/Mixin';
import Statistic from '../../models/Statistic';
import co from 'co';
import YAML from 'js-yaml';
/**
 * Handles Survey concerns
 */
export default class extends Mixin {
  saveAggregates() {
    this.aggregatesStore = this.aggregatesStore || {};
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
        yield agg.save();

        (console.log(`Saved stat: [${agg.type}] ${agg.key}`));
        if (agg.metadata) {
          (console.log('Metadata: ', YAML.safeDump(agg.metadata)));
        }
        if (agg.data) (console.log('Data: ', YAML.safeDump(agg.data)));
        if (agg.aggregates) {
          (console.log(`Accumulating ${agg.aggregates.length} sub-aggregates`));
          yield Promise.resolve(
            this.accumulateAggregates({
              stat: agg,
              aggregates: agg.aggregates,
            })
          );
        }
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
    const {aggregateKey} = context;
    if (!aggregateKey) throw new Error('Aggregate Key needed.');
    this.aggregatesStore = this.aggregatesStore || {};

    const {type, key} = aggregateKey;
    if (!type || !key) throw new Error('type, key needed in AggregateKey.');

    let cacheKey = `${type}//$$\\${key}`;
    if (this.aggregatesStore[cacheKey]) {
      let a = this.aggregatesStore[cacheKey];
      a.dependencies.push(context.stat);
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
        stat.initialize(context);
      }
      stat.aggregates = context.aggregate.aggregates;
      stat.modifiedAt = Date.now();
      stat.dependencies = [context.stat];
      this.aggregatesStore[cacheKey] = stat;
      return stat;
    });
  }
}
