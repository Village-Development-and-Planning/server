module.exports = {
  tagPrefix: 'FILL_',
  adorn(tag, obj) {
    obj.pre.fill.push(
      tag.slice(
        5, // 'FILL_'.length
      )
    );
  },
};
