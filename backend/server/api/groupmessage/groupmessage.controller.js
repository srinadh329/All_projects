'use strict';

var _ = require('lodash');
var Groupmessage = require('./groupmessage.model');
const async = require('async');
var Groupmember = require('../groupmember/groupmember.model')
var shortid = require('shortid');
const crypto = require('crypto');

// Get list of groupmessages
exports.index = function (req, res) {
  Groupmessage.find(function (err, groupmessages) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(groupmessages);
  });
};

// Get a single groupmessage
exports.show = function (req, res) {
  Groupmessage.findById(req.params.id, function (err, groupmessage) {
    if (err) {
      return handleError(res, err);
    }
    if (!groupmessage) {
      return res.status(404).send('Not Found');
    }
    return res.json(groupmessage);
  });
};

// Delete message
exports.deleteGroupMessage = (req, res)=>{
  Groupmessage.findByIdAndUpdate({_id:req.body.id}, {deletedStatus:req.body.status}, {new:true},(err, result)=>{
    
    require('../../app').socket.emit('gupdate:save', result);
    return res.status(200).json(result);
    
  })
}
//Creates a new groupmessages in the DB
exports.groupMessages = function (req, res) {
  console.log("Group req body: ",req.body)
  var random = shortid.generate();
  var bid;
 
  const password = random;
  const cipher = crypto.createCipher('aes128', 'a password');
  var encrypted = cipher.update(password, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  console.log('6666666666666666', req.body.blockIds);
  
  if(req.body.blockIds.length>0){
    console.log('1111111111111111');
    
    for(let id of req.body.blockIds){
      console.log('222222222222222222222');
      
      if(req.user._id==id){
        console.log('33333333333333333');
        
        bid = id;
      }
    }
    if(bid){
       console.log("Unblock the first");
    }
    else{
      console.log('444444444444444444');
      
      Groupmessage.create({ message: req.body.message,groupSenderId: req.body.groupSenderId,groupReceiverId: req.body.groupReceiverId,GroupId: req.body.groupId,
        unReadMessages: req.body.unReadMessages, blockIds:req.body.blockIds,
        photo: req.body.photo,
        hashForm:encrypted,
        parentId:req.body.parentId,
        clearChat:req.body.clearChat,
        starIds:req.body.starIds,
        starStatus:false,
        isMedia: true,
        Gps: req.body.Gps,
        locationurl: req.body.locationurl,
        locationlabel: req.body.locationlabel
      }, function (err, result) {
        console.log("222222222",result);
        
        if (err) throw err;
        if (result) {
          Groupmessage.findById({
            _id: result._id
          }).populate('groupSenderId','Name').populate('groupReceiverId','Name').populate('GroupId','GroupName Role creatorName creatorEmailId deletedStatus').populate('photo').populate('parentId').exec((err, createdMessage) => {
            console.log("populated msg", createdMessage);
            if (err) {
              return handleError(res, err);
            }
            if (!createdMessage) {
              return res.status(404).send('Not Found');
            } else {
              require('../../app').socket.emit('gmessages:save', createdMessage);
              return res.status(201).json(result)
            }
          });
        }
      });
    }
  }
  else{
    console.log('555555555555555555');
    
  Groupmessage.create({ message: req.body.message,groupSenderId: req.body.groupSenderId,groupReceiverId: req.body.groupReceiverId,GroupId: req.body.groupId,
    unReadMessages: req.body.unReadMessages, blockIds:req.body.blockIds,
    photo: req.body.photo,
    hashForm:encrypted,
    parentId:req.body.parentId,
    clearChat:req.body.clearChat,
    starIds:req.body.starIds,
    starStatus:false,
    isMedia: true,
    Gps: req.body.Gps,
    locationurl: req.body.locationurl,
    locationlabel: req.body.locationlabel
  }, function (err, result) {
    console.log("222222222",result);
    
    if (err) throw err;
    if (result) {
      Groupmessage.findById({
        _id: result._id
      }).populate('groupSenderId','Name').populate('groupReceiverId','Name').populate('GroupId','GroupName Role creatorName creatorEmailId deletedStatus').populate('photo').populate('parentId').exec((err, createdMessage) => {
        console.log("populated msg", createdMessage);
        if (err) {
          return handleError(res, err);
        }
        if (!createdMessage) {
          return res.status(404).send('Not Found');
        } else {
          require('../../app').socket.emit('gmessages:save', createdMessage);
          return res.status(201).json(result)
        }
      });
    }
  });
}
}
// Getting group messages
exports.getMessages = function (req, res) {
  // console.log('asdasda');
  Groupmessage.find({GroupId: req.params.id  }).populate('photo').populate('parentId').populate('groupSenderId','Name').populate('groupReceiverId','Name')
  .populate('GroupId','GroupName Role creatorName creatorEmailId deletedStatus').exec((err, messages) => {
    if (err) throw err;
    return res.status(200).json(messages)
  })
}
exports.deleteStarStatus = function(req, res){
  console.log('88', req.body);
  Groupmessage.update({_id:req.body.id},{$pull:{starIds:{$in:req.body.lid}}},{multi:true}, (err,response)=>{
    if(err) throw err;
    console.log('45',response);
    require('../../app').socket.emit('gStarStatus',response);
  })
}
// Edit group message
exports.editGroupMessage = function(req, res){
  console.log("Group req.body: ",req.body);
  Groupmessage.findOneAndUpdate({_id:req.body.id}, {$set:{photo:req.body.messageData.photo, message:req.body.messageData.message,Gps: req.body.messageData.Gps,locationurl: req.body.messageData.locationurl,locationlabel: req.body.messageData.locationlabel}},{new:true}).populate('groupSenderId','Name')
  .populate('groupReceiverId','Name').populate('GroupId','GroupName deletedStatus').populate('photo').exec(function(err, response){
    if(err) throw err;
    require('../../app').socket.emit('gedit:save', response);    
  })
  
}



//Getting badge count of groups
exports.getMessageschat = function (req, res) {
  Groupmember.find({
    $and: [{
      memberId: req.body.id
    }, {
      isJoin: 'Accepted'
    }, {
      deletedStatus: true
    }]
  }).populate('creatorId','Name').populate('memberId','Name').populate('GroupId','GroupName Type Role creatorName creatorEmailId deletedStatus').exec(function (err, result) {
    if (err) throw err;
    var groups = JSON.parse(JSON.stringify(result));
    async.each(groups, function (group, callback) {
      Groupmessage.find({
        $and: [{
          GroupId: group.GroupId._id,
          deletedStatus: true,
          unReadMessages: {
            $all: req.body.id
          }
        }]
      }).populate('unReadMessages').exec((err, count) => {
        if (err) throw err;
        var bCount = count.length
        group.badgeCount = bCount
        callback();
      })

    }, function (err) {
      return res.status(200).json(groups)
    })
  })
}
// Clear Chat
exports.clearData = (req, res)=>{

  Groupmessage.update({GroupId:req.params.gid},{$pull:{clearChat:{$in:req.params.id}}}, {multi:true}, (err, response)=>{
    if(err) throw err;
  
    require('../../app').socket.emit('gclearData:save', response);   
    return res.status(200).json(response);
    
  })
}

//remove Badge count
exports.removeBadgeCount = function (req, res) {
  Groupmessage.update({GroupId: req.body.gid}, {$pull: {unReadMessages: {$in: req.body.id}}}, {multi: true}, (err, result) => {
    if (err) throw err;

    // require('../../app').socket.emit('gcount:save',result); 
    return res.status(200).json(result)



  })
}
// Add Star id
exports.addStarId = function(req, res){

  
  Groupmessage.update({_id:req.params.did},{$push:{starIds:req.params.id}},function(err, response){
    if(err) throw err;
    console.log(response);
    
    return res.status(200).json(response);
    
  })
}

// Creates a new groupmessage in the DB.
exports.create = function (req, res) {
  Groupmessage.create(req.body, function (err, groupmessage) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(groupmessage);
  });
};

// Updates an existing groupmessage in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Groupmessage.findById(req.params.id, function (err, groupmessage) {
    if (err) {
      return handleError(res, err);
    }
    if (!groupmessage) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(groupmessage, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(groupmessage);
    });
  });
};

// Deletes a groupmessage from the DB.
exports.destroy = function (req, res) {
  Groupmessage.findById(req.params.id, function (err, groupmessage) {
    if (err) {
      return handleError(res, err);
    }
    if (!groupmessage) {
      return res.status(404).send('Not Found');
    }
    groupmessage.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}