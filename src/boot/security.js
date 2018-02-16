const jwt = require('express-jwt');
const constants = require('../config/Constants');

const httpDigest = require('./digest-auth');

const jwtOpts = Object.assign({
  getToken(req) {
    if (
      req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      req.skipCSRF = true;
      return req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.ptracking_jwt) {
      return req.cookies.ptracking_jwt;
    } else {
      return null;
    }
  },
}, constants.jwt);

module.exports = function(app) {
  app.use(
    jwt(jwtOpts).unless({
      path: ['/auth', '/auth/out'],
    }),
    (err, req, res, next) => {
      if (err.name === 'UnauthorizedError') {
        res.redirect('/auth?referrer=' + encodeURIComponent(req.originalUrl));
      } else {
        next(err);
      }
    }
  );
  httpDigest(app, '/auth');
};