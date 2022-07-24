'use strict';

var _ = require('lodash');
var Auditlog = require('./auditlog.model');

// Get list of auditlogs
exports.index = function(req, res) {
  Auditlog.find(function (err, auditlogs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(auditlogs);
  });
};

// Get a single auditlog
exports.show = function(req, res) {
  Auditlog.find({documentid:req.params.id}).populate('documentid').populate('uid').exec(function (err, auditlog) {
    if(err) { 
      console.log(err)
      return handleError(res, err); }
    if(!auditlog) { return res.status(404).send('Not Found'); }
    return res.json(auditlog);
  });
};

// Creates a new auditlog in the DB.
exports.create = function(req, res) {
  console.log(req.body)
  Auditlog.create(req.body, function(err, auditlog) {
    if(err) { 
      console.log(err)
      
      return handleError(res, err); }
    return res.status(201).json(auditlog);
  });
};

// Updates an existing auditlog in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Auditlog.findById(req.params.id, function (err, auditlog) {
    if (err) { return handleError(res, err); }
    if(!auditlog) { return res.status(404).send('Not Found'); }
    var updated = _.merge(auditlog, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(auditlog);
    });
  });
};

// Deletes a auditlog from the DB.
exports.destroy = function(req, res) {
  Auditlog.findById(req.params.id, function (err, auditlog) {
    if(err) { return handleError(res, err); }
    if(!auditlog) { return res.status(404).send('Not Found'); }
    auditlog.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}