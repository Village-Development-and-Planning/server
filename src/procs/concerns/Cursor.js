import 'babel-polyfill';
import Mixin from '../../lib/Mixin';
import co from 'co';
/**
 * Handles Survey concerns
 */
export default class extends Mixin {
  iterateCursor(query, iterProc='iteration', opts) {
    opts = Object.assign({bufferSize: 50}, opts);
    return co.call(this, function* () {
      const cursor = query.cursor({batchSize: opts.bufferSize});
      for (
        let doc = yield cursor.next();
        doc != null;
        doc = yield cursor.next()
      ) {
        yield Promise.resolve(this[iterProc](doc));
      }
    });
  }
}
