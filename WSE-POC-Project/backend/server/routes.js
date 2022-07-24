/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {
  // Insert admin routes below 
  app.use('/api/usrmas',require('./api/admin/usrmas'))// to use users api
  app.use('/api/charges',require('./api/admin/charges'))// to use charges api
  app.use('/api/currencyandrates',require('./api/admin/currency and rates'))// to use currency and rates api
  app.use('/api/goldcard',require('./api/admin/goldcard'))// to use goldcard api
  app.use('/api/masters',require('./api/admin/masters'))// to use masters api
  app.use('/api/groups',require('./api/admin/groups'))// to use groups api
  app.use('/api/products',require('./api/admin/products'))// to use products api
  app.use('/api/adminreports',require('./api/admin/reports'))// to use admin reports api


  // Insert store routes below 
  app.use('/api/misc_applications',require('./api/store/misc_applications'))// to use national bond api
  app.use('/api/transactions',require('./api/store/transaction'))
  app.use('/api/tts',require('./api/store/tt'))
  app.use('/api/fxtrans',require('./api/store/fx'))
  app.use('/api/western_union',require('./api/store/western_union'))
  app.use('/api/dubai_police',require('./api/store/dubai_police'))
  app.use('/api/store_reports',require('./api/store/store_reports'))

  // Store

  // Insert auth routes below 
  app.use('/auth', require('./auth'));
};
