'use strict';

var express = require('express');
var controller = require('./groups.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.get('/get/ccygroups', controller.getCcyGroups);//To get currency groups
router.get('/get/prdgroups', controller.getPrdGroups);// To get Product groups
router.get('/:id', controller.show);
router.post('/ccygroup',auth.isAuthenticated(),controller.currencyGroup);//To create currency group
router.post('/prdgroup',auth.isAuthenticated(),controller.productGroup);//To create product group
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
