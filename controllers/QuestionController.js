let Question = require('../data/models/Question');
let BaseController = require('./BaseController');


/**
 * Question document controller
 * 
 * @class QuestionController
 * @extends {BaseController}
 */
class QuestionController extends BaseController {
  getFromId(questionId) {
    Question.findOne({_id: questionId})
        .populate('options.option')
        .populate('children.question')
        .exec();
  }
}
Object.assign(QuestionController, {
  collection: Question,
  routeName: 'questions',
});

module.exports = QuestionController;
