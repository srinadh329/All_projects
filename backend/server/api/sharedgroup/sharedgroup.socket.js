/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Sharedgroup = require('./sharedgroup.model');

exports.register = function(socket) {
  Sharedgroup.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Sharedgroup.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('sharedgroup:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('sharedgroup:remove', doc);
}