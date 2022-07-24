'use strict';

var _ = require('lodash');
var User = require('../user/user.model')
var Friendslist = require('./friendslist.model');
var Notifications = require('../notification/notification.model'); 
var Messages= require('../message/message.model');
const async = require('async')
// For Creating Notification for

// Get list of friendslists 
exports.index = function (req, res) { 
  Friendslist.find(function (err, friendslists) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(friendslists);
  });
};

// Get a single friendslist
exports.show = function (req, res) {
  Friendslist.findById(req.params.id).populate('senderId').populate('receiverid').exec(function (err, friendslist) {
    if (err) { return handl0eError(res, err); }
    if (!friendslist) { return res.status(404).send('Not Found'); }
    return res.json(friendslist);
  });
};

// Creates a new friendslist in the DB.
exports.create = function (req, res) {
  Friendslist.create(req.body, function (err, friendslist) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(friendslist);
  });
};

//Creating friendslist in the DB.
exports.creatingFriends = function (req, res) {
  console.log("11111111111111111111111111111111111",req.body);
  
  Friendslist.findOne(
    { $or : [ {$and: [{from: req.body.senderEmailId, to: req.body.receiverEmailId}] }, 
              {$and: [ {from: req.body.receiverEmailId, to:req.body.senderEmailId}] } ] },function(err,response){
    
    if(response){
     
      var Message = 'You already sent a request or Already Your Friend';
      return res.status(201).json(Message);
    }
    else{
      Friendslist.create({ from: req.body.senderEmailId, to: req.body.receiverEmailId, senderId:req.body.senderId, receiverid:req.body.receiverid, 
                           fromblockingStatus:"unblocked state", toblockingStatus:"unblocked state" ,fromhideshow:'value will be updated',tohideshow:'value will be updated'}, (err, data) => {
        if (err) throw err;
        else {
         console.log('created friend', data)
          /*Creating notification for friend request */
          createNotification(data);
          return res.status(201).json(data);        }
      })
    }
  });
}


//Getting priority friends
exports.priorityFriends = function(req, res){

  Friendslist.findOneAndUpdate({_id:req.body.id}, {$set :{priorityBySender:req.body.priorityBySender,  priorityByReceiver:req.body.priorityByReceiver}}, {new: true}).populate('senderId').populate('receiverid').exec((err,response)=>{
    if(err) throw err;
  
    require('../../app').socket.emit('friendslist:psave',response); // emit update friend to data
    return res.status(200).json(response)
  });
}




/* 
Function Name: createNotification
@Input: JSON data
@Output: JSOn
@Desc: Creating Notification with corresponding data (FriendRequestId,SenderId, ReceiverId, Request-Type, Read)
*/
function createNotification(data) {
  var notificationdata = {
    Frid: data._id, senderId: data.senderId, receiverid: data.receiverid, status: data.invitationStatus, read: 'false',
    type: 'FriendRequest'
  }
  Notifications.create(notificationdata, (err, notificationack) => {
    var id = notificationack._id;
    Notifications.findOne({ _id: id }).populate('senderId', 'Name').populate('receiverid', 'Name').exec(function (err, newdata) {
      if (err) { return handleError(res, err); }
      require('../../app').socket.emit('notification:save', newdata)
    });
    if (err) throw err;
    else {
      console.log("notification ack", notificationack);
    }
  });
}

//Getting Friends list and getting Unseen messages

exports.gettingStatusFriends = function (req, res) {
  Friendslist.find({ $and: [{ $or: [{ senderId: req.user._id, fromhideshow: "value will be updated" }, { receiverid: req.user._id, tohideshow: 'value will be updated' }] }] },)
    .populate('senderId', 'Name path EmailId loginStatus updatedAt').populate('receiverid', 'Name path EmailId loginStatus updatedAt').sort({ time: -1 }).exec(function (err, friends) {
      if (err) { return handleError(res, err); }
      console.log("Status Friends: ", friends);
      return res.status(200).json(friends);
    });
}

exports.gettingFriends = function (req, res) {
  Friendslist.find({ $and: [{ $or: [{ senderId: req.user._id, fromhideshow:"value will be updated" }, { receiverid: req.user._id,tohideshow:'value will be updated'}] }, { invitationStatus: 'Accepted' }] },'senderId receiverid priorityBySender priorityByReceiver fromblockingStatus toblockingStatus fromUserStatusMute ToUserStatusMute fromhideshow tohideshow time')
  .populate('senderId','Name path EmailId loginStatus updatedAt onCall').populate('receiverid','Name path EmailId loginStatus updatedAt onCall').sort({time: -1}).exec(function (err, friends) {
    if (err) { return handleError(res, err); }
    console.log("ListUsers: ",friends);
    var friendsdata=JSON.parse(JSON.stringify(friends))
    
    async.each(friendsdata, function(friend, callback) {      
      if(req.user._id == friend.senderId._id) {
       Messages.find({ receiverId: req.user._id, senderId:friend.receiverid._id }).sort({create_At: -1}).exec(function (err, message) {
        var msgfilter = message.filter(m=>(m.messageStatus=='✔' || m.messageStatus =='✔✔') && m.deletingMsgstatus != '1');
        friend.count=msgfilter.length;
          callback()
           });
      }
      else {
        Messages.find({ receiverId: req.user._id, senderId: friend.senderId._id }).sort({create_At: -1}).exec(async function (err, message) {
          var msgfilter = message.filter(m=>(m.messageStatus=='✔' || m.messageStatus =='✔✔') && m.deletingMsgstatus != '1');
          friend.count=msgfilter.length
          callback()
           });
      }
    },function (err) {  
      require('../../app').socket.emit('friendsdata:save',friendsdata);
      return res.status(200).json(friendsdata);
    });
  });
}

exports.gettingVideoCallFriends = function (req, res) {
  Friendslist.find({ $and: [{ $or: [{ senderId: req.user._id, fromhideshow:"value will be updated" }, { receiverid: req.user._id,tohideshow:'value will be updated'}] }, { invitationStatus: 'Accepted' }] },'senderId receiverid').populate('senderId').populate('receiverid').exec(function (err, friends) {
    if (err) { return handleError(res, err); }
    console.log("ListUsers: ",friends);
    return res.status(200).json(friends);
  });
}

exports.gettingFriendsdata = function (req, res) {
  Friendslist.find({ $and: [{ $or: [{ senderId: req.params.id, fromhideshow:"value will be updated" }, { receiverid: req.params.id,tohideshow:'value will be updated'}] }, { invitationStatus: 'Accepted' }] },'priorityBySender priorityByReceiver fromblockingStatus toblockingStatus fromhideshow tohideshow time')
  .populate('senderId','Name path EmailId loginStatus updatedAt').populate('receiverid','Name path EmailId loginStatus updatedAt').sort({time: -1}).exec(function (err, friends) {
    if (err) { return handleError(res, err); }
    var friendsdata=JSON.parse(JSON.stringify(friends))
    
    async.each(friendsdata, function(friend, callback) {      
      if(req.params.id == friend.senderId._id) {
       Messages.find({ receiverId: req.params.id, senderId:friend.receiverid._id }).sort({create_At: -1}).exec(function (err, message) {
        var msgfilter = message.filter(m=>(m.messageStatus=='✔' || m.messageStatus =='✔✔') && m.deletingMsgstatus != '1');
        friend.count=msgfilter.length;
          callback()
           });
      }
      else {
        Messages.find({ receiverId: req.params.id, senderId: friend.senderId._id }).sort({create_At: -1}).exec(async function (err, message) {
          var msgfilter = message.filter(m=>(m.messageStatus=='✔' || m.messageStatus =='✔✔') && m.deletingMsgstatus != '1');
          friend.count=msgfilter.length
          callback()
           });
      }
    },function (err) {  
      require('../../app').socket.emit('friendsdata:save',friendsdata);
      return res.status(200).json(friendsdata);
    });
  });
}


// exports.gettingFriends = function (req, res) {
//   Friendslist.find({ $and: [{ $or: [{ senderId: req.user._id, fromhideshow:"value will be updated" }, { receiverid: req.user._id,tohideshow:'value will be updated'}] }, { invitationStatus: 'Accepted' }] },'priorityBySender priorityByReceiver fromblockingStatus toblockingStatus').populate('senderId','_id,Name,EmailId,from,to').populate('receiverid').sort({time: -1}).exec(function (err, friends) {
//     if (err) { return handleError(res, err); }
//     var friendsdata=JSON.parse(JSON.stringify(friends))
//     console.log("77777",friendsdata)
//     return res.status(200).json(friendsdata);
    
    
//   });
// }
//Invitations list
exports.myInvitations = function (req, res) {
  console.log('8989899898',req.user)
  Friendslist.find({$and:[{invitationStatus:"Pending"},{to:req.user.EmailId},{ $or: [{ senderId: req.user._id }, { receiverid: req.user._id }] }]},'invitationStatus from createdAt').sort({createdAt: -1}).populate('senderId','Name').populate('receiverid','Name').exec(function (err, userinfo) {
    if (err) {
      return handleError(res, err); }
    return res.status(200).json(userinfo);
  });
}



// Making Priority Updates
exports.priorityFriends = function(req, res){
  Friendslist.findOneAndUpdate({_id:req.body.id}, {$set :{priorityBySender:req.body.priorityBySender,  priorityByReceiver:req.body.priorityByReceiver}}, {new: true}).populate('senderId').populate('receiverid').exec((err,response)=>{
    if(err) throw err;
    else{
  
    require('../../app').socket.emit('priorityresponse', response);
    }
    return res.status(200).json(response)
  });
}


//Making Invitation Status update
exports.updatingAccept = function (req, res) { 
  Friendslist.findOneAndUpdate({ _id: req.body._id },{$set:{invitationStatus:req.body.status}},{ new:true}).populate('senderId').populate('receiverid').exec(function (err, data) {  
    console.log("dataaaaaaaaaaaaa",data)
    if(data){
     if(data.invitationStatus != 'Rejected'){ 
    if (err) throw err;
      else {
        Friendslist.findOneAndUpdate({ _id: req.body._id },{$set:{invitationStatus:req.body.status}},{ new: true}, (err, data1) => {
        createNotification(data1);
        });
        require('../../app').socket.emit('friendslist:save',data);  
        
      }
    }else if(data.invitationStatus == 'Rejected'){
      Friendslist.findOne({_id:req.body._id},function(err,resp){
      // setInterval(function(){
      Friendslist.remove(resp,function(err,resp1){
        })
      // },9000)
      })
    }
  }
  return res.status(200).json(data);
    })
}

// Updates an existing friendslist in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Friendslist.findById(req.params.id, function (err, friendslist) {
    if (err) { return handleError(res, err); }
    if (!friendslist) { return res.status(404).send('Not Found'); }
    var updated = _.merge(friendslist, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(friendslist);
    });
  });
};

// Deletes a friendslist from the DB.
exports.destroy = function (req, res) {
  Friendslist.findById(req.params.id, function (err, friendslist) {
    if (err) { return handleError(res, err); }
    if (!friendslist) { return res.status(404).send('Not Found'); }
    friendslist.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};


// This function will execute when user click on Delete contact then user will be deleted from the friendslist permanently
exports.deletecontact = async function(req,res){
  console.log("hellooooooooo",req.body)
  if(req.body != null){
  Friendslist.findOneAndRemove({$or:[{senderId:req.body.senderId,receiverid:req.body.receiverid},{receiverid:req.body.senderId,senderId:req.body.receiverid}]},function(err,response){
  Messages.find({$or:[{senderId:req.body.senderId,receiverId:req.body.receiverid},{receiverId:req.body.senderId,senderId:req.body.receiverid}]},function(err,updatingmsgs){
  if(updatingmsgs.length == 0){
  Friendslist.find({$or:[{senderId:req.body.senderId,invitationStatus:'Accepted' },{receiverid:req.body.senderId,invitationStatus:'Accepted'}]}).populate('senderId').populate('receiverid').exec(function (err, deletecontactfriends) {
  Friendslist.find({$or:[{senderId:req.body.receiverid,invitationStatus:'Accepted' },{receiverid:req.body.receiverid,invitationStatus:'Accepted'}]}).populate('senderId').populate('receiverid').exec(function (err, emitdeletecontactfriends) {
  console.log("check",emitdeletecontactfriends);
  let obj = {
    Data1 : emitdeletecontactfriends,
    Data2 : req.body
  }
  require('../../app').socket.emit('Deletecontact',obj); 
  });
  return res.status(200).json(deletecontactfriends)
     });
    }else{  
  for(var i=0;i<updatingmsgs.length;i++){
  if(updatingmsgs[i].deletingfriend != 'deletingfriend'){
  Messages.update(updatingmsgs[i],{$set:{deletingfriend:"deletingfriend"}},function(err,respons){
           })
          } 
  if(updatingmsgs.length-1 == i){
  Friendslist.find({$or:[{senderId:req.body.senderId,invitationStatus:'Accepted' },{receiverid:req.body.senderId,invitationStatus:'Accepted'}]}).sort({time: -1}).populate('senderId').populate('receiverid').exec(function (err, deletecontactfriends) {
    Friendslist.find({$or:[{senderId:req.body.receiverid,invitationStatus:'Accepted' },{receiverid:req.body.receiverid,invitationStatus:'Accepted'}]}).populate('senderId').populate('receiverid').exec(function (err, emitdeletecontactfriends) {
    console.log("test",emitdeletecontactfriends);
    let obj = {
      Data1 : emitdeletecontactfriends,
      Data2 : req.body
    }
    require('../../app').socket.emit('Deletecontact',obj); 
    });
  return res.status(200).json(deletecontactfriends)                                                                                                                
           });
          }
        }
       }
      })
    })
  }
}

// This function will execute when user clicks on hide user    
exports.hideShow =  async function (req, res) {
  var flag =0;
     await Friendslist.update({senderId:req.body.senderId, receiverid:req.body.receiverid,invitationStatus:'Accepted'},{$set:{fromhideshow:1}},function(err1,res2){
      if(err1) throw err1;
     
    })
    await Friendslist.update({senderId:req.body.receiverid, receiverid:req.body.senderId,invitationStatus:'Accepted'},{$set:{tohideshow:1}},function(err1,res2){
      if(err1) throw err1;
     
    })

  // setTimeout(function(){  
     await Friendslist.find({$or:[{senderId:req.body.senderId,invitationStatus:'Accepted',fromhideshow:"value will be updated"},{receiverid:req.body.senderId,invitationStatus:'Accepted',tohideshow:'value will be updated'}]}).sort({time: -1}).populate('senderId').populate('receiverid').exec(function (err, hideuserres){
       return res.status(200).json(hideuserres)
     });
    // }, 1000);
}

// This function will execute when user clicks on active hide users
exports.activeusers = function(req,res){
  Friendslist.find({$or:[{from:req.body.data,invitationStatus:'Accepted',fromhideshow:1},{to:req.body.data,invitationStatus:'Accepted',tohideshow:1}]},function(err,activehideusers){
   return res.status(200).json(activehideusers)
  })
}

// This is for active hide user
exports.hideUser = async function(req,res){
  await Friendslist.update({from:req.body.from,to:req.body.to,invitationStatus:'Accepted',fromhideshow:1},{$set:{fromhideshow:'value will be updated'}},function(err,updatehideuser1){
    }).then(()=>{
    });
  await Friendslist.update({to:req.body.from,from:req.body.to,invitationStatus:'Accepted',tohideshow:1},{$set:{tohideshow:'value will be updated'}},function(err,updatehideuser2){
    })
 await Friendslist.find({$or:[{from:req.body.from,invitationStatus:'Accepted',fromhideshow:"value will be updated"},{to:req.body.from,invitationStatus:'Accepted',tohideshow:'value will be updated'}]}).sort({time: -1}).populate('senderId').populate('receiverid').exec( function (err, hideuserres){
  Messages.find({senderId:req.body.senderId,receiverId:req.body.receiverId,messageStatus:{$ne:"seen"}},function(err,resp){
    let obj = {
      data:hideuserres,
      hideusermsglength:resp.length
    }
    return res.status(200).json(obj)
  })
 });
}

//  This is for video call 
exports.videocall = function(req,res) {
  console.log("REQ BODY: ",req.body);
  Friendslist.find({senderId:req.body.loginuserid.id,receiverid:req.body.chatuserid._id},function(err,videocallresponse){
    let obj1 = {
      loginuser:req.body.chatuserid,
      chatuser:req.body.loginuserid     
    }
    if(videocallresponse.length != 0){
      // require('../../app').socket.emit('video:call',obj1); 
      return res.status(200).json(videocallresponse)
    }   
    Friendslist.find({senderId:req.body.chatuserid._id,receiverid:req.body.loginuserid.id},function(err,videocallresponse2){
      let obj2 = {
      loginuser : req.body.chatuserid,
      chatuser:req.body.loginuserid
      }
      console.log("videocallresponse2: ",videocallresponse2)
      if(videocallresponse2.length != 0){
        // require('../../app').socket.emit('video:call',obj2);
        return res.status(200).json(videocallresponse2)
      }   
    })
  })
  // return res.status(200).json('Return from VideoCall backend.');
}


// This is for incognito chat       
exports.INCOGNITOCHAT = function(req,res){
  Friendslist.find({senderId:req.body.loginuserid,receiverid:req.body.chatuserid},function(err,incognitoresponse){
    let obj1 = {
      loginuser:req.body.chatuserid,
      chatuser:req.body.loginuserid     
    }
    if(incognitoresponse.length != 0){
      require('../../app').socket.emit('incognito:chat',obj1);
      return res.status(200).json(incognitoresponse)
    }   
    Friendslist.find({senderId:req.body.chatuserid,receiverid:req.body.loginuserid},function(err,incognitoresponse2){
      let obj2 = {
      loginuser : req.body.chatuserid,
      chatuser:req.body.loginuserid
      }
      if(incognitoresponse2.length != 0){
        require('../../app').socket.emit('incognito:chat',obj2);
        return res.status(200).json(incognitoresponse2)
      }   
    })
  })
}

// This is for unhideAll users
exports.unhideuseall =  function(req,res){
  Friendslist.find({$or:[{from:req.body.EmailId,fromhideshow:1},{to:req.body.EmailId,tohideshow:1}]},async function(err,resp){
    console.log("resppppppppp",resp.length)
   for(var i=0;i<resp.length;i++){
     if(resp[i].from == req.body.EmailId){
      console.log("ressss",resp[i])
      await Friendslist.findOneAndUpdate({_id:resp[i]._id},{$set:{fromhideshow:'value will be updated'}},{new:true},function(err,res){
        console.log("testttttttttttt",res)
       })
     }else if(resp[i].to == req.body.EmailId){
       console.log("ressss1",resp[i])
     await Friendslist.findOneAndUpdate({_id:resp[i]._id},{$set:{tohideshow:'value will be updated'}},{new:true},function(err,res1){
       console.log("test1111111111",res1)
       })
     }
     if(i == resp.length-1){
   await Friendslist.find({$or:[{from:req.body.EmailId,invitationStatus:'Accepted',fromhideshow:"value will be updated"},{to:req.body.EmailId,invitationStatus:'Accepted',tohideshow:'value will be updated'}]}).sort({time: -1}).populate('senderId').populate('receiverid').exec( function (err, unhideallusersres){
       console.log("*************************",unhideallusersres.length)
    return res.status(200).json(unhideallusersres)
     });
    }
   }
 })
}


// This is for block contacts list
exports.blockcontactlist = function(req,res){
  console.log(req.body)
  Friendslist.find({$or:[{from:req.body.EmailId,fromblockingStatus:'blocked'},{to:req.body.EmailId,toblockingStatus:'blocked'}]},function(err,blockedcontactslist){    console.log("blocked contacts list",blockedcontactslist);
  return res.status(200).json(blockedcontactslist)
  })
}


function handleError(res, err) {
  return res.status(500).send(err);
}
