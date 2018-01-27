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
          name: 'Dev Admin',
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
        }, user.passphrase);
      }).catch((err) => cb(err));
    }
  }
));

module.exports = (app, path) => {
  app.get(
    path,
    passport.authenticate('digest', {session: false}),
    (req, res) => {
      res.cookie('ptracking_jwt', jwt.sign(req.user, Constants.jwt.secret));
      if (req.query.referrer) {
        res.redirect(req.query.referrer);
      } else {
        res.json(req.user);
      }
    }
  );
  app.get(
    `${path}/out`,
    (req, res) => {
      res.clearCookie('ptracking_jwt');
      res.json({});
    }
  );
};
