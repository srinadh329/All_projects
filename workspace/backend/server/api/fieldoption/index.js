'use strict';

var express = require('express');
var controller = require('./fieldoption.controller');

var router = express.Router();
var auth = require('../../auth/auth.service');

router.post('/CurrentVersionDocFields/', controller.index);
router.post('/versionDocfieldvalues', controller.versionFieldValues);
router.get('/gettempltes',auth.isAuthenticated(), controller.gettempltes);
// router.get('/agrementcopy/templtesget/:id',auth.isAuthenticated(), controller.agrementCopyTemplates);
router.get('/:id',auth.isAuthenticated(), controller.show);
router.get('/getSelectedTemplate/:id',auth.isAuthenticated(), controller.getSelectedTemplate);

router.post('/',auth.isAuthenticated(), controller.create);
router.post('/emailcheck',auth.isAuthenticated(), controller.emailcheck);

router.put('/:id', controller.update);
router.put('/overridetemplate/:id',auth.isAuthenticated(), controller.overridetemplate);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;