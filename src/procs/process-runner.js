import {} from '../boot/database';
import mongoose from 'mongoose';

const Process = Proc.default;
const procId = process.argv[2];

if (!procId) {
  process.exit(-1);
}

const proc = new Process(procId);
if (!proc || !proc.promise) {
  process.exit(-1);
}

proc.promise.then(
  () => mongoose.connection.close(),
  () => mongoose.connection.close(),
);
process.exitCode = 0;
