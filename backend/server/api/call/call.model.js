'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CallSchema = new Schema({
  CallType: String,
  SenderID: {type: Schema.Types.ObjectId,required: true, ref: 'User'},
  ReceiverID: [
    {id: {type: Schema.Types.ObjectId,required: true, ref: 'User'},
    status: {type: String}}
  ],
  CallStartedAt: Date,
  CallEndedAt: Date,
  RoomID: String,
  Status: String
});

module.exports = mongoose.model('Call', CallSchema);