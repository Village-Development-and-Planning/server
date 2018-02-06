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


    return new Promise((res, rej) => {
      ProcessM.create({
        name: this.procName,
        status: 'RUNNING',
        path: this.procPath,
        args,
      }).then((proc) => {
        spawn(`build/${this.procPath}`, [proc._id])
          .on('close', res);
      }).catch(rej);
    });

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
      this.execute(proc);
    });
  }
}
