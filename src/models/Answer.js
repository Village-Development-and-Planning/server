import Schema from './Schema';
import mongoose from 'mongoose';

import AnsweredQuestion from './AnsweredQuestion';

const answerSchema = new Schema({
  name: {type: String},
  description: {type: String},
  survey: {type: Schema.Types.ObjectId, ref: 'Survey', required: true},
  surveyor: {type: Schema.Types.ObjectId, ref: 'Surveyor'},
  version: {type: Number, default: 0},
  rootQuestion: {
    type: {}, required: true,
    get: (a) => new AnsweredQuestion(a),
  },
  checksum: {type: String, required: true, unique: true},

  // Post-processing concerns
  lastExport: {type: Date},
});
answerSchema.index({survey: 1, lastExport: 1});

module.exports = mongoose.model('Answer', answerSchema);