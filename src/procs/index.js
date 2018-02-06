import ChildProc from './child-process';

export const CollectResponses = new ChildProc({
  procName: 'CollectResponses',
  procPath: 'web/collect-responses',
});

export default {CollectResponses};