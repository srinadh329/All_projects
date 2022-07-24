'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  senderId: String,
  senderEmailId: String,
  senderName: String,
  receiverId: String,
  receiverName:String,
  message:String,
  isMedia: Boolean,
  mediaId: String,
  MediaUrl: String,
  MessageHash: String,
  messageStatus: String,
  deletingfriend: String,
  fromStaredMessage : {type: Number, default: 0 },
  toStaredMessage : {type: Number, default: 0} ,
  deletingMsgstatus:String,
  Receipt: { status: String },
  IP: String,
  Gps: Object,
  emailsentmsg: {type: Number, default: 0 },
  locationurl:String,
  locationlabel:String,
  incognito:String,
  incognitoStatus:String,
  media: { type: Schema.Types.ObjectId, ref: 'Media' },
  photo: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
  create_At: { type: Date, required: true, default: Date.now },
  parentId: { type: Schema.Types.ObjectId, ref: 'Message' },
  pid: { type: Schema.Types.ObjectId, ref: 'Media' },
 urlLink: String,
 reciverimg: { type: Schema.Types.ObjectId, ref: 'User' },
 senderimg: { type: Schema.Types.ObjectId, ref: 'User' },
 preciverimg: { type: Schema.Types.ObjectId, ref: 'User' },
 psenderimg: { type: Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model('Message', MessageSchema);

