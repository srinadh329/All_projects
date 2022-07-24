'use strict';

var express = require('express');
var controller = require('./tt.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.get('/getbanks',auth.isAuthenticated(),controller.getCreditBanks);
router.get('/:id', auth.isAuthenticated(),controller.show);
router.post('/',auth.isAuthenticated(), controller.create);
router.post('/authorizett',auth.isAuthenticated(),controller.authorizeTT);
router.post('/get/allapplications',auth.isAuthenticated(), controller.index);
router.post('/:countryid/:currency/:branchid',auth.isAuthenticated(),controller.getProductBasedonCountry);
router.post('/get/createdapplications',auth.isAuthenticated(), controller.createdapplications);
router.put('/:id',auth.isAuthenticated(), controller.update);
router.patch('/:id',auth.isAuthenticated(), controller.update);
router.delete('/:id',auth.isAuthenticated(), controller.destroy);
router.get('/:searchValue/:perPage/:page',auth.isAuthenticated(), controller.getttList);


module.exports = router;