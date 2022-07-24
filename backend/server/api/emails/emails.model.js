'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmailsSchema = new Schema({
  
  email: String,
  organization_id: { type: Schema.Types.ObjectId, ref: 'Admin' },
  status: String,
  created_by :  { type: Schema.Types.ObjectId, ref: 'User' },
  updated_by :  { type: Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Emails', EmailsSchema);