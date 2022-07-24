/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Faqs = require('./faqs.model');

exports.register = function(socket) {
  Faqs.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Faqs.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('faqs:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('faqs:remove', doc);
}