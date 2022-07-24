'use strict';

var express = require('express');
var controller = require('./group.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id', controller.checkingGroupExist);
router.get('/fetchprofilepic/:id',controller.groupprofilepic);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.put('/rename/name', controller.renameGroup);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
// router.post('/groupsMail', auth.isAuthenticated(), controller.groupsMail);

module.exports = router;