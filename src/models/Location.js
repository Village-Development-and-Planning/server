import Schema from './Schema';
import mongoose from 'mongoose';

const schema = new Schema({
  type: {type: String, required: true},
  code: {type: String, required: true},
  uid: {type: String, require: true},
  name: {type: String, required: true},
  children: [{
    code: {type: String},
    name: {type: String},
    uid: {type: String},
  }],
  payload: {type: {}},
});
schema.index({type: 1, uid: 1});
schema.index({type: 1, code: 1});
schema.index({name: 1, type: 1});

export default mongoose.model('Location', schema);
