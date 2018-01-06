import Process from '../../data/models/Process';
/**
 * Process abstraction for worker.
 * 
 * Responds to process lifecycle and updates model
 */
export default class Proc {
  constructor(cmd, ...args) {
    return Process.create({
      name: cmd, args,
      status: 'RUNNING',
    });
  }
}
