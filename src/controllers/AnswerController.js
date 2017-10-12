import Answer from '../data/models/Answer';
import EntityController from './EntitiyController';

/**
 * Question document controller
 * 
 * @class QuestionController
 * @extends {BaseController}
 */
class AnswerController extends EntityController {
  constructor(opts) {
    super(opts);
    this.router.post('/', this.createFromJson.bind(this));
  }

  createFromJson(req, res, next) {
  }
}
Object.assign(AnswerController, {
  collection: Answer,
  routeName: 'answers',
});
module.exports = AnswerController;
export default AnswerController;
