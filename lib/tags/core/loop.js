module.exports = {
  tagPrefix: 'LOOP_',
  adorn(tag, obj) {
    obj.exit.strategy = 'LOOP';
    const suffix = tag.slice(5);
    if (suffix == 'OPTIONS') {
      obj.answer.scope = 'options';
    } else {
      obj.answer.scope = 'multiple';
    }
  },
};
