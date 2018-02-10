import Schema from './Schema';
import mongoose from 'mongoose';

const schema = new Schema({
  survey: {type: Schema.Types.ObjectId, ref: 'Survey'},
  answer: {type: Schema.Types.ObjectId, ref: 'Answer'},
  data: {type: {}},
});
schema.index({survey: 1, answer: 1});

module.exports = mongoose.model('Statistic', schema);
