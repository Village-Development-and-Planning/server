import Answer from '../data/models/Answer';
import EntityController from './EntitiyController';
import CSVWriter from 'csv-write-stream';

/**
 * Question document controller
 * 
 * @class QuestionController
 * @extends {BaseController}
 */
class AnswerController extends EntityController {
  _find(query) {
    return super._find(query)
      .select('survey modifiedAt');
  }

  _parseBody() {
    return super._parseBody().then(
      ({survey, rootQuestion, surveyor}) => ({survey, rootQuestion, surveyor})
    );
  }

  download() {
    const query = this._getQuery();
    Promise.resolve(
      query && this._findOne(query)
    )
    .then((e) => e || Promise.reject(new Error('Entity not found.')))
    .catch((err) => this.renderer.renderPromise(Promise.reject(err)))
    .then((answer) => {
      const res = this.renderer.res;
      res.attachment(`${answer._id}.csv`);

      const csvWriter = new CSVWriter();
      csvWriter.pipe(res);

      csvWriter.on('end', () => res.end());
      csvWriter.write(answer.rootQuestion.collect());
      csvWriter.end();
    })
    .catch((err) => {
      console.log(err.stack);
    });
  }
}
Object.assign(AnswerController, {
  collection: Answer,
  routeName: 'answers',
});
module.exports = AnswerController;
export default AnswerController;
