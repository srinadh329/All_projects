'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookmarksSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Bookmarks', BookmarksSchema);