const jwt = require('express-jwt');
const constants = require('../config/Constants');

import {signIn} from './authentication';

const jwtOpts = Object.assign({
  getToken(req) {
    if (
      req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      req.skipCSRF = true;
      return req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.ptracking_jwt) {
      req.skipCSRF = false;
      return req.cookies.ptracking_jwt;
    } else {
      return null;
    }
  },
}, constants.jwt);

module.exports = function(app) {
  app.use(
    jwt(jwtOpts),
    (err, req, res, next) => {
      if (err.name === 'UnauthorizedError') {
        signIn(req, res, next);
      } else {
        next(err);
      }
    }
  );
};
