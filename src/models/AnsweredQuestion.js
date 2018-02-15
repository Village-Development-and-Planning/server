import Question from './Question';

/**
 * Provides export functionalities
 */
export default class AnsweredQuestion extends Question {
  _accumulateValue(ans, ansKey, refQ) {
    if (!ans.logged_options) return {};
    if (this.type == 'ROOT' || !this.number) {
      return {};
    }
    const ret = {};
    if (this.type == 'MULTIPLE_CHOICE') {
      ans.logged_options.reduce((acc, opt) => {
        if (opt.position !== null) {
          acc[`${ansKey}_opt${opt.position}`] = 1;
        }
        return acc;
      }, ret);
    } else if (this.type == 'GPS') {
      let lat;
      let long;
      ans.logged_options.forEach((opt) => {
        if (opt.type == 'GPS') {
          const val = opt.value || opt.text.english;
          [lat, long] = val.split(',');
        }
      });
      ret[`${ansKey}_lat`] = lat;
      ret[`${ansKey}_long`] = long;
    } else if (['INFO', 'INPUT'].indexOf(this.type) !== -1) {
      ret[ansKey] = ans.logged_options.map(
        (opt) => opt.value || opt.text.english,
      ).join(',');
    } else {
      ret[ansKey] = ans.logged_options.map(
        (opt) => (opt.position || opt.value || opt.text.english)
      ).join(',');
    }
    return ret;
  }


  findRespondents({acc, prefix, keys, respondents, idx, cb, refQ}) {
    const number = respondents[idx];
    if (!this.isParent(number)) return;
    if (!this.answers) return;

    acc = acc || {};
    prefix = prefix || 'Q';
    keys = keys || [];
    prefix = `${prefix}${this.position || ''}`;
    refQ = refQ || this;

    if (this.number === number) {
      cb(this, {acc, keys, prefix, refQ});
      return;
    }

    this.answers.forEach((ans, ansIdx) => {
      if (ans.children) {
        let respChild = ans.children.find(
          (child, idx) => {
            child = AnsweredQuestion.fromChild(child);
            if (child.isParent(number)) {
              return child;
            } else {
              return false;
            }
          }
        );
        if (respChild) {
          respChild = AnsweredQuestion.fromChild(respChild);
          const childQ = refQ.findChildByPosition(respChild.position);
          const newAcc = this.collectAnswer({
            ans, keys,
            idx: ansIdx,
            ansKey: prefix,

            ignore: respondents,
            acc: Object.assign({}, acc),

            refQ: childQ,
          });
          respChild.findRespondents({
            acc: newAcc,
            prefix: `${prefix}_`,
            refQ: childQ,
            keys, respondents, idx, cb,
          });
        }
      }
    });
  }


  collectAnswer({ans, idx, acc, ansKey, suffix, keys, ignore, refQ}) {
    acc = acc || {};
    ansKey = ansKey || 'Q';
    suffix = suffix || '';
    keys = keys || [];
    refQ = refQ || this;

    const valObj = this._accumulateValue(ans, ansKey, refQ);
    Object.keys(valObj).forEach((key) => {
      const oKey = key + suffix;
      acc[oKey] = valObj[key];
      if (!keys[`pos${oKey}`]) {
        keys.push(oKey);
        let text = valObj[`pos${key}`];
        if (!text) {
          text = '';
          if (refQ.number) text = text + refQ.number;
          if (refQ.text && refQ.text.english) {
            text = text + ` ${refQ.text.english}`;
          }
        }
        keys[`pos${oKey}`] = text || 'UNKNOWN';
      }
    });

    if (ans.children) {
        ans.children.reduce(
        (acc, child) => {
          const childQ = refQ.findChildByPosition(child.position);
          const childAnswer = AnsweredQuestion.fromChild(child);
          if (ignore && ignore.reduce(
            (acc, ign) => (acc || childAnswer.isParent(ign)),
            false,
          )) return acc;

          return childAnswer.collect({
            prefix: `${ansKey}_`,
            refQ: childQ,
            suffix, keys, acc, ignore,
          });
        },
        acc,
      );
    }
    return acc;
  }

  collect({acc, prefix, suffix, keys, ignore, refQ}) {
    acc = acc || {};
    prefix = prefix || 'Q';
    suffix = suffix || '';
    keys = keys || [];
    refQ = refQ || this;

    let pos = refQ.position || '';
    pos = pos.replace(/\./g, '_');
    prefix = `${prefix}${pos}`;
    return (this.answers ? (this.answers.reduce(
      (acc, ans, idx) => {
        let ansKey = prefix;
        let newSuffix = suffix;
        if (refQ.flow && refQ.flow.answer.scope == 'multiple') {
          newSuffix = suffix + `_ans${idx}`;
        }
        return this.collectAnswer({
          ans, idx, acc, ansKey, keys, ignore, refQ,
          suffix: newSuffix,
        });
      },
      acc,
    )) : acc);
  }

  static fromChild(child) {
    let childAnswer;
    if (child.question) {
      // Version 1
      childAnswer = new AnsweredQuestion(
        child.question, child.position
      );
    } else {
      childAnswer = new AnsweredQuestion(child);
    }
    return childAnswer;
  }
}
