'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LinkSchema = new Schema({
  phonenumber: String,
  IP: String,
  otp: Number,
  EmailId: { type: String, lowercase: true },
  expire_At: { type: Date },
  expire_count: {type: Number, default: 0},
  create_At: { type: Date, required: true, default: Date.now }
});


// Validate email is not taken
// LinkSchema
//   .path('EmailId')
//   .validate(function (value, respond) {
//     var self = this;
//     this.constructor.findOne({ EmailId: value }, function (err, user) {
//       if (err) throw err;
//       if (user) {
//         if (self.id === user.id) return respond(true);
//         return respond(false);
//       }
//      // respond(true);
//     });
//   }, 'The specified email address is already in use.');


module.exports = mongoose.model('Link', LinkSchema);