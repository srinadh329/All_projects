'use strict';
/**
 Created By    : satya krishna
 Created At    : 22-Jul-2019 11:00 AM
 */
var express = require('express');
var controller = require('./usrmas.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();
router.get('/getBranch', controller.getBranch);
router.get('/allroles', controller.getAllRoles);
router.get('/activeroles', controller.getActiveRoles);
router.post('/branchadd',auth.isAuthenticated(), controller.addBranch);//To add branch
router.post('/updatebranch',auth.isAuthenticated(), controller.updateBranch);//To update branch
router.post('/roles',auth.isAuthenticated(), controller.userRoleMaintainance);//To Maintain user roles
router.post('/branch/usermaintainance',auth.isAuthenticated(),controller.branchUserMaintainance)//To Maintain branch user
router.get('/branch/users/:brnid', controller.getBranchUsers);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
