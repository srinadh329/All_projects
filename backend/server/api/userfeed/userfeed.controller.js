'use strict';

var _ = require('lodash');
var Userfeed = require('./userfeed.model');

// Get list of userfeeds
exports.index = function(req, res) {
  Userfeed.find(function (err, userfeeds) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(userfeeds);
  });
};

// Get a single userfeed
exports.show = function(req, res) {
  Userfeed.findById(req.params.id, function (err, userfeed) {
    if(err) { return handleError(res, err); }
    if(!userfeed) { return res.status(404).send('Not Found'); }
    return res.json(userfeed);
  });
};

// Creates a new userfeed in the DB.
exports.create = function(req, res) {
  Userfeed.create(req.body, function(err, userfeed) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(userfeed);
  });
};

// Updates an existing userfeed in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Userfeed.findById(req.params.id, function (err, userfeed) {
    if (err) { return handleError(res, err); }
    if(!userfeed) { return res.status(404).send('Not Found'); }
    var updated = _.merge(userfeed, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(userfeed);
    });
  });
};

// Deletes a userfeed from the DB.
exports.destroy = function(req, res) {
  Userfeed.findById(req.params.id, function (err, userfeed) {
    if(err) { return handleError(res, err); }
    if(!userfeed) { return res.status(404).send('Not Found'); }
    userfeed.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}