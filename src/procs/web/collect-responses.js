import {ChildTemplate} from '../child-process';

export default class CollectResponses extends ChildTemplate {
  execute(proc) {
    console.log(proc.args);
  }
}