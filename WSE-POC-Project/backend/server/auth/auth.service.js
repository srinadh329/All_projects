'use strict';


var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var validateJwt = expressJwt({ secret: config.secrets.session });
var client = config.client;

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function (req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function (req, res, next) {
      // console.log("999999999",req)
      client.query(`select u.userid,u.brnid,u.usrnam,u.loginid,r.roltyp,u.status
                    FROM ADMIN.USRMAS u join admin.roles r on u.usrole = r.roleid  WHERE u.loginid = $1`, [req.user._id], function (err, user) {
        if (err) {return next(err); }
        if (!user) return res.status(401).send('Unauthorized');
        req.user = user.rows[0];
        next();
      })
    });
}
function getBodyInfo(){
  return compose()
  .use((req,res,next)=>{
    // console.log(res)
    next();
  })
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
function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresIn: '1d' });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) return res.status(404).json({ message: 'Something went wrong, please try again.'});
 // console.log(req.user)
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.getBodyInfo = getBodyInfo;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
