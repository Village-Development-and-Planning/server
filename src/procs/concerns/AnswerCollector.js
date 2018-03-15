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

    this.ignores = this.respondents.map(({number}) => number);

    for (let {number} of this.respondents) {
      const c = Object.setPrototypeOf({respondent: number}, this);
      for (let [ctx, prev] of this.answeredQuestion.walkRespondents(c)) {
        this._iterProc([ctx, prev]);
        if (ctx.type === 'respondent') {
          if (ctx.answer.startTimestamp && ctx.answer.endTimestamp) {
            ctx.addValue(
              'RESPONDENT', number, 'Respondent'
            );
            ctx.addValue(
              'START_TIME', ctx.answer.startTimestamp.getTime(), 'Start'
            );
            ctx.addValue(
              'END_TIME', ctx.answer.endTimestamp.getTime(), 'End'
            );
          }
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
    if (
      (this.type !== 'respondentAnswer')
      && qFlow
      && qFlow.answer.scope === 'multiple'
    ) {
      this.suffix = `${this.suffix}_ans${this.answerIdx+1}`;
    }
    for (let {key, value} of this.question.values(this.answer)) {
      const objKey = `${this.prefix}${this.suffix}${key}`;
      this.addValue(objKey, value);
    }
  }

  addValue(key, value, description) {
    const {keys, keysHash} = this.keys[String(this.respondent || null)];
    if (!keysHash[key]) {
      description = description
      ||`${this.question.number || 'N'}. `
        + `${this.question.text.english || 'TEXT'}`;

      keys.push({key, description});
      keysHash[key] = 1;
    }
    this.data[key] = value;
  }
}
