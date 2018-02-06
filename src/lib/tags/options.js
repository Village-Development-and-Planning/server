import promiseProcess from './promise-process';

const optionsDefault = {};

export default (tags) => {
  const moreWarnings = [];

  return promiseProcess(
    tags,
    optModules,
    (o, mod, tag) => mod.adorn(tag, o, moreWarnings),
    Promise.resolve(Object.assign({}, optionsDefault)),
  ).then(
    ({output, warnings}) => ({
      output,
      warnings: warnings.concat(moreWarnings),
    })
  );
};

const optModules = [].concat([
  require('./options/img'),
]);
