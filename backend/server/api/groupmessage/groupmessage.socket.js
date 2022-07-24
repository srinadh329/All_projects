/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Groupmessage = require('./groupmessage.model');

exports.register = function(socket) {
  Groupmessage.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Groupmessage.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('groupmessage:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('groupmessage:remove', doc);
}