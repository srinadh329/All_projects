'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogcontentSchema = new Schema({
  BlogName: String,
  BlogId: String,
  BlogOwnerId:String,
  info: String,
  active: Boolean,
  create_At: { type: Date, required: true, default: Date.now },
  MediaUrl: String,
  // comments: {types: Schema.Types.ObjectId, ref:'Comment'}
});

module.exports = mongoose.model('Blogcontent', BlogcontentSchema);