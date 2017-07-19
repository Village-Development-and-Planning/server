var Schema = require('./Schema');
var mongoose = require('mongoose');

var surveySchema = new Schema({
    name: {type: String, required: true},
    questions: [{
        position: {type: String, required: true},
        question: { type: Schema.Types.ObjectId, ref: 'Question', required: true}
    }],
    description: {type: String}
});

module.exports = mongoose.model('Survey', surveySchema);