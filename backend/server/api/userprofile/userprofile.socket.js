/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Userprofile = require('./userprofile.model');

exports.register = function(socket) {
  Userprofile.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Userprofile.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('userprofile:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('userprofile:remove', doc);
}