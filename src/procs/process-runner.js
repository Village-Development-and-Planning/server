global.appRequire = (name) => require(`${__dirname}/../${name}`);

require('../server/database');
const mongoose = require('mongoose');

const Process = Proc.default;
const arg = process.argv[2];
const method = process.argv[3];

if (!arg || !method) {
  process.exit(-1);
}

const proc = new Process(arg);
if (!proc) {
  process.exit(-1);
}

if (typeof proc[method] !== 'function') {
  process.exit(-1);
}

Promise.resolve(proc[method]()).then(
  () => null,
).then(() => mongoose.connection.close());
process.exitCode = 0;
