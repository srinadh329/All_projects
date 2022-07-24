'use strict';

var express = require('express');
var passport = require('passport');
// const cors = require('cors');
var auth = require('../auth.service');
// var app = express();
// app.use(cors());
// var user = gapi.auth2.getAuthInstance().currentUser.get();
// var oauthToken = user.getAuthResponse().access_token;
// var xhr = new XMLHttpRequest();
// xhr.open('GET',
//   'https://people.googleapis.com/v1/people/me/connections' +
//   '?access_token=' + encodeURIComponent(oauthToken));
// xhr.send();

var router = express.Router();
router
  .get('/', passport.authenticate('google', {
    failureRedirect: '/signup',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    session: false
  }))

  .get('/callback', passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = router;