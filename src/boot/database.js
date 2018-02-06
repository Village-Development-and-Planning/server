// connect to mongoose
import constants from '../config/Constants';
import mongoose from 'mongoose';

const options = constants.db;
mongoose.Promise = global.Promise;

export default mongoose.connect(
  options.connectionString,
  options.connectionOptions,
);
