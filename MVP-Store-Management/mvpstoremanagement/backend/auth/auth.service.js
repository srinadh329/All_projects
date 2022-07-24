'use strict';


var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var validateJwt = expressJwt({ secret: config.secrets.session });
var client = config.client;
var key = "secretkey";
var crypto = require("crypto");


function encrypt(key, data) {
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
//===============================================================================================

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {

  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
              const query = 'SELECT  * FROM users WHERE id = ?' ;
              client.query(query, [req.user._id ], function (err, user) {
              
                if (err) return next(err);
                if (!user) return res.status(401).send('Unauthorized');
        
                req.user = user;
                next();
                  })  
     
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id,remember) {
  var days=remember?'7d':'1d';
  console.log("id",id,remember,days)
  return jwt.sign({ _id: id }, config.secrets.session, { expiresIn: days });
}
function signinterviewToken(id){
  return jwt.sign({ _id: id }, config.secrets.session);

}
/**
 * Set token cookie directly for oAuth strategies
 */
const url = require('url');
function setTokenCookie(req, res) {
  if (!req.user) return res.status(404).json({ message: 'Something went wrong, please try again.'});
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  var obj={} 
  if(req.user.type=="google"){
    obj={
      "token": token,
      "email":req.user.user.email,
     "usertype":"social"
    }
  }
  else if(req.user.type=="twittersignup"){
    obj={
      "name":req.user.username,
      "usertype":"social",
      "socialid":req.user.socialid,
    }
  }  else if(req.user.type=="twitter"){
    obj={
      "token": token,
      "email":req.user.user.email,
      "usertype":"social"
    }
  } else if(req.user.type=="facebook"){
    obj={
      "token": token,
      "email":req.user.user.email,
     "usertype":"social"
    }
  }
    else{
      obj={
        "token": token,
        "email":encrypt(key,req.user.email),
        "usertype":"social"
      }
    }
    res.redirect(url.format({
      pathname:config.frontendUrl+'/home/default',
      query:obj
    }));




  // res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.signinterviewToken = signinterviewToken;
