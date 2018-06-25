import Renderer from '../lib/utils/render';

/**
 * Dispatch action to given controller
 * @param {Class.<BaseController>} Controller
 * @param {String} method name to call
 * @return {Function.<ExpressMiddleware>}
 */
export default function dispatcher(Controller, method, ...args) {
  return (req, res, next) => {
    const renderer = new Renderer({res, next});
    (new Controller({req, renderer}))
      .dispatch(method, ...args);
  };
}
