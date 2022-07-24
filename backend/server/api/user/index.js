'use strict';

var express = require('express');
var controller = require('./user.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/unique/:id', controller.show);
router.get('/organization/:org_id', controller.getorgusers);
router.get('/normalusers/:role_id', controller.getusers);
router.get('/:EmailId',auth.isAuthenticated(), controller.index);
router.get('/orgsearch/:EmailId/:org_id',auth.isAuthenticated(), controller.orgsearch);
router.get('/checkUserExists/:emailid',controller.checkUserExists);
router.post('/saveuser', controller.create);
router.post('/endvideocall',controller.endvideocall);
router.post('/update', controller.updateStatus);
router.post('/checkuser', controller.checkUser);
router.post('/forgetpwd', controller.forgetpwd);
router.post('/links', controller.links1)
router.post('/forgotPassEmail', controller.forgotPassEmail);
router.post('/changeForgotPass', controller.forgotPassChange);
router.post('/verifyotpforgot', controller.otpCheckforgot);
router.put('/change/password', auth.isAuthenticated(), controller.changePassword);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.put('/updateprofile/:id', auth.isAuthenticated(), controller.updateprofile);
router.post('/chatingOff',controller.chatofff);
router.post('/tabcloseing',controller.tabclose);
router.post('/refreshpage',controller.refreshevent);
router.post('/chatoffbutton',controller.chatingoffbutton);
module.exports = router;
