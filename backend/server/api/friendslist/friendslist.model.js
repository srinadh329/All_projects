'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var FriendslistSchema = new Schema({
      from : String,
      to : String,
      fromhideshow:String,
      tohideshow:String, 
      fromblockingStatus:String,
      toblockingStatus:String,
      fromUserStatusMute: {type: Boolean, default: false},
      ToUserStatusMute: {type: Boolean, default: false},
      count : { type:Number, default: 0},
      time : { type : Date, default: Date.now },
      invitationStatus : {type : String, default : 'Pending'},
      userid: { type: Schema.Types.ObjectId, ref: 'User' },
      senderId: { type: Schema.Types.ObjectId, ref: 'User' },
      receiverid: { type: Schema.Types.ObjectId, ref: 'User' },
      priorityBySender:{type:Boolean, default : false},
      priorityByReceiver :{ type : Boolean, default : false},
     },{ timestamps: true });

module.exports = mongoose.model('Friendslist', FriendslistSchema);