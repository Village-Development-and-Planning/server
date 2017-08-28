var Schema = require('./Schema');

var Text = require('./Text');

var mongoose = require('mongoose');

var questionSchema = new Schema({
  type: { type: String },
  tags: [{ type: String }],
  text: { type: Text, required: true },
  number: { type: String },
  options: [{
    position: { type: String, required: true },
    option: { type: Schema.Types.ObjectId, ref: 'Option', required: true },
  }],
  children: [{
    position: { type: String, required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  }]
});

module.exports = mongoose.model('Question', questionSchema);