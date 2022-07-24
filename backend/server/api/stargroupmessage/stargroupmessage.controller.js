'use strict';

var _ = require('lodash');
var Stargroupmessage = require('./stargroupmessage.model');

// Get list of stargroupmessages
exports.index = function(req, res) {
  Stargroupmessage.find(function (err, stargroupmessages) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(stargroupmessages);
  });
};

// Get a single stargroupmessage
exports.show = function(req, res) {
  Stargroupmessage.findById(req.params.id, function (err, stargroupmessage) {
    if(err) { return handleError(res, err); }
    if(!stargroupmessage) { return res.status(404).send('Not Found'); }
    return res.json(stargroupmessage);
  });
};

// Creates a new stargroupmessage in the DB.
exports.create = function(req, res) {
  Stargroupmessage.create(req.body, function(err, stargroupmessage) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(stargroupmessage);
  });
};
// Create star group message
exports.makeStarred = function(req, res){
  console.log('22',req.body);
  Stargroupmessage.create({message:req.body.message, GroupId:req.body.GroupId, photo:req.body.photo, groupSenderId:req.body.groupSenderId, groupReceiverId:req.body.groupReceiverId, hashForm:req.body.hashForm, starId:req.body.starId,originalId:req.body.originalId}, function(err, response){
    if(err) throw err;
    console.log('21',response);
    
  })
  
}
// Getting Star Group Messages
exports.getStarGroupMessages = (req, res)=>{
  Stargroupmessage.find({$and:[{GroupId:req.params.gid},{starId:req.params.id}, {deletedStatus:true}]}).populate('GroupId').populate('groupSenderId').populate('photo').populate('media').populate('groupReceiverId').exec( (err, response)=>{
    if(err) throw err;
    return res.status(200).json(response)
    
  })
}
// Making Unstar group messages
exports.makeUnStarGroupMessage = function(req, res){
  console.log('2999',req.body);
  Stargroupmessage.findOneAndUpdate({$and:[{_id:req.body.id},{deletedStatus:true}]},{$set:{deletedStatus:req.body.status, starId:req.body.myId}},(err, response)=>{
    if(err) throw err;
    require('../../app').socket.emit('gUnstar:save', response);
    return res.status(200).json(response);
    
  })
  
}

// Updates an existing stargroupmessage in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Stargroupmessage.findById(req.params.id, function (err, stargroupmessage) {
    if (err) { return handleError(res, err); }
    if(!stargroupmessage) { return res.status(404).send('Not Found'); }
    var updated = _.merge(stargroupmessage, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(stargroupmessage);
    });
  });
};

// Deletes a stargroupmessage from the DB.
exports.destroy = function(req, res) {
  Stargroupmessage.findById(req.params.id, function (err, stargroupmessage) {
    if(err) { return handleError(res, err); }
    if(!stargroupmessage) { return res.status(404).send('Not Found'); }
    stargroupmessage.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}