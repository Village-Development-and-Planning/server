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
        aKeys = Object.keys(this.aggregatesStore);
        console.log(`Length is now ${aKeys.length}`);
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
          (tgStat) => stat.isNew || tgStat.accumulate(ctx)
        )
      );
    }
    return Promise.all(promises);
  }

  findAggregate(context) {
    const {aggregateKey} = context;
    if (!aggregateKey) throw new Error('Aggregate Key needed.');
    this.aggregatesStore = this.aggregatesStore || {};

    const {type, key} = aggregateKey;
    if (!type || !key) throw new Error('type, key needed in AggregateKey.');
    console.log(`Finding aggregate [${type}] ${key}`);

    let cacheKey = `${type}||${key}`;
    if (this.aggregatesStore[cacheKey]) {
      let a = this.aggregatesStore[cacheKey];
      let promise;
      if (a.then) {
        promise = a.then((st) => {
          st.dependencies.push(context.stat);
          return st;
        });
      } else {
        a.dependencies.push(context.stat);
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
      stat.dependencies = [context.stat];
      return Promise.resolve(this.accumulateAggregates({
        stat,
        aggregates: context.aggregate.aggregates,
        invert: 1,
      })).then(() => {
        this.aggregatesStore[cacheKey] = stat;
        return stat;
      });
    }).catch((err) => {
      console.log(`Error finding aggregate: ${type} ${key}`);
    });
  }
}
