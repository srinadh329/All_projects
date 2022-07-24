'use strict';

var _ = require('lodash');
var Sharedgroup = require('./sharedgroup.model');

// Get list of sharedgroups
exports.index = function(req, res) {
  Sharedgroup.find(function (err, sharedgroups) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(sharedgroups);
  });
};

// Get a single sharedgroup
exports.show = function(req, res) {
  Sharedgroup.findById(req.params.id, function (err, sharedgroup) {
    if(err) { return handleError(res, err); }
    if(!sharedgroup) { return res.status(404).send('Not Found'); }
    return res.json(sharedgroup);
  });
};

// Creates a new sharedgroup in the DB.
exports.create = function(req, res) {
  Sharedgroup.create(req.body, function(err, sharedgroup) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(sharedgroup);
  });
};

// Updates an existing sharedgroup in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sharedgroup.findById(req.params.id, function (err, sharedgroup) {
    if (err) { return handleError(res, err); }
    if(!sharedgroup) { return res.status(404).send('Not Found'); }
    var updated = _.merge(sharedgroup, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(sharedgroup);
    });
  });
};

// Deletes a sharedgroup from the DB.
exports.destroy = function(req, res) {
  Sharedgroup.findById(req.params.id, function (err, sharedgroup) {
    if(err) { return handleError(res, err); }
    if(!sharedgroup) { return res.status(404).send('Not Found'); }
    sharedgroup.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}