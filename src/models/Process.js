const Schema = require('./Schema');
const mongoose = require('mongoose');

const processSchema = new Schema({
    name: {type: String, required: true},
    path: {type: String},
    args: {type: {}},
    status: {type: String},
    exitCode: {type: Number},
    stdout: {type: String},
    stderr: {type: String},
});
processSchema.index({status: 1, name: 1});
processSchema.index({name: 1});


module.exports = mongoose.model('Process', processSchema);
