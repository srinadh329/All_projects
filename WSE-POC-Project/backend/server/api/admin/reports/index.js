'use strict';

var express = require('express');
var controller = require('./reports.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();
//Reports 
router.post('/onlineuser', controller.onlineUsers);//To get online user reports
router.post('/branchusers', controller.allBranchUsers);//To get all Branch user reports
router.post('/branch/transactions',controller.branchWiseTransactions) //To get branch wise transaction reports
router.post('/product/transactions',controller.productWiseTransactions) //To get product wise transaction reports
router.post('/user/transactions',controller.branchUserWiseTransactionsReports) //To get branch user wise transactionss reports
//Dashboard api's
router.get('/product/transcount',controller.productTransDashBoard) //To get product transaction count in dashborad
router.get('/branch/transcount',controller.branchTransDashBoard) //To get Branch transaction count in dashborad
router.get('/goldcards/count',controller.goldCardsCount) //To get goldcard count in dashborad
router.get('/onlineusers/count',controller.onlineUsersCount) //To get online users count in dashborad
router.get('/branchusers/count',controller.branchUsersCount) //To get branch users count in dashborad
router.get('/total/branches',controller.totalBranchesCount) //To get branches count in dashborad
router.get('/total/transactions',controller.transactionsCount) //To get total transactions count in dashborad
router.get('/topgoldcard/transactions',controller.topRatedCustomers)//To get top 10 customers from transactions
router.get('/branchusers/transactions',controller.branchUserWiseTransactions)//To get branch userwise transactions count
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;