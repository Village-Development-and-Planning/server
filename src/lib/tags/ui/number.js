module.exports = {
  tagPrefix: 'NUMBER',
  adorn(tag, obj) {
    const suffix = tag.slice(6); // NUMBER_
    let match = null;

    obj.question.validationType = 'number';
    obj.question.validation = '[0-9]+';

    if (match = suffix.match(/_LIMIT_([0-9]*)/)) {
      obj.question.validationLimit = parseInt(match[1]);
    }
    if (match = suffix.match(/_DLIMIT_([0-9]*)/)) {
      obj.question.validationDigitsLimit = parseInt(match[1]);
    }
  },
};
