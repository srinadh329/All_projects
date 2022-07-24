'use strict';

var _ = require('lodash');
var Links = require('./links.model');
var moment = require('moment');

// Get list of linkss
exports.index = function(req, res) {
  Links.find(function (err, linkss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(linkss);
  });
};

// Get a single links
exports.show = function(req, res) {
  Links.findById(req.body, function (err, links) {
    if(err) { return handleError(res, err); }
    if(!links) { return res.status(404).send('Not Found'); }
    return res.json(links);
  });
};

// Creates a new links in the DB.
exports.create = function(req, res) {
  Links.create(req.body, function(err, links) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(links);
  });

}

// Updates an existing links in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Links.findById(req.params.id, function (err, links) {
    if (err) { return handleError(res, err); }
    if(!links) { return res.status(404).send('Not Found'); }
    var updated = _.merge(links, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(links);
    });
  });
};

// Deletes a links from the DB.
exports.destroy = function(req, res) {
  Links.findById(req.params.id, function (err, links) {
    if(err) { return handleError(res, err); }
    if(!links) { return res.status(404).send('Not Found'); }
    links.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}