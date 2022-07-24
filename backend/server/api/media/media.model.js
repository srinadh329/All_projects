'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MediaSchema = new Schema({
  originalFilename: String,
  path: String,
  size: String,
  type: String,
  name: String,
  title: String,
  active: Boolean,
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
}, {timestamps: true});

module.exports = mongoose.model('Media', MediaSchema);