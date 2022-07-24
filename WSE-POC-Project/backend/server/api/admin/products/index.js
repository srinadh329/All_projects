'use strict';

var express = require('express');
var controller = require('./products.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);// To get products list 
router.get('/list', controller.listOfProducts);// To get list of wse products
router.get('/countryproducts', controller.cntprdlist);//To get list of country products
router.get('/:groupid', controller.show);//To get products in a group
router.post('/add',auth.isAuthenticated(), controller.addProduct); // To add products in group
router.post('/countryprd',auth.isAuthenticated(), controller.countryProduct); // To maintain country products
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;