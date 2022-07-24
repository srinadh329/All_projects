'use strict';

var _ = require('lodash');
var Log = require('./log.model');

// Get list of logs
exports.index = function(req, res) {
  Log.find(function (err, logs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(logs);
  });
};

// Get a single log
exports.show = function(req, res) {
  Log.findById(req.params.id, function (err, log) {
    if(err) { return handleError(res, err); }
    if(!log) { return res.status(404).send('Not Found'); }
    return res.json(log);
  });
};

// Creates a new log in the DB.
exports.create = function(req, res) {
  Log.create(req.body, function(err, log) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(log);
  });
};

// Updates an existing log in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Log.findById(req.params.id, function (err, log) {
    if (err) { return handleError(res, err); }
    if(!log) { return res.status(404).send('Not Found'); }
    var updated = _.merge(log, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(log);
    });
  });
};

// Deletes a log from the DB.
exports.destroy = function(req, res) {
  Log.findById(req.params.id, function (err, log) {
    if(err) { return handleError(res, err); }
    if(!log) { return res.status(404).send('Not Found'); }
    log.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}