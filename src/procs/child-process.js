import ProcessM from '../models/Process';
import mongoose from 'mongoose';

import {spawn} from 'child_process';

export default class ChildProcess {
  constructor(opts) {
    Object.assign(this, opts);
  }

  execute(args) {
    this.procName = this.procName
      || this.constructor.procName
      || this.constructor.name
      || 'Unknown';
    this.procPath = this.procPath
      || this.constructor.procPath;
    if (!this.procPath) {
      throw new Error(
        `No process path configured for class: ${this.constructor.name}`
      );
    }


    const createP = ProcessM.create({
      name: this.procName,
      status: 'RUNNING',
      path: this.procPath,
      args,
    });

    const promise = new Promise((res, rej) => {
      createP.then(
        (proc) => {
          const p = spawn(
            process.execPath,
            [`build/procs/${this.procPath}.js`, proc._id]
          );
          let stdout = [];
          let stderr = [];

          p.on('close', (code, signal) => {
            proc.exitSignal = signal;
            proc.exitCode = code;
            proc.status = 'COMPLETED';
            proc.stdout = stdout.join('');
            proc.stderr = stderr.join('');
            proc.save().then(res).catch(rej);
          });
          p.stdout.on('data', (data) => {
            stdout = stdout.concat(data);
          });
          p.stderr.on('data', (data) => stderr = stderr.concat(data));
      }).catch(rej);
    });
    return {createP, promise};
  }
}

export class ChildTemplate {
  constructor(procArgs) {
    if (mongoose.Types.ObjectId.isValid(procArgs)) {
      this.promise = ProcessM.findOne({_id: procArgs})
      .then((proc) => proc || Promise.reject(`Not found: proc ${procArgs}`));
    } else if ((typeof procArgs === 'object') && procArgs._id) {
      this.promise = Promise.resolve(procArgs);
    } else {
      this.promise = Promise.reject(`Unknown process/id: ${procArgs}`);
    };
    this.promise = this.promise.then(
      (proc) => this.execute(proc),
    )
    .then((output) => console.log('Output: ', output))
    .catch((err) => console.log('Error: ', err));
  }
}
