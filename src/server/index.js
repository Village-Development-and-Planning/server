const express = require('express');
const http = require('http');

// Create the server and load the components.
const app = express();

// 1. Connect to DB (doesn't need the app object)
require('./database');

// 2.1 Setup cookies
require('./cookies')(app);

// 2.2. Add security to all end points.
require('./security')(app);

// 2.3. Setup body-parser.
require('./body-parser')(app);

// 10. Setup the routes:
require('./routes')(app);

// 99. Setup error-handling
require('./error-handler')(app);

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

let server = http.createServer(app);

server.listen(port);
server.on('error', onError);

/**
 * Normalize a port into a number, string or false.
 * 
 * @param {any} val 
 * @return {String|Number|Boolean}
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

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
 * Event listener for HTTP server "error" event
 * 
 * @param {Error} error 
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
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

