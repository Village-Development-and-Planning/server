var Schema = require('./Schema');
var mongoose = require('mongoose');

var surveyorSchema = new Schema({
    name: {type: String, required: true},
    surveys: [{
        position: {type: String, required: true},
        survey: { type: Schema.Types.ObjectId, ref: 'Survey', required: true}
    }]
});

module.exports = mongoose.model('Surveyor', surveyorSchema);