'use strict';

var express = require('express');
var controller = require('./friendslist.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/gettingFriends/:id', auth.isAuthenticated(), controller.gettingFriends);
router.get('/gettingVideoCallFriends/:id',auth.isAuthenticated(), controller.gettingVideoCallFriends);
router.get('/gettingStatusFriends/:id', auth.isAuthenticated(), controller.gettingStatusFriends);
router.get('/gettingFriendsdata/:id', auth.isAuthenticated(), controller.gettingFriendsdata);

router.get('/gettingInvitations/:id', auth.isAuthenticated(), controller.myInvitations);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/priorityFriends', controller.priorityFriends);
router.post('/creatingFriends', controller.creatingFriends);
// router.post('/priorityFriends', controller.priorityFriends);
router.post('/updatingAccept', controller.updatingAccept)
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/deletecontact',controller.deletecontact);
router.post('/hideshow',controller.hideShow);
router.post('/activehideusers',controller.activeusers);
router.post('/hideuser',controller.hideUser);
router.post('/incognitochat',controller.INCOGNITOCHAT);
router.post('/videocall',controller.videocall);
router.post('/unhideall',controller.unhideuseall);
router.post('/blockedcontacts',controller.blockcontactlist);
module.exports = router;