'use strict';

var express = require('express');
var controller = require('./dubai_police.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/searchfine', controller.index);
router.get('/:id', controller.show);
router.post('/payfine', auth.isAuthenticated(), controller.authorize);

module.exports = router;