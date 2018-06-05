const Constants = require('../config/Constants');

/**
 * Inspects roles based on the route
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export default function rolesMiddleware(req, res, next) {
  if (req.path.startsWith('/auth')) {
    next();
    return;
  }
  const user = req.user;
  const rolesHash = {};
  for (let role of user.roles) {
    rolesHash[role.toLowerCase()] = 1;
  }
  for (let sec of Constants.routeSecurity) {
    if (
      req.path.startsWith(sec.prefix)
      && (
        !sec.method
        || (req.method.toLowerCase() === sec.method)
      )
    ) {
      const roles2Check = sec.roles.split(' ');
      for (let role of roles2Check) {
        if (rolesHash[role]) {
          next();
          return;
        }
      }
    }
  }
  next({status: 401, message: 'Unauthorized'});
}
