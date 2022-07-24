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
const fileUpload = require('express-fileupload');
const responseTime = require('response-time')

module.exports = function(app) {
  var env = app.get('env');

  app.use(compression());
  // app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(bodyParser.json());
  app.use(bodyParser.json({limit: "50mb"})); // For the request entity too large(413 error code)
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(fileUpload());
  const cors = require('cors');
  app.use( '/photos',express.static('../backend/uploads/photos'));
  app.use( '/ticketphotos',express.static('../backend/uploads/ticketphotos'));
  //app.use( '/certifications',express.static('../backend/uploads/certifications'));
  //app.use( '/uploads/resumes',express.static('../backend/uploads/resumes'));
  app.use( '/uploads/files',express.static('../backend/uploads/files'));
  app.use( '/excel',express.static('../backend/uploads/excel'));
  //app.use( '/uploads/video',express.static('../backend/uploads/videos'));

  
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
   
  }));
  app.use(responseTime());
  app.use(cors());

  // Persist sessions with mongoStore
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy

  
  if ('production' === env) {
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
