/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Roles = require('./roles.model');

exports.register = function(socket) {
  Roles.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Roles.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('roles:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('roles:remove', doc);
}