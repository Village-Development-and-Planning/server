
import 'babel-polyfill';
import Mixin from '../../lib/Mixin';

export default class extends Mixin {
  * walkAnswers() {
    if (!this.answers || !this.answers.length) return;
    let answerIdx = 0;
    for (let answer of this.answers) {
      yield {
        answer, answerIdx,
      };
      answerIdx++;
    }
  }

  * walkChildren({answer, question} ) {
    if (!question) throw new Error('Question needed');
    if (!answer) throw new Error('Answer needed');

    if (!question.children || !question.children.length) return;
    if (!answer.children || !answer.children.length) return;

    const answersHash = answer.children.reduce(
      (acc, child) => Object.assign(acc, {
        [child.position]: child,
      }),
      {},
    );

    for (let child of question.children) {
      const ans = answersHash[child.position];
      if (ans) {
        yield {
          position: ans.position,
          question: child.question,
          answeredQuestion: ans.question,
        };
      }
    }
  }

  * walkRespondents(context) {
    const {
      question, respondent, ignores=[],
    } = context;
    if (!question) throw new Error('Question needed');
    if (typeof respondent === 'undefined') throw new Error('Respondent needed');

    if (
      (!respondent && (question.type === 'ROOT'))
      || (!respondent && !question.number)
      || (question.number === respondent)
    ) {
      for (let ansCtx of this.walkAnswers()) {
        ansCtx.type = 'respondent';
        yield [ansCtx, context];
      }
      return;
    }

    let respChild;

    for (let ansCtx of this.walkAnswers()) {
      ansCtx.type = 'respondentAnswer';
      yield [ansCtx, context];

      for (let child of this.walkChildren(ansCtx)) {
        if (child.question.isParent(respondent)) {
          respChild = child;
          continue;
        }
        if (this._checkIgnore(child.question, ignores)) continue;
        child.type = 'child';
        yield [child, ansCtx];

        yield* child.answeredQuestion.walk(child);
      }

      if (respChild) {
        respChild.type = 'respondentChild';
        yield [respChild, ansCtx];

        yield* respChild.answeredQuestion.walkRespondents(respChild);
      }
    }
  }

  * walk(context) {
    for (let ansCtx of this.walkAnswers(context)) {
      ansCtx.type = 'answer';
      yield [ansCtx, context];
      if (!ansCtx.question) ansCtx.question = context.question;
      yield* this.walkAnswer(ansCtx);
    }
  }

  * walkAnswer(ansCtx) {
    for (let child of this.walkChildren(ansCtx)) {
      child.type = 'child';
      yield [child, ansCtx];
      yield* child.answeredQuestion.walk(child);
    }
  }


  _checkIgnore(question, ignores) {
    for (let ign of ignores) {
      if (question.isParent(ign)) return true;
    }
    return false;
  }
}
