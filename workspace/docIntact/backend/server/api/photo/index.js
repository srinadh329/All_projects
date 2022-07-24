'use strict';

var express = require('express');
var controller = require('./photo.controller');
var multiparty = require('connect-multiparty');
var path = require('path');
var multipartyMiddleware = multiparty();
var router = express.Router();
var auth = require('../../auth/auth.service');

router.use(multiparty({ uploadDir: path.dirname('./photo')+'/photo' }));
router.get('/:email', controller.index);
router.get('/getDefault/:id', controller.getDefault);

router.get('/:id', controller.show);
router.post('/',  multipartyMiddleware, controller.create); 
router.post('/mobilecreate',  multipartyMiddleware, controller.mobilecreate);
router.post('/createfrommobilelink/', multipartyMiddleware, controller.createfrommobilelink);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.put('/setDefaultSetting/:id',controller.setDefaultSetting);
router.post('/dragcreate', auth.isAuthenticated(),multipartyMiddleware, controller.dragcreate);
router.post('/bottlenecksCreation/', controller.bottlenecksCreation);
router.get('/getphoto/:id',controller.getphoto)

module.exports = router;