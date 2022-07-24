'use strict';

var _ = require('lodash');
var Notification = require('./notification.model');

// Get list of notifications
exports.index = function (req, res) {
  Notification
    .find({ $or: [{ senderId: req.user._id }, { receiverid: req.user._id }] })
    .populate('senderId').populate('receiverid').exec(function (err, notifications) {
      console.log("notifications", notifications.length)
      if (err) { return handleError(res, err); }
      return res.status(200).json(notifications);
    });
};

// Get a single notification
exports.show = function (req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if (err) { return handleError(res, err); }
    if (!notification) { return res.status(404).send('Not Found'); }
    return res.json(notification);
  });
};

// Creates a new notification in the DB.
exports.create = function (req, res) {
  Notification.create(req.body, function (err, notification) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(notification);
  });
};

// Updates an existing notification in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Notification.findById(req.params.id, function (err, notification) {
    if (err) { return handleError(res, err); }
    if (!notification) { return res.status(404).send('Not Found'); }
    var updated = _.merge(notification, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(notification);
    });
  });
};

// Deletes a notification from the DB.
exports.destroy = function (req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if (err) { return handleError(res, err); }
    if (!notification) { return res.status(404).send('Not Found'); }
    notification.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.readAll = function (req, res) {
  console.log("readall")
  Notification.update({ $or: [{ senderId: req.user._id }, { receiverid: req.user._id }], read: false }, { read: true }, { multi: true }, function (err, notification) {
    if (err) { return handleError(res, err); }
    if (!notification) { return res.status(404).send('Not Found'); }
    return res.json({ res: 'Success' });
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}