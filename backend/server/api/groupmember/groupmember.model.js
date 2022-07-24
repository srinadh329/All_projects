'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupmemberSchema = new Schema({
  GroupId: { type: Schema.Types.ObjectId, ref: 'Group' },
  Grname : String,
  Role:String, // new member role
  isJoin:{type: String, default:'Pending'}, // user join or not
  isLeave: {type: Boolean, default: 'false'},
  isRemoved: {type: Boolean, default: 'false'},
  isBlocked: {type: Boolean, default: 'false'},
  gSenderId : {type:Schema.Types.ObjectId, ref:'User'},
   
  ReportAbuse: {type: Number, default: 0},
  badgeCount : { type:Number, defalut: 0},
  create_At: { type: Date, required: true, default: Date.now },
  creatorId: {type: Schema.Types.ObjectId, ref: 'User' },
  memberId:{type: Schema.Types.ObjectId, ref: 'User' },
  memberEmailId:{type: String},
  deletedStatus: {type: Boolean, default: 'true'},
  messageNotification: {type:Boolean, default: 'false'},
  starStatus: {type:Boolean, default: 'false'},
  blockStatus: { type:Boolean, default: 'false'}
});

module.exports = mongoose.model('groupmember', GroupmemberSchema);