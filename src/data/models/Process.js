const Schema = require('./Schema');
const mongoose = require('mongoose');

const processSchema = new Schema({
    name: {type: String, required: true},
    status: {type: String},
});

module.exports = mongoose.model('Process', processSchema);
