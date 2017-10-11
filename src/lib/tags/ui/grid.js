module.exports = {
  tagPrefix: 'GRID',
  adorn(tag, obj) {
    let suffix = tag.slice(5);
    if (!suffix) {
      suffix = (obj.child && obj.child.select) || 'multiple';
    }
    obj.child.strategy = 'select';
    obj.child.select = {
      ui: 'grid',
      repeat: suffix.toLowerCase(),
    };
  },
};
