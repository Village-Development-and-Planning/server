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
    if (answer) {
      this._servePromise(Answer.create(answer), res, next);
    } else {
      this.renderer.sendError({
        status: 400,
        details: 'Answer missing.',
      });
    }
  }
}
Object.assign(AnswerController, {
  collection: Answer,
  routeName: 'answers',
});
module.exports = AnswerController;
export default AnswerController;
