'use strict';

var express = require('express');
var controller = require('./userstatus.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/fetchsolostatus/:id', controller.fetchsolostatus);
router.post('/', controller.create);
router.post('/fetchstatus/', controller.fetchstatus);
router.post('/updateSeenStatus/',controller.updateSeenStatus);
router.post('/updatelikes/',controller.updatelikes);
router.post('/updatecomments/',controller.updatecomments)
router.post('/mutestatus/',controller.mutestatus)
router.post('/unmutestatus/',controller.unmutestatus)
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;