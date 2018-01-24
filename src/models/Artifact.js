const Schema = require('./Schema');
const mongoose = require('mongoose');

const artifactSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  type: {type: String, required: true},
  mimeType: {type: String, required: true},
  data: {type: Buffer, required: true},
});


module.exports = mongoose.model('Artifact', artifactSchema);
