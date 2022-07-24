'use strict';

var express = require('express');
var controller = require('./fx.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/get/allapplications', controller.index);
router.get('/:id',auth.isAuthenticated(), controller.show);
router.post('/',auth.isAuthenticated(), controller.create);
router.post('/authorreject',controller.approveorrejectTransaction);
router.put('/:id',auth.isAuthenticated(), controller.update);
router.patch('/:id',auth.isAuthenticated(), controller.update);
router.delete('/:id',auth.isAuthenticated(), controller.destroy);
router.get('/:searchValue/:perPage/:page',auth.isAuthenticated(), controller.getfxList);


module.exports = router;