// connect to mongoose
var constants = require('../config/Constants');
var mongoose = require('mongoose');

var options = constants.db;
mongoose.Promise = global.Promise;
mongoose.connect(options.connectionString, options.connectionOptions, function (err) {
  if (err)
    console.log('Error connecting to the DB: ' + err);
});

// import so the schema is initially created. 
const Survey = require('../data/models/Survey');
const Question = require('../data/models/Question');
const Option = require('../data/models/Option');
const Surveyor = require('../data/models/Surveyor');
