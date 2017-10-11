const Schema = require('./Schema');

const Text = require('./Text');

const mongoose = require('mongoose');

const optionSchema = new Schema({
  text: {type: Text, required: true, unique: true},
  type: {type: String},
});

// indexes
optionSchema.index({
  text: 1,
  type: 1,
});

module.exports = mongoose.model('Option', optionSchema);
