/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Friendslist = require('./friendslist.model');

exports.register = function(socket) {
  Friendslist.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Friendslist.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('friendslist:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('friendslist:remove', doc);
}