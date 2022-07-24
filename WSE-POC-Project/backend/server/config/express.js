/**
 * Express configuration
 */

'use strict';
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var config = require('./environment');
var passport = require('passport');
var session = require('express-session');

module.exports = function(app) {
  var env = app.get('env');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  const cors = require('cors');
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
  }));
  app.use(cors());  
  if ('production' === env) {
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
