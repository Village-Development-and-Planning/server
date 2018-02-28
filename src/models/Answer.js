import Schema from './Schema';
import mongoose from 'mongoose';

import AnsweredQuestion from './AnsweredQuestion';

const answerSchema = new Schema({
  name: {type: String},
  description: {type: String},
  survey: {type: Schema.Types.ObjectId, ref: 'Survey', required: true},
  surveyor: {type: String},
  version: {type: Number, default: 0},
  rootQuestion: {
    type: {}, required: true,
    get: (a) => new AnsweredQuestion(a),
  },
  checksum: {type: String, required: true, unique: true},

  // Post-processing concerns
  lastExport: {type: Date},
  createdAt: {type: Date, default: Date.now},

});
answerSchema.index({survey: 1, lastExport: 1});
answerSchema.index({createdAt: 1, survey: 1});

module.exports = mongoose.model('Answer', answerSchema);
