/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Userstatus = require('./userstatus.model');

exports.register = function(socket) {
  Userstatus.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Userstatus.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('userstatus:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('userstatus:remove', doc);
}