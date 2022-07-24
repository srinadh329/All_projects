/**
 * Main application file
 */
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');



// Connect to database  using mongoose  , useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true 
// var client = mqtt.connect('mqtt://172.16.1.25');

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);

// mosca code end
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io'
});
const socket=socketio

require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);
 app.use('/uploads', express.static('./uploads'));

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


// Expose app
exports = module.exports = app;
exports.socket = socket

