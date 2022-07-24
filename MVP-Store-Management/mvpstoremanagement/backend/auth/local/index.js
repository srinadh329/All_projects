'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var config = require('../../config/environment');


var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    console.log("req,",req.body)
    var error = err || info;
 let userInfo ={};
        userInfo.name = user.name;
        userInfo.email = user.email;
        userInfo.slug = user.slug;
        userInfo.update_profile = user.update_profile;
        userInfo.role = user.role;
        userInfo.roleId = user.role_id;
        userInfo.mobile_no = user.mobile_no;
        userInfo.id = user.id;
        userInfo.last_logout = user.last_logout;
        userInfo.verify_email = user.verify_email;
        userInfo.verify_phone = user.verify_phone;
        userInfo.permissions = user.permissions;
        // if(userInfo.role !== 'employee'  || userInfo.role !== 'admin') {
        //   userInfo.company_id =   user.company_id;
        //   userInfo.maintainer_name=user.maintainer_name;
        // }
    if (error) return res.status(401).json(error);
    if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'});
    if (user.message=="incorrectpassword") return res.status(404).json({message: 'Your password is invalid. Please try again.'});
    else if (user.message=="noaccount") return res.status(404).json({message: 'There is no account with this email'});
    else if (user.message=="inactive-user") return res.status(404).json({message: 'Your account is inactive. Contact your administrator to activate it.'});
    else {
      var token = auth.signToken(user.id,req.body.rememberMe, user.role);
              userInfo.token = token;
      return res.json({'user':userInfo});
    }
    

  })(req, res, next)
});

module.exports = router;