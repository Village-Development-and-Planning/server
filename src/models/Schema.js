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
  constructor(schema) {
    super(Object.assign({
      modifiedAt: {type: Date, default: Date.now},
    }, schema));
  }
}
Schema.Types = mongoose.Schema.Types;

module.exports = Schema;
