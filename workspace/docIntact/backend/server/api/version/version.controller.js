'use strict';

var _ = require('lodash');
var Version = require('./version.model');
var moment=require('moment')

// Get list of versions
exports.index = function(req, res) {
  Version.find({documentid:req.params.id}).sort({created_at: 'desc'}).exec(function (err, versions) {

    if(err) { return handleError(res, err); }
    return res.status(200).json(versions);
  });
};

// Get a single version
exports.show = function(req, res) {
  Version.findById(req.params.id, function (err, version) {
    if(err) { return handleError(res, err); }
    if(!version) { return res.status(404).send('Not Found'); }
    return res.json(version);
  });
};

// Creates a new version in the DB.
exports.create = function(req, res) {
  req.body.uid = req.user._id;
  console.log(req.body,"++++++++++++++++++++++++")
  Version.create(req.body, function(err, version) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(version);
  });
};

// Updates an existing version in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Version.findById(req.params.id, function (err, version) {
    if (err) { return handleError(res, err); }
    if(!version) { return res.status(404).send('Not Found'); }
    var updated = _.merge(version, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(version);
    });
  });
};

// Deletes a version from the DB.
exports.destroy = function(req, res) {
  Version.findById(req.params.id, function (err, version) {
    if(err) { return handleError(res, err); }
    if(!version) { return res.status(404).send('Not Found'); }
    version.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}