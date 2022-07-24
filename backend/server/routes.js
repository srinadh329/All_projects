/**
 * Main application routes
 */

'use strict';

var path = require('path');
var express = require('express');
module.exports = function(app) {
  
  // app.use(express.static(path.join(__dirname, './static'))); // added for production

  // Insert routes below
  app.use('/api/userstatuss', require('./api/userstatus'));
  app.use('/api/stargroupmessages', require('./api/stargroupmessage'));
  app.use('/api/faqss', require('./api/faqs'));
  app.use('/api/emailss', require('./api/emails'));
  app.use('/api/roless', require('./api/roles'));
  app.use('/api/admins', require('./api/admin'));
  app.use('/api/starredmessages', require('./api/starredmessage'));
  app.use('/api/medias', require('./api/media'));
  app.use('/api/notifications', require('./api/notification'));
  app.use('/api/logs', require('./api/log'));
  app.use('/api/bookmarkss', require('./api/bookmarks'));
  app.use('/api/blogcontents', require('./api/blogcontent'));
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/contacts', require('./api/contact'));
  app.use('/api/followers', require('./api/follower'));
  app.use('/api/userfeeds', require('./api/userfeed'));
  app.use('/api/blogs', require('./api/blog'));
  app.use('/api/sharedgroups', require('./api/sharedgroup'));
  app.use('/api/groupmessages', require('./api/groupmessage'));
  app.use('/api/groups', require('./api/group'));
  app.use('/api/userreportss', require('./api/userreports'));
  app.use('/api/invitations', require('./api/invitation'));
  app.use('/api/userprofiles', require('./api/userprofile'));
  app.use('/api/links', require('./api/link'));
  app.use('/api/messages', require('./api/message'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/friendslists', require('./api/friendslist'));
  app.use('/api/groupmembers', require('./api/groupmember'));
  app.use('/api/calls', require('./api/call'));
  app.use('/auth', require('./auth'));

  // // newly added 
  // function getRoot(request, response) {
  //   response.sendFile(path.resolve('./static/index.html'));
  //   response.end();
  // }
  
  // //newly added
  // function getUndefined(request, response) {
  //   response.sendFile(path.resolve('./static/index.html'));
  //   response.end();
  // }
  
  // // Note the dot at the beginning of the path
  // app.use(express.static('./static/'));
  
  // app.get('/', getRoot);
  // app.get('/*', getUndefined);
};

