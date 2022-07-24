/**
 * Main application file
 */
'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var helmet = require('helmet');
var xss = require('xss-clean');
var rateLimiter = require('express-rate-limit');
var hpp = require('hpp');

var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io'
});
require('./config/express')(app);

// Set Security Header
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate Limiting
const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 10
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s, in %s mode', config.ip,config.port, app.get('env'));
});
// Expose app
exports = module.exports = {
  app:app,
  socket:socketio
}
require('./routes')(app);
require('./config/socketio')
