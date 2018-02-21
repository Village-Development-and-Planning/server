import 'babel-polyfill';
import Mixin from '../../lib/Mixin';
import co from 'co';
/**
 * Handles Survey concerns
 */
export default class extends Mixin {
  iterateCursor(query, iterProc='iteration') {
    const cursor = query.cursor();
    const _this = this;
    return co(function* () {
      let doc;
      const remarks = [];
      while ((doc = cursor.next())) {
        remarks.push(
          yield doc.then((doc) => doc && _this[iterProc](doc))
        );
      }
      return remarks;
    });
  }
}
