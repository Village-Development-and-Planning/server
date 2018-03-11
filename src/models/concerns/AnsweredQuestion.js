import Mixin from '../../lib/Mixin';

export default class extends Mixin {
  * collectRespondent({acc, prefix, refQ, keys}) {
    for (let ans of this.answers) {
      const obj = this.collectAnswer({
        acc: Object.assign({}, acc),
        ansKey: prefix,
        ans, keys, refQ,
      });
      if (ans.startTimestamp) {
        obj.START_TIME = ans.startTimestamp;
        obj.END_TIME = ans.endTimestamp;
        if (!keys.posSTART_TIME) {
          keys.push('START_TIME');
          keys.push('END_TIME');
          keys.posSTART_TIME = 'Start time of respondent.';
          keys.posEND_TIME = 'End time of respondent.';
        }
      }
      yield obj;
    }
  }

  _accumulateValue(ans, ansKey, refQ) {
    if (!ans.logged_options) return {};
    const ret = {};
    if (refQ.type === 'ROOT' || refQ.type === 'DUMMY' || !this.number) {
      return ret;
    }
    if (refQ.type === 'MULTIPLE_CHOICE') {
      ans.logged_options.reduce((acc, opt) => {
        if (opt.position !== null) {
          acc[`${ansKey}_opt${opt.position}`] = 1;
        }
        return acc;
      }, ret);
    } else if (refQ.type === 'GPS') {
      let lat, long, val;
      const opt = ans.logged_options[0];
      val = opt && (opt.value || opt.text.english);
      val = val || '';
      [lat, long] = val.split(',');
      ret[`${ansKey}_lat`] = lat;
      ret[`${ansKey}_long`] = long;
    } else if (
      (['INFO', 'INPUT', 'CONFIRMATION'].indexOf(refQ.type) !== -1)
      || (refQ.flow && refQ.flow.pre.fill.length)
    ) {
      ret[ansKey] = ans.logged_options.map(
        (opt) => opt.value || opt.text.english,
      ).join(',').toUpperCase();
    } else {
      ret[ansKey] = ans.logged_options.map(
        (opt) => (opt.position || opt.value || opt.text.english)
      ).join(',');
    }
    return ret;
  }


  * findRespondents({position, acc, prefix, keys, respondents, idx, refQ}) {
    const number = respondents[idx];
    if (!this.isParent(number)) return;
    if (!this.answers) return;


    acc = acc || {};
    prefix = prefix || 'Q';
    keys = keys || [];
    position = position || '';
    prefix = `${prefix}${position}`;

    if (this.number === number) {
      yield {question: this, context: {acc, keys, prefix, refQ}};
      return;
    }

    for (let ans of this.answers) {
      if (ans.children) {
        let respChild = ans.children.find(
          (child, idx) => {
            child = child.question;
            if (child.isParent(number)) {
              return child;
            } else {
              return false;
            }
          }
        );
        if (respChild) {
          const position = respChild.position;
          respChild = respChild.question;
          const childQ = refQ.findChildByPosition(position);
          const newAcc = this.collectAnswer({
            ans, keys, refQ,
            ansKey: prefix,

            ignore: respondents,
            acc: Object.assign({}, acc),
          });
          if (!childQ) {
            throw new Error(
              `Child question ${position} not found.
               In Q ${refQ.number || refQ.type}.`
            );
          }
          yield* respChild.findRespondents({
            position: position,
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
          if (!childQ) {
            throw new Error(
              `Child question ${child.position} not found.
               In Q ${refQ.number || refQ.type}.`
            );
          }
          const childAnswer = child.question;
          if (ignore && ignore.reduce(
            (acc, ign) => (acc || childQ.isParent(ign)),
            false,
          )) return acc;


          return childAnswer.collect({
            position: child.position,
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

  collect({position, acc, prefix, suffix, keys, ignore, refQ}) {
    acc = acc || {};
    prefix = prefix || 'Q';
    suffix = suffix || '';
    keys = keys || [];

    let pos = position || '';
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
}
