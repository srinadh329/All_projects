'use strict';

var express = require('express');
var controller = require('./blog.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/getblogdata', controller.gettingdata);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.get('/organization/:org_id', controller.getorgblogs);
router.get('/blogstatus/:id/:status', controller.updateblogstatus);
router.get('/getblog/:id/:title',controller.getblog);
router.delete('/deleteblog/:id', controller.deleteblog);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:title', controller.blogsearch);
module.exports = router;