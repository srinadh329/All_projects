'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title: String,
  description: String,
  content:String,
  photo: { type: Schema.Types.ObjectId, ref: 'Media' },
  org_id : {type:Schema.Types.ObjectId, ref:'Admin'},
  BlogType: {type: String, default: 'public'},
  userId:{type:Schema.Types.ObjectId, ref:'User'},
  status: {type: Number, default: 0 },
  from_date :String,
  to_date :String,
  Followers: { type: Schema.Types.ObjectId, ref: 'Follower' },
  BlogContent: {type: Schema.Types.ObjectId, ref:'Blogcontent'},
  create_At: { type: Date, required: true, default: Date.now },
  lastEdited_At: { type: Date, required: true, default: Date.now },
  blogViews: Number,
  deletedStatus:{type: Number, default: 1 },
 
  info: String,
  active: Boolean,
  bolgdata:String,
  content:String

});

module.exports = mongoose.model('Blog', BlogSchema);