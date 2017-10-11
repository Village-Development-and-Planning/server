import Schema from './Schema';
import mongoose from 'mongoose';

const surveyorSchema = new Schema({
  survey: {type: Schema.Types.ObjectId, ref: 'Survey', required: true},
  surveyor: {type: Schema.Types.ObjectId, ref: 'Surveyor', required: true},
  data: {type: {}, require: true},
});

module.exports = mongoose.model('Answer', surveyorSchema);
