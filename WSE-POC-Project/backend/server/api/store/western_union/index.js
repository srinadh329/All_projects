'use strict';

var express = require('express');
var controller = require('./western_union.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/searchbymtcn', controller.index);
router.get('/:id', controller.show);
router.post('/wuauthorize', auth.isAuthenticated(), controller.authorize);

module.exports = router;