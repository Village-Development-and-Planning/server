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
    return co.call(this, function* () {
      if (!this.aggregatesStore) return;
      let aKeys = Object.keys(this.aggregatesStore);
      while (aKeys.length) {
        const aKey = aKeys.find(
          (key) => {
            const deps = this.aggregatesStore[key].dependencies;
            for (let dKey of Object.keys(deps)) {
              const dStat = deps[dKey];
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
        for (let dKey of Object.keys(agg.dependencies)) {
        }
        delete this.aggregatesStore[aKey];
        aKeys = Object.keys(this.aggregatesStore);
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
          (tgStat) => (stat.isNew || tgStat.accumulate(ctx))
        )
      );
    }
    return Promise.all(promises);
  }

  findAggregate(context) {
    const {aggregateKey, stat} = context;
    if (!aggregateKey) throw new Error('Aggregate Key needed.');
    this.aggregatesStore = this.aggregatesStore || {};

    const {type, key} = aggregateKey;
    if (!type || !key) throw new Error('type, key needed in AggregateKey.');

    const cacheKeyFunction = (stat) => `[${stat.type}] ${stat.key}`;
    let cacheKey = cacheKeyFunction(aggregateKey);
    if (this.aggregatesStore[cacheKey]) {
      let a = this.aggregatesStore[cacheKey];
      let promise;
      if (a.then) {
        promise = a.then((st) => {
          st.dependencies[cacheKeyFunction(stat)] = stat;
          return st;
        });
      } else {
        a.dependencies[cacheKeyFunction(stat)] = stat;
        promise = Promise.resolve(a);
      }
      return promise;
    }
    return this.aggregatesStore[cacheKey] = Statistic.findOne({type, key})
    .then((stat) => {
      if (!stat) {
        stat = new Statistic();
        stat.set({type, key});
        stat.initialize(context);
      }
      stat.aggregates = context.aggregate.aggregates;
      stat.modifiedAt = Date.now();
      stat.dependencies = {
        [cacheKeyFunction(context.stat)]: context.stat,
      };
      return Promise.resolve(this.accumulateAggregates({
        stat,
        aggregates: context.aggregate.aggregates,
        invert: 1,
      })).then(() => {
        this.aggregatesStore[cacheKey] = stat;
        return stat;
      });
    }).catch((err) => {
      console.error(cacheKey, err);
    });
  }
}
