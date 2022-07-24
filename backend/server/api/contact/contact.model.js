'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  contacts: Object
});

module.exports = mongoose.model('Contact', ContactSchema);