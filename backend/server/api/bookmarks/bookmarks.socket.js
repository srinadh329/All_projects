/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Bookmarks = require('./bookmarks.model');

exports.register = function(socket) {
  Bookmarks.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Bookmarks.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('bookmarks:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('bookmarks:remove', doc);
}