'use strict';

var express = require('express');
var controller = require('./masters.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.get('/getcountries',auth.isAuthenticated(),controller.index);
router.get('/:id', controller.show);
router.post('/country',auth.isAuthenticated(), controller.countryMaintainance);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;