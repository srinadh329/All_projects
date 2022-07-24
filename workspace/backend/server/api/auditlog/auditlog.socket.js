/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Auditlog = require('./auditlog.model');

exports.register = function(socket) {
  Auditlog.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Auditlog.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('auditlog:save', doc);
  // socket.broadcast.emit('auditlog:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('auditlog:remove', doc);
  // socket.broadcast.emit('auditlog:remove', doc);
}