import 'babel-polyfill';
import Mixin from '../../lib/Mixin';
/**
 * Handles Survey concerns
 */
export default class extends Mixin {
  iterateCursor(query, iterProc='iteration') {
    return new Promise((res, rej) => {
      const promises = [];
      const cursor = query.cursor();
      cursor
        .on('data', (doc) => doc && promises.push(this[iterProc](doc)))
        .on('end', () => res(Promise.all(promises)));
    });
  }
}
