/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Invitation = require('./invitation.model');

exports.register = function(socket) {
  Invitation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Invitation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('invitation:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('invitation:remove', doc);
}