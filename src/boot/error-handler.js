module.exports = function(app) {
  if (process.env.NODE_ENV == 'production') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        error: {
          message: err.message,
          details: err.details || {},
        },
      });
    });
  } else {
    // Dev mode will print stacktrace

    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        stack: err.stack && err.stack.split('\n'),
      });
    });
  }


  // production error handler
  // no stacktraces leaked to user
};
