'use strict';

var express = require('express');
var controller = require('./emails.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/organizationemails/:org_id', controller.getorgemails);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/organizationemailscreate/:org_id', controller.createorgemails);
router.put('/change/password',controller.changepassword);
module.exports = router;