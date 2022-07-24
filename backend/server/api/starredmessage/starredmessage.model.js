'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StarredmessageSchema = new Schema({
  messageid:String,
  senderId: String,
  receiverId: String,
},{ timestamps: true });

module.exports = mongoose.model('Starredmessage', StarredmessageSchema);
