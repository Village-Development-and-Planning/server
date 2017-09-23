const jwt = require('express-jwt');
const constants = require('../config/Constants');

module.exports = function(app) {
  app.use(jwt(constants.jwt));
};
