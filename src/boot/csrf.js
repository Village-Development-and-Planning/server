const constants = require('../config/Constants');

/**
 * Checks Referer and Origin header when request method is not GET.
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export default function(req, res, next) {
  if (req.method === 'GET' || !req.url.startsWith('/cms')) {
    next(); return;
  }
  let str = req.get('Origin') || req.get('Referer');
  if (str && str.startsWith(`${constants.origin}`)) {
    next(); return;
  }
  next({status: 403, message: 'CSRF Error'});
};
