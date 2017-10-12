// connect to mongoose
const constants = appRequire('config/Constants');
const mongoose = require('mongoose');

const options = constants.db;
mongoose.Promise = global.Promise;
mongoose.connect(
  options.connectionString,
  options.connectionOptions,
  (err) => {
    if (err) {
      (console.log(`Error connecting to the DB: ${err}`));
    }
  });

// import so the schema is initially created. 
/* eslint-disable no-unused-vars */
const Survey = appRequire('data/models/Survey');
const Question = appRequire('data/models/Question');
const Option = appRequire('data/models/Option');
const Surveyor = appRequire('data/models/Surveyor');
