import Answer from '../data/models/Answer';
import EntityController from './EntitiyController';

/**
 * Question document controller
 * 
 * @class QuestionController
 * @extends {BaseController}
 */
class AnswerController extends EntityController {
  createFromJson(req, res, next) {
    const answer = req.body;
    Answer
      .create(answer)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  }
}
Object.assign(AnswerController, {
  collection: Answer,
  routeName: 'answers',
});
module.exports = AnswerController;
export default AnswerController;
