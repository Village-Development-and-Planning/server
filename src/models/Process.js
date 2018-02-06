const Schema = require('./Schema');
const mongoose = require('mongoose');

const processSchema = new Schema({
    name: {type: String, required: true},
    cmd: {type: String, required: true},
    args: [{type: String}],
    status: {type: String},
});

module.exports = mongoose.model('Process', processSchema);
