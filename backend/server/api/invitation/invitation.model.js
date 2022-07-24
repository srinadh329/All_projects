'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InvitationSchema = new Schema({
  Name: String,
  slug: String,
  info: String,
  active: Boolean,
  recieveracceptance: Boolean,
  EmailId: String,
  senderEmailId: String,
  senderName:String,  
  subject: String,
  mailText:String,
  senderId: { type: Schema.Types.ObjectId, ref: 'User' },
  receiverid: { type: Schema.Types.ObjectId, ref: 'User' },
  active: { type: Boolean, default: true },
  urllink:String,
  expire_At:Date,
  GroupId:{ type: Schema.Types.ObjectId, ref: 'Group', default: null},
}, { timestamps: true });

module.exports = mongoose.model('Invitation', InvitationSchema);