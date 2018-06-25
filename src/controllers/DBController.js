import BaseController from './BaseController';

/**
* Controller class for root access to DB
*
* @class DBController
*/
class DBController extends BaseController {
  find(M) {
    let {query, select, limit} = this.req.body;
    let promise;
    if (query) {
      promise = M.find(query);
      if (select) promise = promise.select(select);
      if (!limit) limit = 10;
      promise = promise.limit(10);
    } else {
      promise = Promise.reject({message: 'No query given', status: 400});
    }
    this.renderer.renderPromise(promise);
  }

  update(M) {
    const {query, update, options} = this.req.body;
    let promise;
    if (query && update) {
      promise = M.update(query, update, options || {});
    } else {
      promise = Promise.reject({message: 'No query/update given', status: 400});
    }
    this.renderer.renderPromise(promise);
  }

  create(M) {
    const {query} = this.req.body;
    let promise;
    if (query) {
      promise = M.create(query);
    } else {
      promise = Promise.reject({message: 'No query given', status: 400});
    }
    this.renderer.renderPromise(promise);
  }

  remove(M) {
    const {query, options} = this.req.body;
    let promise;
    if (query) {
      promise = M.remove(query);
      if (options) promise = promise.setOptions(options);
    } else {
      promise = Promise.reject({message: 'No query given', status: 400});
    }
    this.renderer.renderPromise(promise);
  }
};
export default DBController;
