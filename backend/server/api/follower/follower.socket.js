/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Follower = require('./follower.model');

exports.register = function(socket) {
  Follower.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Follower.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('follower:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('follower:remove', doc);
}