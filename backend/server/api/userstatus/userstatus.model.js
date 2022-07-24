'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserstatusSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  StatusType: {type: String, required: true},
  CreatedAt: {type: Date,required: true},
  ExpiredAt: {type: Date, required: true},
  TextStatus: {type: String, default: null},
  TextColor: {type: String, default: null},
  TextBackground: {type: String,default: null},
  isBold: {type: Boolean, default:false},
  isItalic: {type: Boolean, default: false},
  isUnderlined: {type: Boolean, default: false},
  media: { type: Schema.Types.ObjectId, default:null, ref: 'Media' },
  caption: {type: String, default: null},
  SeenBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    userid: {type: Schema.Types.ObjectId, ref: 'User'},
    text: {type: String},
    sendtime: {type: Date}
  }]
});

module.exports = mongoose.model('Userstatus', UserstatusSchema);