const questionDefault = require('./question-default');

/**
 * Helper to split string into tags
 * 
 * @param {String} str 
 * @return {String[]}
 */
function _createTagsList(str) {
  return str.split(',').reduce((acc, e) => {
    if ((e = e.trim())) {
      acc.push(e);
    }
    return acc;
  }, []);
}

const tagsParser = (type, tags, parentContext) => {
  return _createTagsList(tags).reduce(
    (acc, tag) => {
      acc._tags[tag] = false;
      return tagModules.reduce(
        (acc2, m) => {
          if (tag.startsWith(m.tagPrefix)) {
            m.adorn(tag, acc2);
            acc2._tags[tag] = m.tagPrefix;
          };
          return acc2;
        }, acc,
      );
    }, Object.assign(
      {}, questionDefault(type, parentContext),
    ),
  );
};
module.exports = tagsParser;

const tagModules = [].concat([

  require('./data/pre-fill'),
  require('./data/auth'),

  require('./core/loop'),
  require('./core/select'),

  require('./ui/grid'),
  require('./ui/images'),
  require('./ui/number'),

]);
// .reduce(
//   (acc, m) => {
//     return acc[m.tagPrefix] = m;
//   }, {}
// );
