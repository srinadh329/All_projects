'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RolesSchema = new Schema({
  role_id: String,
  role_name: String,
  role_status: {type: Number, default: 0 },
  role_type : {type:Number,default: 0},
  role_deleted_status: {type: Number, default: 1 },
  created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Roles', RolesSchema);