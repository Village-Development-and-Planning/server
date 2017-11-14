/**
 * Mixin helper.  Extend and define mixin methods
 */
export default class Mixin {
  constructor(klass) {
    return Mixin.mixin(klass, this.constructor);
  }

  static _copyMethods(target, ...srcs) {
    srcs.forEach((src) => {
      Object.keys(src).forEach((prop) => {
        target[prop] = src[prop];
      });
    });
  }

  static mixin(klass, ...mixins) {
    return mixins.reduce((klass, mixin) => {
      const C = class extends klass {};
      Mixin._copyMethods(C, mixin.prototype);
      return C;
    }, klass);
  }
};
