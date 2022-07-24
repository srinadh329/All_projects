'use strict';

var express = require('express');
var controller = require('./userprofile.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/get/current', auth.isAuthenticated(), controller.CurrentUserInfo);
router.get('/:id', controller.show);

router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.post('/saveuser', auth.isAuthenticated(), controller.create);
router.put('/updateprofile/:id', auth.isAuthenticated(), controller.updateprofile);
router.post('/OrgLogo',  auth.isAuthenticated(),controller.OrgLogo);
router.post('/chatcontactbioshow',controller.chatlistbioshow);

module.exports = router;