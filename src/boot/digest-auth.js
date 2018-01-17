const passport = require('passport');
const Digest = require('passport-http').DigestStrategy;
const jwt = require('jsonwebtoken');
const Constants = require('../config/Constants');

passport.use(new Digest(
  {qop: 'auth'},
  (username, cb) => {
    if (username == 'ptracking') {
      return cb(null, {name: 'ptracking', role: 'admin'}, 'vaazhvuT');
    } else {
      cb(null, false);
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
};
