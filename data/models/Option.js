var Schema = require('./Schema');

var Text = require('./Text');

var mongoose = require('mongoose');

var optionSchema = new Schema({
  text: { type: Text, required: true, unique: true },
  type: { type: String, required: true }
});

// indexes
optionSchema.index({
  text: 1,
  type: 1
});

module.exports = mongoose.model('Option', optionSchema);