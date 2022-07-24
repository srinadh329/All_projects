'use strict';

var _ = require('lodash');
var Docimage = require('./docimage.model');

// Get list of docimages
exports.index = function(req, res) {
  Docimage.find({ $and: [{ documentid: req.params.id }, { active: true }, { originalImg: true }] }).sort({ pageNo: 'asc' }).exec(function (err, docimages) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(docimages);
  });
};

// Get a single docimage
exports.show = function(req, res) {
  Docimage.findById(req.params.id, function (err, docimage) {
    if(err) { return handleError(res, err); }
    if(!docimage) { return res.status(404).send('Not Found'); }
    return res.json(docimage);
  });
};

// Creates a new docimage in the DB.
exports.create = function(req, res) {
  Docimage.create(req.body, function(err, docimage) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(docimage);
  });
};

// Updates an existing docimage in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Docimage.findById(req.params.id, function (err, docimage) {
    if (err) { return handleError(res, err); }
    if(!docimage) { return res.status(404).send('Not Found'); }
    var updated = _.merge(docimage, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(docimage);
    });
  });
};

// Deletes a docimage from the DB.
exports.destroy = function(req, res) {
  Docimage.findById(req.params.id, function (err, docimage) {
    if(err) { return handleError(res, err); }
    if(!docimage) { return res.status(404).send('Not Found'); }
    docimage.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}