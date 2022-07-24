'use strict';

var express = require('express');
var config = require('../config/environment');
var client = config.client;

// Passport Configuration
require('./local/passport').setup(client, config);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;