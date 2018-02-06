import ChildProc from './child-process';

export const CollectResponses = new ChildProc({
  procName: 'collectResponses',
  procPath: 'web/collect-responses',
});
