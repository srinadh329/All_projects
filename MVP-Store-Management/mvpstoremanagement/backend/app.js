/**
 * Main application file
 */

'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');



var app = express();
var server = require('http').createServer(app);

var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io'
});
app.set('socketio', socketio);
require('./config/express')(app);
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.ip,config.port, app.get('env'));
});
global.io = socketio;

 module.exports = {
  app:app,
  socket:socketio
}
require('./routes')(app);
require('./config/socketio')(socketio);

// const express=require('express')
// var app = express();
// var server = require('http').createServer(app);
// const port = 4000 
// server.listen(port,()=>{
//     console.log(`server running on ${port}`);
// })