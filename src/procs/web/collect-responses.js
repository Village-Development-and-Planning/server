import {ChildTemplate} from '../child-process';

import Survey from '../../models/Survey';
import Answer from '../../models/Answer';
import Statistic from '../../models/Statistic';

export default class CollectResponses extends ChildTemplate {
  execute(proc) {
    this.surveyId = proc.args;
    return this.getSurvey()
    .then(() => this.getExportHeader())
    .then(() => this.collectAnswers())
    .then(() => this.updateExportHeader());
  }

  getSurvey() {
    return Survey
    .findOne({_id: this.surveyId})
    .then((survey) => {
      this.survey = survey;
      if (survey) {
        this.surveyRespondents = survey.respondents;
      } else {
        return Promise.reject(`Survey: ${this.surveyId} not found.`);
      }
    });
  }

  collectAnswers() {
    this.answersLog = [];
    const cursor = Answer.find({
      survey: this.surveyId,
      lastExport: null,
    }).cursor();
    return new Promise((res, rej) => {
      cursor.on('data', (ans) => ans && this.collectOneAnswer(ans));
      cursor.on('error', rej);
      cursor.on('end', () => res(Promise.all(this.answersLog)));
    });
  }

  finishAnswer(answer, remarks) {
    this.answersLog.push(
      Promise.resolve(remarks)
      .then((remarks) => {
        remarks._id = answer._id;
        return remarks;
      })
    );
  }

  collectOneAnswer(answer) {
    if (!answer) return;
    if (!answer.rootQuestion) {
      this.finishAnswer(answer, {status: 'SKIPPED', reason: 'EMPTY'});
      return;
    }
    if (answer.version == 0) {
      this.finishAnswer(answer, {status: 'SKIPPED', reason: 'VERSION0'});
      return;
    }
    this.currentAnswer = answer;

    if (!this.surveyRespondents || !this.surveyRespondents.length) {
      const obj = answer.rootQuestion.collect({keys: this.collectionKeys});
      return this.writeStatsObj(obj);
    } else {
      this.surveyRespondents.forEach((resp, idx) => {
        answer.rootQuestion.findRespondents({
          keys: this.collectionKeys,
          respondents: this.surveyRespondents,
          cb: this.collectRespondent.bind(this),
          idx,
        });
      });
    }
  }

  collectRespondent(question, {acc, prefix}) {
    question.answers.forEach((ans, idx) => {
      const obj = question.collectAnswer({
        ans, idx,
        acc: Object.assign({}, acc),
        keys: this.collectionKeys,
        ansKey: prefix,
      });
      this.writeStatsObj(obj);
    });
  }

  getExportHeader() {
    return Statistic
    .findOne({survey: this.surveyId, answer: null})
    .then((stat) => {
      this.collectionKeys = [];
      if (stat) {
        this.collectionKeys = stat.data.keys || this.collectionKeys;
      }
    });
  }

  updateExportHeader() {
    return Statistic
    .findOneAndUpdate(
      {survey: this.surveyId, answer: null},
      {data: {keys: this.collectionKeys}},
    );
  }

  writeStatsObj(obj) {
    this.finishAnswer(
      this.currentAnswer,
      Statistic.create({
        survey: this.surveyId,
        answer: this.currentAnswer,
        data: obj,
      }).then(() => ({status: 'DONE'})),
    );
  }
}
