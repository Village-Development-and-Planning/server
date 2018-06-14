const jwt = require('express-jwt');
const constants = require('../config/Constants');

import express from 'express';
import {signIn, clearCookie} from './authentication';
import roles from './roles';
import csrf from './csrf';

const secRouter = new express.Router();


const jwtOpts = Object.assign({
  getToken(req) {
    if (
      req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.slice(6).trim();
    } else if (req.cookies && req.cookies[constants.cookieName]) {
      return req.cookies[constants.cookieName];
    } else {
      return null;
    }
  },
}, constants.jwt);

secRouter.use(
  jwt(jwtOpts),
  (req, res, next) => {
    return (req.user ? next('router') : next({name: 'UnauthorizedError'}));
  },
  (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      next();
    } else {
      next(err);
    }
  },
  ...signIn,
);


module.exports = function(app) {
  app.use(secRouter);
  app.use(roles);
  app.get('/auth/out', clearCookie);
  app.get('/auth', (req, res, next) => {
    res.json(req.user);
  });
  app.use(csrf);
};
