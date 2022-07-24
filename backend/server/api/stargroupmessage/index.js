'use strict';

var express = require('express');
var controller = require('./stargroupmessage.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/getStarGroupMessages/:gid/:id',controller.getStarGroupMessages);
router.post('/', controller.create);
router.post('/makeStarred', controller.makeStarred);
router.put('/:id', controller.update);
router.put('/makeUnStarGroupMessage/unStar', controller.makeUnStarGroupMessage);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;