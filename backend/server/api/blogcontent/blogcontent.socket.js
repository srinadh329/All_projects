/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Blogcontent = require('./blogcontent.model');

exports.register = function(socket) {
  Blogcontent.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Blogcontent.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('blogcontent:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('blogcontent:remove', doc);
}