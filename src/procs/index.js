import ChildProc from './child-process';

export const CollectResponses = new ChildProc({
  procName: 'CollectResponses',
  procPath: 'web/collect-responses',
});
export const ExportResponses = new ChildProc({
  procName: 'ExportResponses',
  procPath: 'web/export-responses',
});

export default {CollectResponses, ExportResponses};
