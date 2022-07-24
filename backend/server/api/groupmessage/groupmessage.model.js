'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupmessageSchema = new Schema({
 GroupId:{type:Schema.Types.ObjectId, ref:'Group'},
 groupSenderId: {type: Schema.Types.ObjectId, ref:'User'},
 groupReceiverId: [{type: Schema.Types.ObjectId, ref:'User'}],
 clearChat :[String],
 unReadMessages: [{type: Schema.Types.ObjectId, ref:'User'}],
 deletedMessages:[{type: Schema.Types.ObjectId, ref:'Groupmember'}],
 starIds:[String],
 message:String,
 isMedia: Boolean,
 mediaId: String,
 MediaUrl: String,
 IP: String,
 hashForm:String,
 Gps: Object,
 starStatus:Boolean,
 locationurl:String,
 locationlabel:String,
 badgeCount : { type:Number, default: 0},
 photo: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
 media:{type:Schema.Types.ObjectId, ref:'Media'},
 create_At: {type: Date, required: true, default: Date.now},
 deletedStatus: {type: Boolean, default: 'true'},
 create_At: { type: Date, required: true, default: Date.now },
 parentId: { type: Schema.Types.ObjectId, ref: 'Groupmessage' },
 blockIds: [{type: Schema.Types.ObjectId, ref:'User'}],
});

module.exports = mongoose.model('Groupmessage', GroupmessageSchema);