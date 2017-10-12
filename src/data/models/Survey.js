const Schema = require('./Schema');
const mongoose = require('mongoose');

const surveySchema = new Schema({
  name: {type: String, required: true},
  question: {type: {}, required: true},
  description: {type: String},
});


module.exports = mongoose.model('Survey', surveySchema);
