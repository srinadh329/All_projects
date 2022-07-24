/**
 * Express configuration
 */

'use strict';

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
const cors = require('cors');
module.exports = function(app) {
  var env = app.get('env');

  app.use(cors());
  app.use(compression());
  // app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(bodyParser.json());
  app.use(bodyParser.json({limit: "50mb"})); // For the request entity too large(413 error code)
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(cors());
  console.log(express.static(__dirname + '/uploads'));
  app.use('/uploads', express.static('./uploads'));
  app.use('/convertedhtml', express.static('./convertedhtml'));
  app.use('/convertimages', express.static('./convertimages'));
  app.use('/signature', express.static('./signature'));
  app.use('/photo', express.static('./photo'));
  app.use('/stamp', express.static('./stamp'));

    // Persist sessions with mongoStore
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      db: 'docintact'
    })
  }));
  
  if ('production' === env) {
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};