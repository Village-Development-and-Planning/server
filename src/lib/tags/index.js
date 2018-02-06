import questionDefault from './question-default';
import promiseProcess from './promise-process';

export default (type, tags, parentContext) => {
  const moreWarnings = [];

  return promiseProcess(
    tags,
    tagModules,
    (o, mod, tag) => mod.adorn(tag, o, moreWarnings),
    Promise.resolve(parentContext).then((pCtx) => {
      return Object.assign(
        {}, questionDefault(type, pCtx),
      );
    }),
  ).then(
    ({output, warnings}) => ({
      output,
      warnings: warnings.concat(moreWarnings),
    })
  );
};

const tagModules = [].concat([

  require('./data/pre-fill'),
  require('./data/auth'),

  require('./core/loop'),
  require('./core/select'),
  require('./core/options_count'),

  require('./ui/back'),
  require('./ui/grid'),
  require('./ui/images'),
  require('./ui/number'),
  require('./ui/together'),

]);

