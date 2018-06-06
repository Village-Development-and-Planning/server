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
          _id: user._id,
        }, user.passphrase || 'none');
      }).catch((err) => cb(err));
    }
  }
));

const passportMiddleware = passport.authenticate('digest', {session: false});

const setCookie = (req, res, next) => {
  if (req.user) {
    const cookie = jwt.sign(req.user, Constants.jwt.secret);
    res.cookie(Constants.cookieName, cookie);
  }
  next();
};

const clearCookie = (req, res, next) => {
  res.clearCookie(Constants.cookieName);
  res.json({message: 'Logged out'});
};

const signIn = [passportMiddleware, setCookie];
export {signIn, clearCookie, setCookie};
