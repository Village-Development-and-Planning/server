import Question from './Question';
import Location from './Location';

/**
 * Provides export functionalities
 */
export default class AnsweredQuestion extends Question {
  * collectRespondent({acc, prefix, refQ, keys}) {
    for (let ans of this.answers) {
      yield this.collectAnswer({
        acc: Object.assign({}, acc),
        ansKey: prefix,
        ans, keys, refQ,
      });
    }
  }

  _accumulateValue(ans, ansKey, refQ) {
    refQ = refQ || this;
    console.log(`accumulateValue: ${refQ.number} ${this.number}`);
    if (!ans.logged_options) return {};
    if (this.type == 'ROOT' || this.type == 'DUMMY' || !this.number) {
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
    } else if (
      (['INFO', 'INPUT'].indexOf(this.type) !== -1)
      || (refQ.flow && refQ.flow.pre.fill.length)
    ) {
      ret[ansKey] = ans.logged_options.map(
        (opt) => opt.value || opt.text.english,
      ).join(',').toUpperCase();
      console.log(ret[ansKey]);
    } else {
      ret[ansKey] = ans.logged_options.map(
        (opt) => (opt.position || opt.value || opt.text.english)
      ).join(',');
    }

    if (refQ.flow.pre.fill.length) {
      for (let el of refQ.flow.pre.fill) {
        let field;
        let type;
        let other;

        if (el.endsWith('_NAME')) {
          field = 'name'; other = 'code';
        } else if (el.endsWith('_CODE')) {
          field = 'code'; other = 'name';
        }
        type = el.slice(0, -5);
        if (type && field) {
          ret[`${type}_${other.toUpperCase()}`] = Location.findOne({
            type, [field]: ret[ansKey],
          }).then((loc) => (loc && loc[other] || 'UNKNOWN'));
        }
      }
    }
    return ret;
  }


  * findRespondents({acc, prefix, keys, respondents, idx, refQ}) {
    const number = respondents[idx];
    if (!this.isParent(number)) return;
    if (!this.answers) return;

    acc = acc || {};
    prefix = prefix || 'Q';
    keys = keys || [];
    prefix = `${prefix}${this.position || ''}`;
    refQ = refQ || this;

    if (this.number === number) {
      yield {question: this, context: {acc, keys, prefix, refQ}};
      return;
    }

    for (let ans of this.answers) {
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
            ans, keys, refQ,
            ansKey: prefix,

            ignore: respondents,
            acc: Object.assign({}, acc),
          });
          yield* respChild.findRespondents({
            acc: newAcc,
            prefix: `${prefix}_`,
            refQ: childQ,
            keys, respondents, idx,
          });
        }
      }
    };
  }


  collectAnswer({ans, acc, ansKey, suffix, keys, ignore, refQ}) {
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
          newSuffix = suffix + `_ans${idx+1}`;
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
