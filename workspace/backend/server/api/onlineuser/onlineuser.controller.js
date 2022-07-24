'use strict';

var _ = require('lodash');
var Onlineuser = require('./onlineuser.model');

// Get list of onlineusers
exports.index = function(req, res) {
  Onlineuser.find(function (err, onlineusers) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(onlineusers);
  });
};

// Get a single onlineuser
exports.show = function(req, res) {
  Onlineuser.find({fileid:req.params.id,viewStatus:true}).populate('uid').exec(function (err, onlineuser) {
    if(err) { return handleError(res, err); }
    if(!onlineuser) { return res.status(404).send('Not Found'); }
    return res.json(onlineuser);
  });
};

// Creates a new onlineuser in the DB.
exports.create = function (req, res) {
console.log(req.body.email)
  req.body.uid = req.body.uid;
  Onlineuser.findOne({ fileid: req.body.fileid, uid: req.body.uid }).exec(function (err, onlineuser) {

    if (!onlineuser) {
      Onlineuser.create(req.body, function (err, onlineuser) {
        if (err) { 
          console.log(err)
          return handleError(res, err); }
        return res.status(201).json(onlineuser);
      });
    }
    else {
      req.body.viewStatus = true
      var updated = _.merge(onlineuser, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(onlineuser);
      });
    }
  });

};

// Updates an existing onlineuser in the DB.
exports.update = function(req, res) {
  console.log(req.body)
  req.body.endTime=new Date(req.body.endTime)
  if(req.body._id) { delete req.body._id; }
  Onlineuser.findById(req.params.id, function (err, onlineuser) {
    if (err) { return handleError(res, err); }
    if(!onlineuser) { return res.status(404).send('Not Found'); }
    var updated = _.merge(onlineuser, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(onlineuser);
    });
  });
};

// Deletes a onlineuser from the DB.
exports.destroy = function(req, res) {
  Onlineuser.findById(req.params.id, function (err, onlineuser) {
    if(err) { return handleError(res, err); }
    if(!onlineuser) { return res.status(404).send('Not Found'); }
    onlineuser.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}