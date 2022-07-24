'use strict';

var express = require('express');
var controller = require('./groupmessage.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/clearData/:gid/:id', controller.clearData);
router.get('/addStarId/:id/:did', auth.isAuthenticated(),controller.addStarId)
router.post('/deleteGroupMessage', controller.deleteGroupMessage);
router.post('/', controller.create);
router.post('/groupMessages',auth.isAuthenticated(), controller.groupMessages)
router.post('/removeBadgeCount', controller.removeBadgeCount)
router.get('/getMessages/:id', auth.isAuthenticated(),controller.getMessages);
router.post('/getMessageschat', controller.getMessageschat);
router.post('/editMessage', controller.editGroupMessage);
router.put('/:id', controller.update);
router.put('/deleteStarStatus/delete', controller.deleteStarStatus);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;