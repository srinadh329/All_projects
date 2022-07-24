/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var cluster = require('cluster');
var morgan = require('morgan');
var config = require('./config/environment');
var sticky = require('sticky-session');


// Connect to database
// mongoose.connect(config.mongo.uri, config.mongo.options);
// mongoose.connection.on('error', function(err) {
// 	console.error('MongoDB connection error: ' + err);
// 	process.exit(-1);
// 	}
// );
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);

var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io'
});
// const redisAdapter = require('socket.io-redis');
// socketio.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(8081, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// let workers = [];

// /**
//  * Setup number of worker processes to share port which will be defined while setting up server
//  */
// const setupWorkerProcesses = () => {
//    // to read number of cores on system
//    let numCores = require('os').cpus().length;
//    console.log('Master cluster setting up ' + numCores + ' workers');

//    // iterate on number of cores need to be utilized by an application
//    // current example will utilize all of them
//    for(let i = 0; i < numCores; i++) {
//        // creating workers and pushing reference in an array
//        // these references can be used to receive messages from workers
//        workers.push(cluster.fork());

//        // to receive messages from worker process
//        workers[i].on('message', function(message) {
//            console.log(message);
//        });
//    }

//    // process is clustered on a core and process id is assigned
//    cluster.on('online', function(worker) {
//        console.log('Worker ' + worker.process.pid + ' is listening');
//    });

//    // if any of the worker process dies then start a new one by simply forking another one
//    cluster.on('exit', function(worker, code, signal) {
//        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//        console.log('Starting a new worker');
//        cluster.fork();
//        workers.push(cluster.fork());
//        // to receive messages from worker process
//        workers[workers.length-1].on('message', function(message) {
//            console.log(message);
//        });
//    });

// };

// /**
//  * Setup an express server and define port to listen all incoming requests for this application
//  */
// const setUpExpress = () => {
//     // create server
//     //app.server = http.createServer(app);

//     // logger
//     app.use(morgan('tiny'));

//     // parse application/json
//    /* app.use(bodyParser.json({
//         limit: '2000kb',
//     }));*/
//     app.disable('x-powered-by');

//     // routes
//     //setRouter(app);

//     // start server
//     server.listen(config.port, config.ip, function () {
//       console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
//     });

//     // in case of an error
//     app.on('error', (appErr, appCtx) => {
//         console.error('app error', appErr.stack);
//         console.error('on url', appCtx.req.url);
//         console.error('with headers', appCtx.req.headers);
//     });
// };

// /**
//  * Setup server either with clustering or without it
//  * @param isClusterRequired
//  * @constructor
//  */
// const setupServer = (isClusterRequired) => {

//     // if it is a master process then call setting up worker process
//     if(isClusterRequired && cluster.isMaster) {
//         setupWorkerProcesses();
//     } else {
//         // to setup server configurations and share port address for incoming requests
//         setUpExpress();
//     }
// };
// setupServer(true);
// if (!sticky.listen(server, 9000)) {
//     // Master code
//    server.once('listening', function() {
//       console.log('server started on 9000 port');
//    });
//   if (cluster.isMaster) {                                                                                                                                                                                                                                                                                                                   
//   console.log('Master')
//       // Count the machine's CPUs
//       var cpuCount = require('os').cpus().length;
  
//       // Create a worker for each CPU
//       for (var i = 0; i < cpuCount; i += 1) {
//           cluster.fork();
//       }
  
//       // Listen for dying workers
//       cluster.on('exit', function (worker) {
  
//           // Replace the dead worker, we're not sentimental
//           console.log('Worker %d died :(', worker.id,')');
//                       cluster.fork();
  
//       });
  
//   // Code to run if we're in a worker process
//   }
//   } else {
//     // Worker code
//    app.get('/', function (request, response) {
//            console.log('Request to worker %d', cluster.worker.id);
//            response.send('Hello from Worker ' + cluster.worker.id);
//        });
//   }

// Expose app
exports = module.exports = app;