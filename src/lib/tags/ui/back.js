module.exports = {
  tagPrefix: 'UI_BACK_DISABLED',
  adorn(tag, obj) {
    obj.question.back = false;
  }
};
