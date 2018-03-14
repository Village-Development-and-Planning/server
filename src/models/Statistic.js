import Schema from './Schema';
import mongoose from 'mongoose';

import Aggregates from './concerns/Aggregates';


const schema = new Schema({
  type: {type: String, required: true},
  key: {type: String, required: true},
  name: {type: String},
  data: {type: {}},
  metadata: {type: {}},
});
schema.index({key: 1, type: 1});
schema.index({type: 1});
Aggregates.copyTo(schema.methods);

module.exports = mongoose.model('Statistic', schema);
