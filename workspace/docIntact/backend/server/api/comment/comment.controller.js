'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');
var Document = require('../document/document.model')
const os = require('os');
var auth = require('../../auth/auth.service');

// Get list of comments
exports.index = function (req, res) {
  Comment.find(function (err, comments) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(comments);
  });
};

// Get a single comment
exports.show = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if (!comment) { return res.status(404).send('Not Found'); }
    return res.json(comment);
  });
};

// Creates a new comment in the DB.
exports.create = function (req, res) {
  console.log("__________________________")

    req.body.status = "pending"
  Comment.create(req.body, function (err, comment) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(comment);
  });
};

exports.postcommentsoutside = function (req, res) {
  console.log(os.hostname())
  console.log(req.body)
  req.body.status = "pending"
  Comment.create(req.body, function (err, comment) {
    if (err) { return handleError(res, err); }
    console.log(comment)
    return res.status(201).json(comment);
  });
};



exports.getcomments = function (req, res) {
  console.log("DGdg")
  console.log(req.body.id)
  Comment.find({ documentid: req.body.id, active: true }).populate('uid').populate('parentcommentid').exec(function (err, comment) {
    if (err) { return handleError(res, err); }
    if (!comment) { return res.status(500).send('Internal server error'); }
    return res.json(comment);
  });
};


exports.replycomments = function (req, res) {
  console.log("DGdg")
  
  req.body.status = "pending"
  console.log(req.body)
  Comment.create(req.body, function (err, comment) {
    if (err) { return handleError(res, err); }
    console.log(comment)
    return res.status(201).json(comment);
  });
};

exports.replycommentsoutside = function (req, res) {
  console.log("DGdg")
  req.body.name = os.hostname()
  req.body.status = "pending"
  console.log(req.body)
  Comment.create(req.body, function (err, comment) {
    if (err) { return handleError(res, err); }
    console.log(comment)
    return res.status(201).json(comment);
  });
};



// Updates an existing comment in the DB.
exports.update = function (req, res) {
  console.log(req.body)
  if (req.body._id) { delete req.body._id; }
  console.log(req.params.id)
  Comment.findById(req.params.id, function (err, comment) {
    console.log(comment)
    if (err) { return handleError(res, err); }
    if (!comment) { return res.status(404).send('Not Found'); }
    var updated = _.merge(comment, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(comment);
    });
  });
};


// Deletes a comment from the DB.
exports.destroy = function (req, res) {
  console.log(req.body)
  Comment.findById(req.body.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if (!comment) { return res.status(404).send('Not Found'); }
    if (req.body.status == "delete")
      comment.active = false
    comment.status = req.body.status
    comment.updated_at=Date.now();
    comment.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};



function handleError(res, err) {
  return res.status(500).send(err);
}