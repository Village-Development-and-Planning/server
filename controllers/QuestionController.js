let Question = require('../data/models/Question');

import EntityController from './EntitiyController';

/**
 * Question document controller
 * 
 * @class QuestionController
 * @extends {BaseController}
 */
class QuestionController extends EntityController {
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
