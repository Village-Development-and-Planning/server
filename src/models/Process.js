const Schema = require('./Schema');
const mongoose = require('mongoose');

const processSchema = new Schema({
    name: {type: String, required: true},
    path: {type: String},
    args: {type: {}},
    status: {type: String},
    exitCode: {type: Number},
    exitSignal: {type: String},
    stdout: {type: String},
    stderr: {type: String},
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date},
});
processSchema.index({status: 1, name: 1});
processSchema.index({name: 1});


module.exports = mongoose.model('Process', processSchema);
