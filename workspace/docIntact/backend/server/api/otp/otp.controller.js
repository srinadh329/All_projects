'use strict';

var _ = require('lodash');
var Otp = require('./otp.model');

// Get list of otps
exports.index = function(req, res) {
  console.log({uid: req.user._id})
  Otp.find({uid: req.user._id}). populate('otpID').exec(function (err, otps) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(otps);
  });
};



// Get a single otp
exports.show = function(req, res) {
  console.log("hiii")
  Otp.findById(req.params.id, function (err, otp) {
    if(err) { return handleError(res, err); }
    if(!otp) { return res.status(404).send('Not Found'); }
    return res.json(otp);
  });
};



// Creates a new otp in the DB.
exports.create = function(req, res) {
  Otp.create(req.body, function(err, otp) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(otp);
  });
};


// Updates an existing otp in the DB.
exports.update = function(req, res) {
  console.log(req.body.id)
  if(req.body._id) { delete req.body._id; }
  Otp.findById(req.params.id, function (err, otp) {
    if (err) { return handleError(res, err); }
    if(!otp) { return res.status(404).send('Not Found'); }
    var updated = _.merge(otp, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(otp);
    });
  });
};

// Deletes a otp from the DB.
exports.destroy = function(req, res) {
  console.log(req.params.id)
  Otp.findById(req.params.id, function (err, otp) {
    if(err) { return handleError(res, err); }
    if(!otp) { return res.status(404).send('Not Found'); }
    otp.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}