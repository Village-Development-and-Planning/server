const Schema = require('./Schema');
const mongoose = require('mongoose');

const surveyorSchema = new Schema({
    name: {type: String, required: true},
    surveys: [{
        position: {type: String, required: true},
        survey: {type: Schema.Types.ObjectId, ref: 'Survey', required: true},
    }],
});

module.exports = mongoose.model('Surveyor', surveyorSchema);
