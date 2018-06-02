import ProcessM from '../models/Process';
import SurveyM from '../models/Survey';
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

    var updateProcessToSurvey = function (surveyId, status, processId, processType){
      SurveyM.findById(surveyId, function(err, survey) {
        if (!survey)
        {
          return 'Could not load Document';
        }
        else {
          if (processType === 'CollectResponses'){
            if (status === 'RUNNING'){
              survey.set('collectProcessId', processId);
            } else {
              survey.set('collectProcessId', '');
            } 
          }
          else if (processType === 'ExportResponses'){
            if (status === 'RUNNING'){
              survey.set('collectExportId', processId);
            } else {
              survey.set('collectExportId', '');
            } 
          }
          survey.save().then((resp) => {
            return resp;
          }).catch((err) => {
            return err;
          });
        }
      });
      
    };
    
    const promise = new Promise((res, rej) => {
      createP.then(
        (proc) => {
          updateProcessToSurvey(proc.args, proc.status, proc._id, proc.name);
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
            proc.endDate = new Date();
            updateProcessToSurvey(proc.args, proc.status, proc._id, proc.name);
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
    ).catch((err) => {
      console.error('Error: ', err);
    });
  }
}
