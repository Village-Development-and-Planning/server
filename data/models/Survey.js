const Schema = require('./Schema');
const mongoose = require('mongoose');

const surveySchema = new Schema({
  name: {type: String, required: true},
  questions: [{
    position: {type: String, required: true},
    question: {type: Schema.Types.ObjectId, ref: 'Question', required: true},
  }],
  description: {type: String},
});


/**
* Creates a survay with the given questions in the db. 
* 
* @param surveyName - The name of the survey.
* @param questions - array of questions to insert into the survey.
* @return Promise with the inserted survey.
*/

surveySchema.statics.saveDeep = function(surveyName, questions) {
  let Question = this.model('Question');
  return Promise.all(
    questions.map(
      (q) => Question.saveDeep(q)
    )).then(
      (qIds) => this.create({
        name: surveyName,
        questions: qIds.map(
          (e, i) => ({position: i, question: e})),
        }));
      };


      module.exports = mongoose.model('Survey', surveySchema);
