'use strict';

var express = require('express');
var controller = require('./media.controller');
var multiparty = require('connect-multiparty');
var multipartyMiddlware = multiparty();
var path = require('path');
var router = express.Router();
var auth = require('../../auth/auth.service');

router.use(multiparty({uploadDir: path.dirname('./uploads')+'/uploads'}));
router.get('/',multipartyMiddlware, controller.index);
router.get('/:id',multipartyMiddlware, controller.show);
router.post('/', auth.isAuthenticated(),multipartyMiddlware, controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/urldata', controller.urldata)
router.post('/updateprofile',auth.isAuthenticated(),multipartyMiddlware, controller.updateprofile);
module.exports = router;