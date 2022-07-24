'use strict';

var express = require('express');
var controller = require('./store_reports.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/get/dailyreportsbybranch', controller.dailyreportsbybranch);
router.post('/get/reportsbyproduct', controller.reportsbyproduct);
router.post('/get/reportsbyuser', controller.reportsbyuser);
//DASHBOARD
router.get('/branchstatus/:branchid', controller.branchstatus);
router.post('/branchgraphs', auth.isAuthenticated(),controller.branchgraphs);
router.patch('/miscauthozie/:id', controller.authorize);
router.patch('/:id',auth.isAuthenticated(), controller.update);

module.exports = router;