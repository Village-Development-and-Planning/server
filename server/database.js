// connect to mongoose
const constants = require('../config/Constants');
const mongoose = require('mongoose');

const options = constants.db;
mongoose.Promise = global.Promise;
mongoose.connect(
  options.connectionString,
  options.connectionOptions,
  (err) => {
    if (err) {
      console.log(`Error connecting to the DB: ${err}`);
    }
  });

// import so the schema is initially created. 
/* eslint-disable no-unused-vars */
const Survey = require('../data/models/Survey');
const Question = require('../data/models/Question');
const Option = require('../data/models/Option');
const Surveyor = require('../data/models/Surveyor');
