'use strict';

var _ = require('lodash');
var Follower = require('./follower.model');

// Get list of followers
exports.index = function(req, res) {
  Follower.find(function (err, followers) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(followers);
  });
};

// Get a single follower
exports.show = function(req, res) {
  Follower.findById(req.params.id, function (err, follower) {
    if(err) { return handleError(res, err); }
    if(!follower) { return res.status(404).send('Not Found'); }
    return res.json(follower);
  });
};

// Creates a new follower in the DB.
exports.create = function(req, res) {
  Follower.create(req.body, function(err, follower) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(follower);
  });
};

// Updates an existing follower in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Follower.findById(req.params.id, function (err, follower) {
    if (err) { return handleError(res, err); }
    if(!follower) { return res.status(404).send('Not Found'); }
    var updated = _.merge(follower, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(follower);
    });
  });
};

// Deletes a follower from the DB.
exports.destroy = function(req, res) {
  Follower.findById(req.params.id, function (err, follower) {
    if(err) { return handleError(res, err); }
    if(!follower) { return res.status(404).send('Not Found'); }
    follower.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}