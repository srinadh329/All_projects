'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

process.env.AWS_SDK_LOAD_CONFIG = true;

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 4000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'secret key'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options


  // facebook: {
  //   clientID: process.env.FACEBOOK_ID || '655240454875578',
  //   clientSecret: process.env.FACEBOOK_SECRET || '52ec2972fe33c2345828843c3c580420',
  //   callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback'
  //   // callbackURL:  'https://nodedevhrms.webchatbot.co.uk/auth/facebook/callback'

  // },

  // twitter: {
  //   clientID: process.env.TWITTER_ID || 'miGcMPVLrQ7R3Cl7dbXMTGAHj',
  //   clientSecret: process.env.TWITTER_SECRET || 'ofrMAkfUXSXwZ19imph22n7wJMfhmKm0EKAIrrKi3xvYzMq3Ff',
  //   callbackURL: (process.env.DOMAIN || '') + '/auth/twitter/callback'
  // },

  // google: {
  //   clientID: process.env.GOOGLE_ID || '62093108246-1i88lg1rsv252a5t07d4606dh7ql9c9u.apps.googleusercontent.com',
  //   clientSecret: process.env.GOOGLE_SECRET || 'Ni7mN8l_ogp8DuBbff10z-7f',
  //   callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
  // }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {}
);
