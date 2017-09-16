var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var constants = require('./other/Constants');
var jwt = require('express-jwt');

// import so the schema is initially created. 
var Survey = require('./data/models/Survey');
var Question = require('./data/models/Question');
var Option = require('./data/models/Option');
var Surveyor = require('./data/models/Surveyor');

// Remove console log in production mode
if (process.env.NODE_ENV == "production") {
      console.log = function () { };
}

// connect to mongoose
var options = constants.db;

mongoose.connect(options.connectionString, options.connectionOptions, function (err) {
  if (err)
    console.log('Error connecting to the DB: ' + err);
});

// Routes
var cms = require('./routes/cms');
var mappingApp = require('./routes/MappingApp');

var app = express();

// add security to all end points
app.use(jwt(constants.jwt))

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());

// cms routes
app.use('/cms', cms);

// app data upload/download routes
app.use('/app/mapping', mappingApp);

// redirect the home to /cms
app.get('/', function (req, res) {
  res.redirect('/cms');
});

// error handlers are given at the last of the stack. 

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });

}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}