import Schema from './Schema';
import mongoose from 'mongoose';

const schema = new Schema({
  type: {type: String, required: true},
  key: {type: String, required: true},
  name: {type: String},
  data: {type: {}},
});
schema.index({type: 1, key: 1, name: 1});

module.exports = mongoose.model('Statistic', schema);
