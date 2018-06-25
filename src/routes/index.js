module.exports = function(app) {
  app.use('/cms', require('./cms'));
  app.use('/app', require('./app'));
  app.use('/db', require('./db'));
};
