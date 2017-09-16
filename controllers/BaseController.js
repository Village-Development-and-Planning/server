var Survey = require('../data/models/Survey');
var Question = require('../data/models/Question');
var Option = require('../data/models/Option');

class BaseController {
  constructor(collection) {
    this.collection = collection;
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
      return self.saveQuestion(e);
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

  /**
   * Save the question along with its children and option into the database.
   * This method works recrusively to save the root's children. 
   * 
   * @param root - The root question to save. 
   * @return Promise with the inserted question id.
   */
   saveQuestion(root) {
    var self = this;
    console.log('Currently processing question:\n' + root);
    if (root.children.length > 0) {
      return Promise.all(root.children.map(function (e) {
        return self.saveQuestion(e);
      })).then(function (children) {
        return Object.assign(root, {
          children: children.map(function (e, index) {
            return {
              position: index,
              question: e
            }
          })
        });
      }).then(function (q) {
        return insertQuestionsWithOptions(q);
      }).then(function (r) {
        console.log('Saved question: \n' + r.toObject());
        return r._id;
      });
    } else {
      return insertQuestionsWithOptions(root).then(function (r) {
        console.log('Saved option: \n' + r.toObject());
        return r._id;
      });
    }

    // Helper to insert options along with the questions into the db
    function insertQuestionsWithOptions(root) {
      return Promise.all(root.options.map(function (option) {
        return Option.create(option);
      })).then(function (optionIds) {
        var rootWithOptionIds = Object.assign(root, {
          options: optionIds.map(function (e, index) {
            return {
              position: index,
              option: e
            }
          })
        });
        console.log('Option about to be saved is: \n' + rootWithOptionIds);
        return Question.create(rootWithOptionIds);
      });
    }
  }
}
module.exports = BaseController;