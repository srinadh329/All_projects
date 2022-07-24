/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /starredmessages              ->  index
 * POST    /starredmessages              ->  create
 * GET     /starredmessages/:id          ->  show
 * PUT     /starredmessages/:id          ->  update
 * DELETE  /starredmessages/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Starredmessage = require('./starredmessage.model');

// Get list of starredmessages
exports.index = function(req, res) {
  Starredmessage.find(function (err, starredmessages) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(starredmessages);
  });
};

// Get a single starredmessages
exports.show = function(req, res) {
  Starredmessage.findById(req.params.id, function (err, starredmessage) {
    if(err) { return handleError(res, err); }
    if(!starredmessage) { return res.status(404).send('Not Found'); }
    return res.json(starredmessage);
  });
};

// Creates a new starredmessage in the DB.
exports.create = function(req, res) {
  let staredMessage={
    messageid: req.body.msgid,
    senderId:  req.body.senderId,
    receiverId:  req.body.receiverId,
  }
  console.log("stared data",req.body)
  Starredmessage.findOne({messageid:req.body.msgid}, function (err, starredmessage) {
    if(err) { return handleError(res, err); }
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",starredmessage);

    if(starredmessage!=null)
    {
      if(starredmessage.senderId != null && starredmessage.receiverId == null)
      {
        Starredmessage.findOneAndUpdate({messageid:req.body.msgid},{$set:{receiverId:req.body.receiverId}},{new:true},function(err,updatedResponse){
          console.log(updatedResponse)
          if(err) { return handleError(res, err); }
      return res.status(201).json(updatedResponse);
        });
      }
      else if(starredmessage.senderId == null && starredmessage.receiverId != null)
     {
      Starredmessage.findOneAndUpdate({messageid:req.body.msgid},{$set:{senderId:req.body.senderId}},{new:true},function(err,updatedResponse){
        console.log(updatedResponse)
        if(err) { return handleError(res, err); }
    return res.status(201).json(updatedResponse);
      });
    //  }else if(starredmessage.senderId == null && starredmessage.receiverId == null){
    //   if(starredmessage.senderId != null && starredmessage.receiverId == null)
    //   {
    //     Starredmessage.findOneAndUpdate({messageid:req.body.msgid},{$set:{receiverId:req.body.receiverId}},{new:true},function(err,updatedResponse){
    //       console.log(updatedResponse)
    //       if(err) { return handleError(res, err); }
    //   return res.status(201).json(updatedResponse);
    //     });
    //   }
    //   else if(starredmessage.senderId == null && starredmessage.receiverId != null)
    //  {
    //   Starredmessage.findOneAndUpdate({messageid:req.body.msgid},{$set:{senderId:req.body.senderId}},{new:true},function(err,updatedResponse){
    //     console.log(updatedResponse)
    //     if(err) { return handleError(res, err); }
    // return res.status(201).json(updatedResponse);
    //   });
    //  }
    }
  }
    else
    {
      Starredmessage.create(staredMessage, function(err, starredmessage) {
    console.log("@@@@@@@@@@@@@@@@@@@@@@",starredmessage);
    
    if(err) { return handleError(res, err); }
    return res.status(201).json(starredmessage);
  });
    }
  });
  // Starredmessage.create(staredMessage, function(err, starredmessage) {
  //   console.log("@@@@@@@@@@@@@@@@@@@@@@",starredmessage);
    
  //   if(err) { return handleError(res, err); }
  //   return res.status(201).json(starredmessage);
  // });
};

// unstared messages
exports.unstar =function(req,res){
console.log("dataaaaaaAA",req.body)
Starredmessage.findOne({messageid:req.body.msgid},function(err,resp){
if(resp.senderId ==  req.body.senderId){
  Starredmessage.findOneAndUpdate({messageid:resp.messageid},{$set:{senderId:null}},{new:true},function(err,response){
    console.log("ssssssssssssssss",response)
    if(err) { return handleError(res, err); }

    return res.status(200).json(response)
  })
}
else{
  Starredmessage.findOneAndUpdate({messageid:resp.messageid},{$set:{receiverId:null}},{new:true},function(err,response){
    console.log("rrrrrrrrrrrr",response);
    if(err) { return handleError(res, err); }

    return res.status(200).json(response)
  })
}
 })
}



// Updates an existing starredmessage in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Starredmessage.findById(req.params.id, function (err, starredmessage) {
    if (err) { return handleError(res, err); }
    if(!starredmessage) { return res.status(404).send('Not Found'); }
    var updated = _.merge(starredmessage, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(starredmessage);
    });
  });
};

// Deletes a starredmessage from the DB.
exports.destroy = function(req, res) {
  Starredmessage.findById(req.params.id, function (err, starredmessage) {
    if(err) { return handleError(res, err); }
    if(!starredmessage) { return res.status(404).send('Not Found'); }
    starredmessage.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
