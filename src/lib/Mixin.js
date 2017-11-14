/**
 * Mixin helper.  Extend and define mixin methods
 */
export default class Mixin {
  constructor(klass) {
    const C = class extends klass {};
    Mixin._copyMethods(C.prototype, this.constructor.prototype);
    return C;
  }

  static _copyMethods(target, src) {
    Object.getOwnPropertyNames(src).forEach((prop) => {
      if (prop !== 'constructor') {
        target[prop] = src[prop];
      }
    });
  }

  static mixin(klass, ...mixins) {
    return mixins.reduce((klass, Mix) => {
      return new Mix(klass);
    }, klass);
  }
};
