const mongoose = require('mongoose');

/**
 * Wrapper for our document schemas.
 *
 *   Adds modifiedAt property.
 *
 * @class Schema
 * @extends {mongoose.Schema}
 */
class Schema extends mongoose.Schema {
  constructor(schema, opts) {
    super(Object.assign({
      modifiedAt: {type: Date, default: Date.now},
    }, schema), opts);
  }
}
Schema.Types = mongoose.Schema.Types;

module.exports = Schema;
