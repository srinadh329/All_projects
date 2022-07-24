'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserreportsSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Userreports', UserreportsSchema);