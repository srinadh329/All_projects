/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Userreports = require('./userreports.model');

exports.register = function(socket) {
  Userreports.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Userreports.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('userreports:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('userreports:remove', doc);
}