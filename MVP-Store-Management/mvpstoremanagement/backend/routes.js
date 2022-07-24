/**
 * Main application routes
 */

module.exports = function (app) {
  app.use('/api/users', require('./api/user'));
  app.use('/api/countries', require('./api/countries'));
  app.use('/api/states', require('./api/states'));
  app.use('/api/cities', require('./api/cities'));
  app.use('/api/userinfo', require('./api/userinfo'));
  app.use('/api/roles', require('./api/roles'));
  app.use('/auth', require('./auth'));
   
};