'use strict';

var express = require('express');
var controller = require('./currency and rates.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();
router.get('/groupcurrency/:groupid', controller.getCurrenciesInGroup);//To get group currencies
router.get('/country/currencies', controller.currenciesGetting);//To get currencies for country 
router.post('/currencymaintainance',auth.isAuthenticated(),controller.currencyMaintainance);//To miantain currencies
router.post('/ratemaintainance',auth.isAuthenticated(),controller.ratesMaintainance);//To miantain currency rates
router.get('/rates',controller.getRates)//To get currency rates
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
