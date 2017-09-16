var Survey = require('../data/models/Survey');
var Question = require('../data/models/Question');
var Option = require('../data/models/Option');

class BaseController {
  constructor(collection) {
    this.collection = collection;
  }

  /**
   * Generic fetch API endpoint template.  Calls getFromId with callback to return response in JSON.
   * @param  {[type]}   req  request
   * @param  {[type]}   res  response
   * @param  {Function} next next
   * @return {[type]}        None
   */
  fetchFromId(req, res, next) {
    return this.getFromId(req.params.id)
      .then((json) => { res.json(json) })
      .catch((err) => { next(err) });
  }

  /**
   * Creates a survay with the given questions in the db. 
   * 
   * @param surveyName - The name of the survey.
   * @param questions - array of questions to insert into the survey.
   * @return Promise with the inserted survey.
   */
   saveSurvey(surveyName, questions) {
    var self = this;
    return Promise.all(questions.map(function (e) {
      console.log('Question processing : \n' + e + '\n');
      return Question.saveDeep(e);
    })).then(function (questionIds) {
      var survey = {
        name: surveyName,
        questions: questionIds.map(function (e, index) {
          return {
            position: index,
            question: e
          }
        })
      }
      console.log('Survey about to be saved is: \n' + JSON.stringify(survey));
      return Survey.create(survey);
    });
  }

}
module.exports = BaseController;