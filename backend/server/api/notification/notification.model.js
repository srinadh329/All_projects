'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var NotificationSchema = new Schema({
      Frid:{ type: Schema.Types.ObjectId, ref: 'Friendslist' },
      Grid:{type: Schema.Types.ObjectId, ref:'Groupmember'},
      type: String,
      status: String,
      creatorId:{ type: Schema.Types.ObjectId, ref: 'User'},
      memberId:{ type: Schema.Types.ObjectId, ref: 'User'},
      read: { type: Boolean, default: false },
      senderId: { type: Schema.Types.ObjectId, ref: 'User' },
      receiverid: { type: Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, required: true, default: Date.now },
      deletedStatus: {type: Boolean, default: 'true'}
    }, { timestamps: true });
    
module.exports = mongoose.model('Notification', NotificationSchema);