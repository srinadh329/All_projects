'use strict';

var express = require('express');
var controller = require('./groupmember.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/getgroups2/:id',controller.getgroups2);

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/getInvitations/:id', controller.getInvitations);
router.get('/mygroups/:id',auth.isAuthenticated(), controller.getgroups);
router.get('/gInfor/:gid/:id',controller.selectedGroup);
router.get('/gettingCount/:id', controller.gettingCount);
router.get('/gettingMembers/:id', controller.gettingMembers);
router.get('/viewMembers/:id', controller.viewMembers);
router.post('/', controller.create);
router.post('/addingMembers',auth.isAuthenticated(),controller.addingMembers);
router.post('/updateStatus', controller.updateMemberStatus);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('/leaveGroup/:did/:gid/:id', controller.leaveGroup);
router.post('/muteBadge', controller.muteBadge);
router.post('/starStatus', controller.starStatus);
router.post('/groupblockstatus', controller.groupblockstatus);
module.exports = router;