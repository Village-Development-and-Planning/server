const passport = require('passport');
const Digest = require('passport-http').DigestStrategy;
const jwt = require('jsonwebtoken');
const Constants = require('../config/Constants');

import User from '../models/User';

passport.use(new Digest(
  {qop: 'auth'},
  (username, cb) => {
    if (username === Constants.admin.username) {
      return cb(
        null,
        {
          username: Constants.admin.username,
          name: 'Admin',
          roles: ['root']},
        Constants.admin.passphrase
      );
    } else {
      User.findOne({username})
      .then((user) => {
        if (!user) cb(null, false);
        cb(null, {
          username: user.username,
          name: user.name,
          roles: user.roles,
        }, user.passphrase || 'none');
      }).catch((err) => cb(err));
    }
  }
));

const passportMiddleware = passport.authenticate('digest', {session: false});

/**
 * Inspects roles based on the route
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
function rolesMiddleware(req, res, next) {
  if (req.path.startsWith('/auth')) {
    next();
    return;
  }
  const user = req.user;
  const rolesHash = {};
  for (let role in user.roles) {
    rolesHash[role.toLowerCase()] = 1;
  }

  for (let sec of Constants.routeSecurity) {
    if (req.path.startsWith(sec.prefix)) {
      const roles2Check = sec.roles.split(' ');
      for (let role in roles2Check) {
        if (rolesHash[role]) {
          next();
          return;
        }
      }
    }
  }
  next({status: 401, message: 'Unauthorized'});
}

const setCookie = (req, res, next) => {
  res.cookie('ptracking_jwt', jwt.sign(req.user, Constants.jwt.secret));
  next();
};

const signIn = [passportMiddleware, rolesMiddleware, setCookie];
export {signIn};
