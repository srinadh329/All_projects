'use strict';

var express = require('express');
var controller = require('./invitation.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', auth.isAuthenticated(), controller.getFriends);
router.get('/getme', controller.show);
router.post('/GroupinvitationExpiry',controller.GroupinvitationExpiry);
router.post('/mailstatus', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/invitationExpiry', controller.invitationExpiry);
module.exports = router;