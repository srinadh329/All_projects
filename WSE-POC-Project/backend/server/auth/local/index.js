'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var SimpleCrypto = require("simple-crypto-js").default;

//passport authentication on login
var router = express.Router();
router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) { return res.status(201).json(error); }
    if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'});
    if (user.message) return res.status(201).json({message: user.message});
    else {
      var token = auth.signToken(user.loginid);
      // var simpleCrypto = new SimpleCrypto('Fx_User_Info000')
      // let userStringfied=JSON.stringify(user);
      // let text = simpleCrypto.encrypt(userStringfied);
      return res.json({user:user,token: token});
    }
     })(req, res, next)
});
module.exports = router;
