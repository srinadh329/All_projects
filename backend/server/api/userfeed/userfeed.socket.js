/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Userfeed = require('./userfeed.model');

exports.register = function(socket) {
  Userfeed.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Userfeed.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('userfeed:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('userfeed:remove', doc);
}