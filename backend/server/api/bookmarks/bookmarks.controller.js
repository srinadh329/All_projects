'use strict';

var _ = require('lodash');
var Bookmarks = require('./bookmarks.model');

// Get list of bookmarkss
exports.index = function(req, res) {
  Bookmarks.find(function (err, bookmarkss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(bookmarkss);
  });
};

// Get a single bookmarks
exports.show = function(req, res) {
  Bookmarks.findById(req.params.id, function (err, bookmarks) {
    if(err) { return handleError(res, err); }
    if(!bookmarks) { return res.status(404).send('Not Found'); }
    return res.json(bookmarks);
  });
};

// Creates a new bookmarks in the DB.
exports.create = function(req, res) {
  Bookmarks.create(req.body, function(err, bookmarks) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(bookmarks);
  });
};

// Updates an existing bookmarks in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Bookmarks.findById(req.params.id, function (err, bookmarks) {
    if (err) { return handleError(res, err); }
    if(!bookmarks) { return res.status(404).send('Not Found'); }
    var updated = _.merge(bookmarks, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(bookmarks);
    });
  });
};

// Deletes a bookmarks from the DB.
exports.destroy = function(req, res) {
  Bookmarks.findById(req.params.id, function (err, bookmarks) {
    if(err) { return handleError(res, err); }
    if(!bookmarks) { return res.status(404).send('Not Found'); }
    bookmarks.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}