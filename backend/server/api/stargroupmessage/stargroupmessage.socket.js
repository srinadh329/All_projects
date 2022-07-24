/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Stargroupmessage = require('./stargroupmessage.model');

exports.register = function(socket) {
  Stargroupmessage.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Stargroupmessage.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('stargroupmessage:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('stargroupmessage:remove', doc);
}