'use strict';

var express = require('express');
var controller = require('./transaction.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/get/allapplications/:branchid',auth.isAuthenticated(), controller.index);
// router.post('/get/pendingapplications',auth.isAuthenticated(),controller.pendingapplications);
router.get('/:id',auth.isAuthenticated(), controller.show);
router.get('/',auth.isAuthenticated(),controller.getBanks);
router.get('/checkaccno/:id', auth.isAuthenticated(),controller.checkaccno);
router.get('/:createduser/:branchid/:prodid',controller.getCurrencyRatesBasedONProducts);
router.post('/',auth.isAuthenticated(), controller.create);
router.post('/authorize',auth.isAuthenticated(),controller.approvetransaction);
router.post('/reject/authorize',auth.isAuthenticated(),controller.rejecttransaction);
router.put('/:id',auth.isAuthenticated(), controller.update);
router.patch('/:id',auth.isAuthenticated(), controller.update);
router.delete('/:id',auth.isAuthenticated(), controller.destroy);
router.get('/:searchValue/:perPage/:page',auth.isAuthenticated(), controller.gettransactionList);


module.exports = router;