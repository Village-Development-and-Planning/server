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

export default (array, tagModules, operator, initialPromise) => {
  if (typeof array === 'string') {
    array = _createTagsList(array);
  }
  const warnings = [];
  return array.reduce(
    (acc, tag) => {
      let handled = false;
      acc = tagModules.reduce(
        (acc, mod) => {
          if (tag.startsWith(mod.tagPrefix)) {
            handled = true;
            acc = acc.then((o) => (operator(o, mod, tag) || o));
          }
          return acc;
        },
        acc,
      );
      if (!handled) {
        warnings.push({
          message: `Unknown tag ${tag}.`,
        });
      }
      return acc;
    },
    initialPromise,
  ).then((output) => ({output, warnings}));
};
