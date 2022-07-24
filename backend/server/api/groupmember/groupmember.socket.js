/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Groupmember = require('./groupmember.model');

exports.register = function(socket) {
  Groupmember.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Groupmember.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('groupmember:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('groupmember:remove', doc);
}