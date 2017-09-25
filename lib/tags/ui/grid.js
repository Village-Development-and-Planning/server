module.exports = {
  tagPrefix: 'GRID_',
  adorn(tag, obj) {
    const suffix = tag.slice(5);
    obj.child.strategy = 'select';
    obj.child.select = {
      ui: 'grid',
      repeat: suffix.toLowerCase(),
    };
  },
};
