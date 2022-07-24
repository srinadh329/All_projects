'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
///////////////////////////////////////////////////////////////////////////

const io = require('socket.io');

///////////////////////////////////////////////////////////////////////////
var responseValue;

var router = express.Router();

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.status(401).json(error);
    if (!user) return res.status(404).json({ message: 'Something went wrong, please try again.' });
    var USER = {}
    USER.token = auth.signToken(user._id, user.role);
    USER.user = user;
    res.send(USER);
    console.log("TOKEN", USER.user);
  })(req, res, next)
});

module.exports = router;