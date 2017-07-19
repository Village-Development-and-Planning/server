var Schema = require('./Schema');

var Text =  require('./Text');

var mongoose = require('mongoose');

var optionSchema = new Schema({
  type: {type: String, required: true},
  text: {type: Text, required: true},
});

module.exports = mongoose.model('Option', optionSchema);