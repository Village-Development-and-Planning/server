module.exports = {
  tagPrefix: 'AUTH_',
  adorn(tag, obj) {
    obj.post.push(
      tag.slice(
        5, // 'AUTH_'.length
      )
    );
  },
};
