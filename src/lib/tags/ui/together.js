module.exports = {
  tagPrefix: 'SHOWN_TOGETHER',
  adorn(tag, obj) {
    obj.child.strategy = 'together';
  },
};
