module.exports = function(app) {
  app.use('/cms', require('./cms'));

  // redirect the home to /cms
  app.get('/', function(req, res) {
    res.redirect('/cms');
  });
};
