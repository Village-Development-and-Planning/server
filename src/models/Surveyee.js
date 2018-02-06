import Schema from './Schema';
import mongoose from 'mongoose';

const surveyorSchema = new Schema({
  data: {type: {}, require: true},
});

module.exports = mongoose.model('Surveyee', surveyorSchema);
