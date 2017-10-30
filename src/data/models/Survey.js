const Schema = require('./Schema');
const mongoose = require('mongoose');

const surveySchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  enabled: {type: Boolean, default: true},
  question: {type: {}, required: true},
});


module.exports = mongoose.model('Survey', surveySchema);
