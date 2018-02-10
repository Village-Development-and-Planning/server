import ProcessM from '../models/Process';

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
      throw new Error(`No process path configured for class: ${this.constructor.name}`);
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

          p.on('close', (code) => {
            proc.exitCode = code;
            proc.status = 'COMPLETED';
            proc.stdout = stdout.join('\n');
            proc.stderr = stderr.join('\n');
            console.log(proc.stdout);
            proc.save();
          });
          p.stdout.on('data', (data) => stdout = stdout.concat(data));
          p.stderr.on('data', (data) => stderr = stderr.concat(data));
      }).catch(rej);
    });
    return {createP, promise};
  }
}

export class ChildTemplate {
  constructor(procId) {
    this.promise = ProcessM.findOne({_id: procId})
    .then((proc) => {
      if (!proc) {
        throw new Error(`Unknown process id: ${procId}`);
      }
      this.proc = proc;
      return this.execute(proc);
    }).then((output) => {
      console.log(output);
    }).catch((err) => {
      console.log('Error: ');
      console.log(err);
    });
  }
}
