'use strict';

var express = require('express');
var controller = require('./call.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/fetchcalllogs/:id',controller.fetchcalllogs);
router.post('/', controller.create);
router.post('/solocallreject',controller.solocallreject1);
router.post('/solovideocallwaiting',controller.solovideocallwaiting);
router.post('/solovideocallreceivererror',controller.solovideocallreceivererror)
router.post('/solovideocallAccept',controller.solovideocallAccept)
router.post('/solovideocallReject',controller.solovideocallReject);
router.post('/solovideocallTimeout',controller.solovideocallTimeout);
router.post('/fetchroomid',controller.fetchroomid)
router.post('/solovideocallend',controller.solovideocallend)
router.post('/invalidCallRedirect',controller.invalidCallRedirect)
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;