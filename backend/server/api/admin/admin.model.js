'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdminSchema = new Schema({
  organization_id: String,
  organization_name: String,
  contact_person_name: String,
  contact_person_email: String,
  contact_person_phonenumber: String,
  alternate_phonenumber: String,
  organization_status: {type: Number, default: 0 },
  organization_deleted_status: {type: Number, default: 1 },
  created_by : String,
  updated_by : String,
  created_at: { type: Date, required: true, default: Date.now },
  
  
});

module.exports = mongoose.model('Admin', AdminSchema);