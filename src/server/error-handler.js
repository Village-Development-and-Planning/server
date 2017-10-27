module.exports = function(app) {
  // Remove console log in production mode
  if (process.env.NODE_ENV == 'production') {
    (console.log = () => {});
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
        error: err,
        stack: err.stack.split('\n'),
      });
    });
  }


  // production error handler
  // no stacktraces leaked to user
};
