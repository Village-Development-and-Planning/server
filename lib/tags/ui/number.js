module.exports = {
  tagPrefix: 'NUMBER',
  adorn(tag, obj) {
    obj.question.validation = '[0-9]+';
  },
};
