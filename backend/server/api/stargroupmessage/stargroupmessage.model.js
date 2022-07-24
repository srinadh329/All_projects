'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StargroupmessageSchema = new Schema({
  GroupId:{type:Schema.Types.ObjectId, ref:'Group'},
  groupSenderId: {type: Schema.Types.ObjectId, ref:'User'},
  groupReceiverId: [{type: Schema.Types.ObjectId, ref:'User'}],
  starId:{type: Schema.Types.ObjectId, ref:'User'},
  originalId:{type: Schema.Types.ObjectId, ref:'Groupmessage'},
  message:String,
  isMedia: Boolean,
  mediaId: String,
  MediaUrl: String,
  IP: String,
  hashForm:String,
  Gps: Object,
  locationurl:String,
  photo: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
  media:{type:Schema.Types.ObjectId, ref:'Media'},
  create_At: {type: Date, required: true, default: Date.now},
  deletedStatus: {type: Boolean, default: 'true'},
  create_At: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Stargroupmessage', StargroupmessageSchema);