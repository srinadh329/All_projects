'use strict';

var _ = require('lodash');
var key = "secretkey@123";
var crypto = require("crypto")
var Chat = require('./chat.model');

function encrypt(key, data) {
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
function decrypt(key, data) {
  var decipher = crypto.createDecipher('aes-256-cbc', key);
  var decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

// Get a single chat
exports.index = function (req, res) {
  Chat.findById(req.params.id).populate('from').populate('to').count().exec(function (err, chat) {
    if (err) { return handleError(res, err); }
    if(!chat) {
      return res.status(404).send('Not Found');
    } else {
      Chat.findById(req.params.id).populate('from').populate('to').exec(function (err, chatdata) {
        var data = chatdata;
        for(var i=0;i<chat;i++) {
          data[i].message = decrypt(key, data[i].message);
        }
        return res.json(data);
      });
    }
  });
};

// Get a list of chat
exports.show = function (req, res) {
  // console.log(req.params.id)
  Chat.find({ documentid: req.params.id }).sort({ created_at: 'asc' }).populate('from').count().exec(function (err, chat) {
    if (err) { return handleError(res, err); }
    if (!chat) {
      return res.status(404).send('Not Found');
    } else {
      Chat.find({ documentid: req.params.id }).sort({ created_at: 'asc' }).populate('from').exec(function (err, chatdata) {
        var data = chatdata;
        for (var i = 0; i < chat; i++) {
          data[i].message = decrypt(key, data[i].message);
        }
        return res.json(data);
      });
      console.log(chat)
    }
  });
};

// Get a list of unread chat
exports.getChat = function (req, res) {
  Chat.find({ $and: [{ $or: [{ from: req.user._id }, { to: req.user._id }] }, { read: false }] }).sort({ created_at: 'asc' }).populate('from').populate('to').exec(function (err, chat) {
    if (err) { return handleError(res, err); }
    if (!chat) { return res.status(404).send('Not Found'); }
    return res.json(chat);
  });
};

// Creates a new chat in the DB.
exports.create = function (req, res) {
  req.body.message = encrypt(key, req.body.message)
  req.body.from = req.body.uid;
  Chat.create(req.body, function (err, chat) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(chat);
  });
};

// Updates an existing chat in the DB.
exports.update = function (req, res) {
  console.log("pppppppppppppppp")
  if (req.body._id) { delete req.body._id; }
  Chat.findById(req.params.id, function (err, chat) {
    if (err) { return handleError(res, err); }
    if (!chat) { return res.status(404).send('Not Found'); }
    var updated = _.merge(chat, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(chat);
    });
  });
};

// Deletes a chat from the DB.
exports.destroy = function (req, res) {
  Chat.findById(req.params.id, function (err, chat) {
    if (err) { return handleError(res, err); }
    if (!chat) { return res.status(404).send('Not Found'); }
    chat.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}