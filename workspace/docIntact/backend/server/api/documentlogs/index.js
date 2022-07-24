'use strict';

var express = require('express');
var controller = require('./documentlogs.controller');

var router = express.Router();
var auth = require('../../auth/auth.service');
var multiparty = require('connect-multiparty');
var path = require('path');
var multipartyMiddleware = multiparty();
multipartyMiddleware,

router.use(multiparty({ uploadDir: path.dirname('./uploads')+'/uploads' }));
router.get('/', controller.index);
router.get('/getSingleLog/:id',controller.getSingleLog)
router.post('/logs/', controller.my);
router.get('/:id', controller.show);
router.post('/',controller.create);
router.post('/getdevice',controller.getdevice);

router.post('/fieldlogs',controller.fieldlogs)
router.post('/uploadvideo/',controller.uploadvideocreate);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/filesFilter/',controller.filesFilter);
router.post('/createBulkFieldLogs/',controller.createBulkFieldLogs);
router.post('/getDocumentSingleLog/',controller.getDocumentSingleLog);
module.exports = router;