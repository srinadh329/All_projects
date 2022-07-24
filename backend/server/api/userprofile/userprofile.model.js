'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var UserprofileSchema = new Schema({
  
  UserName: String,
  FullName: String,
  description: Object,
  Bio: String,
  logo: String,
  latitude: String,
  langitude: String,
  locate: String,
  mobileno: Number,
  mobileno2: Number,
  newlat: String,
  newlng: String,
  role: { type: String, default: 'user' },
  EmailId: { type: String, lowercase: true },
  Groups: { type: Schema.Types.ObjectId, ref: 'Group' },
  contacts: {type: Schema.Types.ObjectId, ref: 'Contact'},
  blockedContacts: Object,
  PriorityList: Object,
  zipcode: String,
  info: String,
  active: Boolean,
  status: { type: String, default: 'Active' },
  active: { type: Boolean, default: true },
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  uid: { type: Schema.Types.ObjectId, ref: 'User' },
  photo: { type: Schema.Types.ObjectId, ref: 'Media' },
  checked: String,
  facebook: String,
  twitter: String,
  instagram: String,
  googleplus: String,
  orgname:String,
  organization_id: {type: Schema.Types.ObjectId, ref: 'Admin'},
  roleid: { type: Schema.Types.ObjectId, ref: 'Roles' },
});

module.exports = mongoose.model('Userprofile', UserprofileSchema);