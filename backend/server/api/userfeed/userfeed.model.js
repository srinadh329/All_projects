'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserfeedSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Userfeed', UserfeedSchema);