module.exports = {
  tagPrefix: 'OPTIONS_COUNT_',
  adorn(tag, obj) {
    const count = parseInt(tag.slice(module.exports.tagPrefix.length));
    obj.question.optionsLimit = count || false;
  },
};
