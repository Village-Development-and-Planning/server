import EntityController from './EntitiyController';
import procs from '../procs';
import Process from '../models/Process';

/**
 * Process controller.
 * 
 * @class ProcessController
 * @extends {EntityController}
 */
class ProcessController extends EntityController {

  _parseEntity(obj) {
    if (!procs[obj.name]) {
      return null;
    }

    return this._filterObject(
      obj,
      'name args',
    );
  }

  _create(query) {
    return procs[query.name].execute(query.args).createP
  }
}

Object.assign(ProcessController, {
  collection: Process,
  entityName: 'Process',
  routeName: 'processes',

  _findFields: 'name path status modifiedAt',
});
module.exports = ProcessController;
