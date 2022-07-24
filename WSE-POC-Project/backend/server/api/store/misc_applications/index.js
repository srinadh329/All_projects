'use strict';

var express = require('express');
var controller = require('./misc_applications.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();
router.get('/getproducts/:branchid', controller.getproducts);
router.post('/getchargesbyproducts', controller.getchargesbyproducts);
router.post('/getactiveproducts', controller.getactiveproducts);
router.post('/sortremittance', controller.getremitancestatus);


router.post('/get/allapplications', controller.index);
router.post('/get/pendingapplications', controller.pendingapplications);

router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(),controller.create);
router.post('/miscauthozie',auth.isAuthenticated(), controller.authorize);
router.patch('/:id',auth.isAuthenticated(), controller.update);

module.exports = router;