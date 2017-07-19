var mongoose = require('mongoose');
var util = require('util');

function Schema(schema) {

  var dSchema = Object.assign({
      modifiedAt: { type: Date, default: Date.now },
    }, schema);

  mongoose.Schema.call(this, dSchema);
};

Schema.Types = mongoose.Schema.Types;

util.inherits(Schema, mongoose.Schema);

module.exports = Schema;
