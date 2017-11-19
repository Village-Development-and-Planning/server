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
    }
  }
);

