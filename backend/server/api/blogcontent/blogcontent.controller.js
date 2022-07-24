'use strict';

var _ = require('lodash');
var Blogcontent = require('./blogcontent.model');

// Get list of blogcontents
exports.index = function(req, res) {
  Blogcontent.find(function (err, blogcontents) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(blogcontents);
  });
};

// Get a single blogcontent
exports.show = function(req, res) {
  Blogcontent.findById(req.params.id, function (err, blogcontent) {
    if(err) { return handleError(res, err); }
    if(!blogcontent) { return res.status(404).send('Not Found'); }
    return res.json(blogcontent);
  });
};

// Creates a new blogcontent in the DB.
exports.create = function(req, res) {
  Blogcontent.create(req.body, function(err, blogcontent) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(blogcontent);
  });
};

// Updates an existing blogcontent in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Blogcontent.findById(req.params.id, function (err, blogcontent) {
    if (err) { return handleError(res, err); }
    if(!blogcontent) { return res.status(404).send('Not Found'); }
    var updated = _.merge(blogcontent, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(blogcontent);
    });
  });
};

// Deletes a blogcontent from the DB.
exports.destroy = function(req, res) {
  Blogcontent.findById(req.params.id, function (err, blogcontent) {
    if(err) { return handleError(res, err); }
    if(!blogcontent) { return res.status(404).send('Not Found'); }
    blogcontent.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}