import Schema from './Schema';
import mongoose from 'mongoose';

const schema = new Schema({
  type: {type: String, required: true},
  key: {type: String, required: true},
  name: {type: String},
  data: {type: {}},
});
schema.index({key: 1, type: 1});

module.exports = mongoose.model('Statistic', schema);
