'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  userId: String,
  blogId: String,
  blogName:String,
  blogOwnerId:String,
  commented_At: { type: Date, required: true, default: Date.now },
  isResponse: Boolean
});

module.exports = mongoose.model('Comment', CommentSchema);