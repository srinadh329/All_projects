'use strict';

var express = require('express');
var controller = require('./goldcard.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.get('/allcards', controller.index);
router.get('/:id', controller.show);
router.post('/gcmaintainance',auth.isAuthenticated(), controller.goldCardMaintainance);//To maintain gold card
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;