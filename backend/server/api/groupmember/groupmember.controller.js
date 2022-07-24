'use strict';
``

var _ = require('lodash');
var Groupmember = require('./groupmember.model');
var async = require('async')
var User = require('../user/user.model')
var Notification = require('../notification/notification.model');
var Invitation = require('../invitation/invitation.model');
const nodemailer = require('nodemailer');
const moment = require('moment');
var Group = require('../group/group.model');

// Get list of groupmembers
exports.index = function (req, res) {
  Groupmember.find(function (err, groupmembers) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(groupmembers);
  });
};

// Get a single groupmember
exports.show = function (req, res) {
  Groupmember.findById(req.params.id, function (err, groupmember) {
    if (err) {
      return handleError(res, err);
    }
    if (!groupmember) {
      return res.status(404).send('Not Found');
    }
    return res.json(groupmember);
  });
};

// Creates a new groupmember in the DB.
exports.create = function (req, res) {
  Groupmember.create(req.body, function (err, groupmember) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(groupmember);
  });
};
//Getting groups 
exports.getgroups = function (req, res) {
  console.log("Params ID: ",req.params.id);
  Groupmember.find({
      $and: [{
        memberId: req.params.id
      }, {
        isJoin: 'Accepted'
      }, {
        deletedStatus: true
      }]
    }).populate('GroupIcon').populate('creatorId','Name EmailId').populate('memberId','Name EmailId').populate('GroupId','GroupName Type Role creatorName creatorEmailId deletedStatus').exec(function (err, result) {
      if (err) throw err;
      console.log("Fetched Groups: ", result)
      return res.status(200).json(result)
    })
}

exports.getgroups2 = function (req, res) {

  Groupmember.find({
      GroupId: req.params.id
    })
    .populate('creatorId','Name EmailId').populate('memberId','Name EmailId').populate('GroupId','GroupName Type Role creatorName creatorEmailId deletedStatus').exec(function (err, result) {
      console.log("Result of new document: ", result)
      if (err) throw err;
      return res.status(200).json(result)
    })
}

//adding members in a group
exports.addingMembers = function (req, res) {
  var weburl = req.body.weburl;

  for(let member of req.body.members) {
    if(member.category == "1") {
      console.log("Category 1 member: ", member)
      Groupmember.create({
        GroupId: req.body.groupId._id,
        Grname :  req.body.groupId.GroupName,
        creatorId: req.body.creatorId,
        isJoin: "Pending",
        gSenderId:req.user._id,
        memberId: member.id,
        messageNotification: false,
        memberEmailId: member.emailid,
        referrerID: req.body.referrerID,
        referrerEmailId: req.body.referrerEmailId
      }, function (err, response) {
        if (err) throw err;
        createNotification(response)
        // res.status(201).json("success")
      })
    }
    else if (member.category == "2") {
      console.log("Category 2 member: ", member)
      var flag = false;
      User.findOne({EmailId: member.emailid}, function(err,res1) {
        if(err) throw err;
        if(res1) {
          console.log("res1: ",res1);
          Groupmember.create({
            GroupId: req.body.groupId._id,
            Grname :  req.body.groupId.GroupName,
            creatorId: req.body.creatorId,
            isJoin: "Pending",
            gSenderId:req.user._id,
            memberId: res1._id,
            messageNotification: false,
            memberEmailId: res1.EmailId,
            referrerID: req.body.referrerID,
            referrerEmailId: req.body.referrerEmailId
          }, function (err1, response) {
            if (err1) throw err;
            console.log("response1: ", response);
            createNotification(response);
            // res.status(200).json("success")
          })
        }
        else {
          Groupmember.create({
            GroupId: req.body.groupId._id,
            Grname :  req.body.groupId.GroupName,
            creatorId: req.body.creatorId,
            isJoin: "Pending",
            gSenderId:req.user._id,
            memberId: null,
            messageNotification: false,
            memberEmailId: member.emailid,
            referrerID: req.body.referrerID,
            referrerEmailId: req.body.referrerEmailId
          },function(err1,response) {
            if(err1) throw err1;
            console.log("response2: ", response);
            var groupurllink = weburl + '/?join=' + req.body.groupId._id + '&a=' + req.body.userEmail.id + '&b=' + member.emailid;
            var mailCreatedAt = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
            var mailExpiredAt = moment().add(1800, 'seconds').format('ddd, MMM D, YYYY hh:mm:ss A');
            nodemailer.createTestAccount((err, account) => {
              let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 25,
                secure: false,
                auth: {
                  user: 'rahul.pentakota@cognitiveinnovations.in',
                  pass: 'anna@COGNITIVE'
                }
              });

              // setup email data with unicode symbols
              let mailOptions = {
                from: '"CHATINTACT 👻" <rahul.pentakota@cognitiveinnovations.in>',
                to: member.emailid,
                subject: 'GROUP INVITATION ✔',
                text: 'Hello. ' + req.body.userEmail.Name + ' has asked you to join the group: ' + req.body.groupId.GroupName,
                html: "Click here to join the ChatApp : " + groupurllink
                // html: 'http://localhost:4200/?'+  req.body.slug + '/' + req.body.EmailId 
              };
              console.log('mailoptions', mailOptions.html);
                  Invitation.find({
                    $and: [{
                      EmailId: member.emailid
                    }, {
                      senderId: req.body.userEmail.id
                    }, {
                      GroupId: req.body.groupId._id
                    }]
                  }, function (err, response) {
                    console.log(response);
                    var flag = 0;
                    if (response.length == 0) {
                      flag = 1;                        
                    }
                    else {
                      for(let resp of response) {
                        var currentTime = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
                        if(currentTime>resp.expire_At) {
                          Invitation.deleteOne(resp,function(err,response1) {
                            flag = 1;
                          })
                        }
                      }
                    }
                    if(flag==0) {
                      console.log("Invitation Exists.");
                      // res.status(406).json("Invitation Exists.")
                    }
                    else {
                      transporter.sendMail(mailOptions, (error, info) => {
                        // if (error) throw error;
                           console.log("Response from nodemailer: ",info);
                         console.log("Nodemailer EMail: ", member.emailid)
                          Invitation.create({
                            EmailId: member.emailid,
                            slug: req.body.userEmail.slug,
                            urllink: groupurllink,
                            senderId: req.body.userEmail.id,
                            senderEmailId: req.body.userEmail.EmailId,
                            create_At: mailCreatedAt,
                            expire_At: mailExpiredAt,
                            GroupId: req.body.groupId._id
                          }, function (err, resp) {
                              console.log("resp: ", resp);
                            })
                       });
                      //  res.status(201).json("Invitation created.");
                    }
                  });
            });
          })
        }
      })
    }
  }
  return res.status(200).json("Invitation Sent");
}
// Create Notification for adding member
function createNotification(data) {
  console.log("nc", data)
  var notificationdata = {
    Grid: data._id,
    creatorId: data.creatorId,
    memberId: data.memberId,
    status: data.isJoin,
    read: 'false',
    type: 'GroupRequest'
  }
 

  Notification.create(notificationdata, (err, response) => {
   
    if (err) throw err;
    else {
      Notification.findById({_id:response._id}).populate('creatorId').populate('memberId').exec((error, resultInfo)=>{
        if(error) throw error;
        console.log('666',resultInfo);
        require('../../app').socket.emit('groupNotifications:save', resultInfo);
      })
    }
  });
}
//Invitations of groups
exports.getInvitations = function (req, res) {


  Groupmember.find({
    $and: [{
      memberId: req.params.id
    }, {
      isJoin: 'Pending'
    }, {
      deletedStatus: true
    }]
  }).populate('GroupId','GroupName Type Role creatorName creatorEmailId deletedStatus').populate('creatorId','Name EmailId').populate('memberId','Name EmailId').populate('gSenderId','Name EmailId').sort({
    create_At: -1
  }).exec(function (err, response) {
    if (err) throw err;
    return res.status(200).json(response)

  })
}
//Updating status of member
exports.updateMemberStatus = function (req, res) {
  console.log('444',req.body);
  if (req.body.status === 'Rejected') {
    Groupmember.findOneAndUpdate({_id:req.body.id}, {$set:{isJoin:req.body.status}},{new:true},function(err,responsed){
            if (err) throw err;
              return res.status(200).json('Rejected');    
    })
  } else {
    Groupmember.findOneAndUpdate({
      _id: req.body.id
    }, {
      $set: {
        isJoin: req.body.status
      }
    }, {
      new: true
    }).populate('creatorId').populate('memberId').populate('GroupId').exec((err, data) => {
      if (err) throw err;
      else {
        createNotification(data);
        require('../../app').socket.emit('updateGroup:save', data);
        console.log("updatestatus", data);
       }
      return res.status(200).json(data);
    })
  }

}
// Getting members list to login
exports.gettingMembers = function (req, res) {
 
  Groupmember.find({ $and: [{
      GroupId: req.params.id}, {$or: [{  isJoin: "Accepted"}, {isJoin: "Pending"}]
    }, {
      deletedStatus: true
    }, {
      isLeave: false
    }, {
      isRemoved: false
    }, {
      isBlocked: false
    }]
  }, function (err, result) {
 
    if (err) throw err;
    return res.status(200).json(result);
  })
}
// View members
exports.viewMembers = function (req, res) {
  Groupmember.find({
    $and: [{
      GroupId: req.params.id
    }, {
      isJoin: 'Accepted'
    }, {
      deletedStatus: true
    }]
  }).populate('GroupId').populate('creatorId').populate('memberId').exec((err, result) => {
    if (err) throw err;
  
    return res.status(200).json(result)

  })
}

//getting Count of members
exports.gettingCount = function (req, res) {

  Groupmember.find({
    $and: [{
      GroupId: req.params.id
    }, {
      isJoin: 'Accepted'
    }, {
      deletedStatus: true
    }]
  }, function (err, count) {
    if (err) throw err;
    return res.status(200).json(count)
  })
}
//Leave the group
exports.leaveGroup = function (req, res) {
  Groupmember.find({$and:[{
    GroupId: req.params.gid
  },{isJoin:'Accepted'}]}, (err, result) => {
    if (err) throw err
    else if (result.length == 1) {


      Group.update({
        _id: req.params.gid
      }, {
        $set: {
          deletedStatus: false
        }
      }, (err, del) => {
        if (err) throw err;
        console.log(del);
          Groupmember.updateMany({
            GroupId: req.params.gid
          }, {
            $set: {
              deletedStatus: false
            }
          },{new:true}, (err, deleteRes) => {
            if (err) throw err;
            require('../../app').socket.emit('gleave:save', deleteRes);
            return res.status(200).json(deleteRes);
          });
        })
    } else {
      Groupmember.findByIdAndUpdate({
        _id: req.params.did
      }, {
        $set: {
          deletedStatus: false
        }
      }, (err, deleteRes) => {
        if (err) throw err;
        require('../../app').socket.emit('gleave:save', deleteRes);
        return res.status(200).json(deleteRes);
      })
    }
  })


}
// Selected group details
exports.selectedGroup = (req, res) => {
  
  Groupmember.find({
    $and: [{
      GroupId: req.params.gid
    }, {
      memberId: req.params.id
    }, {
      deletedStatus: true
    }]
  }).populate('GroupId','GroupName Type Role creatorName creatorEmailId deletedStatus').populate('creatorId','Name EmailId').populate('memberId','Name EmailId').exec((err, result) => {
    if (err) throw err;
    

    return res.status(200).json(result)

  })

}
// Updates an existing groupmember in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Groupmember.findById(req.params.id, function (err, groupmember) {
    if (err) {
      return handleError(res, err);
    }
    if (!groupmember) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(groupmember, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(groupmember);
    });
  });
};

// Deletes a groupmember from the DB.
exports.destroy = function (req, res) {
  Groupmember.findById(req.params.id, function (err, groupmember) {
    if (err) {
      return handleError(res, err);
    }
    if (!groupmember) {
      return res.status(404).send('Not Found');
    }
    groupmember.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};
// mute and unmute notifications of groups
exports.muteBadge = function(req, res) {
Groupmember.findByIdAndUpdate({_id:req.body.id},{$set:{messageNotification:req.body.value}},{new:true}, function(err, result){
  if(err) throw err;
  console.log('999',result);
  require('../../app').socket.emit('gmute:save', result);
  
})
}
// Block And Unblock Groups
exports.groupblockstatus = function(req, res){
  Groupmember.findByIdAndUpdate({_id:req.body.id},{$set:{blockStatus:req.body.value}},{new:true}, function(err, result){
    if(err) throw err;
    console.log('999',result);
    require('../../app').socket.emit('gblock:save', result);
    
    
  })
}
// Star and Unstar Groups
exports.starStatus = function(req, res){
  console.log('33', req.body);
  Groupmember.findByIdAndUpdate({_id:req.body.id}, {$set: {starStatus:req.body.value}}, {new:true}, function(err, result){
    if(err) throw err;
    console.log('43', result);
    require('../../app').socket.emit('gstar:save', result);
    
    
  })

  
}
function handleError(res, err) {
  return res.status(500).send(err);
}