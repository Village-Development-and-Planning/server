import Schema from './Schema';
import mongoose from 'mongoose';

const schema = new Schema({
  survey: {type: Schema.Types.ObjectId, ref: 'Survey'},
  type: {type: String, required: true},
  key: {type: String, required: true},
  secondaryKey: {type: String},
  data: {type: {}},
});
schema.index({type: 1, key: 1, secondaryKey: 1});
schema.index({survey: 1, type: 1});

module.exports = mongoose.model('Aggregate', schema);
