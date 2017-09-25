module.exports = {
  tagPrefix: 'SELECT_',
  adorn(tag, obj) {
    obj.question.strategy = 'LOOP';
    const suffix = tag.slice(7);
    if (suffix == 'ONCE') {
      obj.answer.scope = 'once';
    } else if (suffix == 'OPTIONS') {
      obj.answer.scope = 'options';
    } else {
      obj.answer.scope = 'multiple';
    }
  },
};
