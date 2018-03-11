import 'babel-polyfill';

export default class {
  constructor(opts) {
    Object.assign(this, opts);
    this.data = this.data || {};

    this.suffix = this.suffix || '';
    this.prefix = this.prefix || 'Q';
  }

  collect() {
    for (let arg of this.answeredQuestion.walkAnswer(this)) {
      this._iterProc(arg);
    }
  }


  * collectRespondents() {
    if (!this.survey) throw new Error('Survey needed');
    if (!this.answer) throw new Error('Answer needed');

    this.question = this.survey.question;
    this.answeredQuestion = this.answer.rootQuestion;

    this.respondents = this.survey.respondents;
    if (!this.respondents || !this.respondents.length) {
      this.respondents = [null];
    }

    this.ignores = this.respondents;

    for (let respondent of this.respondents) {
      const c = Object.setPrototypeOf({respondent}, this);
      for (let [ctx, prev] of this.answeredQuestion.walkRespondents(c)) {
        this._iterProc([ctx, prev]);
        if (ctx.type === 'respondent') {
          ctx.collect();
          yield ctx;
        }
      }
    }
  }

  _iterProc([ctx, prev]) {
    if (prev) Object.setPrototypeOf(ctx, prev);

    if (ctx.type === 'answer') {
      ctx._processAnswer();
    } else if (ctx.type === 'respondentAnswer') {
      ctx.answerIdx = null;
      ctx._cloneStore();
      ctx._processAnswer();
    } else if (ctx.type === 'child') {
      ctx._processChild();
    } else if (ctx.type === 'respondentChild') {
      ctx._processChild();
    }
  }

  _cloneStore() {
    this.data = Object.assign({}, this.data);
  }

  _processChild() {
    const num = this.position.replace('.', '_');
    this.prefix = `${this.prefix}_${num}`;
  }

  _processAnswer() {
    const qFlow = this.question.flow;
    if (qFlow && qFlow.answer.scope && !this.question.type === 'ROOT') {
      this.suffix = `${this.suffix}_ans${this.answerIdx+1}`;
    }
    for (let {key, value} of this.question.values(this.answer)) {
      const objKey = `${this.prefix}${this.suffix}${key}`;
      this.addValue(objKey, value);
    }
  }

  addValue(key, value, description) {
    if (!this.keys[`pos${key}`]) {
      this.keys.push(key);
      this.keys[`pos${key}`] = description ||
        `${this.question.number || 'N'}. ` +
        `${this.question.text.english || 'TEXT'}`;
    }
    this.data[key] = value;
  }
}
