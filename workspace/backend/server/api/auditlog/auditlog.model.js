'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AuditlogSchema = new Schema({
  name: String,
  uid: {type: Schema.Types.ObjectId, ref : 'User'},
  documentid:{type:Schema.Types.ObjectId,ref:'Document'},
  active: Boolean,
  created_at: { type: Date, required: true, default: Date.now },
  endTime:Date,
  active: Boolean,
  email:String
});

module.exports = mongoose.model('Auditlog', AuditlogSchema);