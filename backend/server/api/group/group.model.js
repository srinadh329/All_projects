'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
  
  creatorId:{ type: Schema.Types.ObjectId, ref: 'User' },
  creatorEmailId:String,
  creatorName:String,
  GroupName: String,
  info: String,
  active: Boolean,
  GroupMembers: { type: Schema.Types.ObjectId, ref: 'User' },  // new member join
  GuniqueId: String,
  deletedStatus: {type: Boolean, default: 'true'},
  GroupIcon: { type: Schema.Types.ObjectId, ref: 'Media' },
  // ImageData: Object,
  Type: { type: String, default: 'public' },
  Role:String,  //new member role
  create_At: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Group', GroupSchema);