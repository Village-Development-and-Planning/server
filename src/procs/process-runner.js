global.appRequire = (name) => require(`${__dirname}/../${name}`);

require('../server/database');
const mongoose = require('mongoose');

const Process = Proc.default;
const arg = process.argv[2];
const method = process.argv[3];

if (!arg || !method) {
  console.log(`Usage: ${process.argv[0]} <arg> <method>`);
  process.exit(-1);
}

const proc = new Process(arg);
if (!proc) {
  console.log('Error creating process.');
  process.exit(-1);
}

if (typeof proc[method] !== 'function') {
  console.log('Method not found: ' + method);
  process.exit(-1);
}

const promise = proc[method]();
if (!promise.then) {
  mongoose.connection.close();
} else {
  promise.then(() => mongoose.connection.close());
}
