/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var starredmessage = require('./starredmessage.model');

exports.register = function(socket) {
  starredmessage.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  starredmessage.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('starredmessage:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('starredmessage:remove', doc);
}
