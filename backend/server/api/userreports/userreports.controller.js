'use strict';

var _ = require('lodash');
var Userreports = require('./userreports.model');

// Get list of userreportss
exports.index = function(req, res) {
  Userreports.find(function (err, userreportss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(userreportss);
  });
};

// Get a single userreports
exports.show = function(req, res) {
  Userreports.findById(req.params.id, function (err, userreports) {
    if(err) { return handleError(res, err); }
    if(!userreports) { return res.status(404).send('Not Found'); }
    return res.json(userreports);
  });
};

// Creates a new userreports in the DB.
exports.create = function(req, res) {
  Userreports.create(req.body, function(err, userreports) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(userreports);
  });
};

// Updates an existing userreports in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Userreports.findById(req.params.id, function (err, userreports) {
    if (err) { return handleError(res, err); }
    if(!userreports) { return res.status(404).send('Not Found'); }
    var updated = _.merge(userreports, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(userreports);
    });
  });
};

// Deletes a userreports from the DB.
exports.destroy = function(req, res) {
  Userreports.findById(req.params.id, function (err, userreports) {
    if(err) { return handleError(res, err); }
    if(!userreports) { return res.status(404).send('Not Found'); }
    userreports.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}