'use strict';

var _ = require('lodash');
var Invitation = require('./invitation.model');
const nodemailer = require('nodemailer');
var async = require('async');
const moment = require('moment');
var crypto = require('crypto');
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var key = '123';
var User = require('../user/user.model');
var Groupmember = require('../groupmember/groupmember.model');

// Get list of invitations
exports.index = function(req, res) {
  Invitation.find(function (err, invitations) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(invitations);
  });
};

// get list of friends
exports.getFriends = function(req, res) {
  var id = req.user._id;
  Invitation.find({
    $or:[
      {senderId: id},
      {receiverid:id}]
  }, function(err, Friends) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(Friends);
    });
}

// Get a single invitation
exports.show = function(req, res) {
  Invitation.findById(req.params.id, function (err, invitation) {
    if(err) { return handleError(res, err); }
    if(!invitation) { return res.status(404).send('Not Found'); }
    return res.json(invitation);
  });
};

// Creates a new invitation in the DB.
exports.create = function (req, res) {
  var urllink=null;
  console.log(req.body.emaillist)
  for (let email of req.body.emaillist) {
    urllink = req.body.weburl + "/?slug=" + req.body.sender.slug + "/" + email;
    console.log("urllink: ", urllink);
    var mailCreatedAt = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
    var mailExpiredAt = moment().add(1800, 'seconds').format('ddd, MMM D, YYYY hh:mm:ss A');
    var usersdata = { active: true, GroupId: null, urllink: urllink,EmailId: email, senderId: req.body.sender.id, senderEmailId: req.body.sender.EmailId, senderName: req.body.sender.Name, expire_At: mailExpiredAt, createdAt: mailCreatedAt, updatedAt: mailCreatedAt};
    console.log("usersdata: ", usersdata)
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
        to: email,
        subject: 'INVITATION ✔',
        text: 'Hello',
        html: "Click here to join the ChatApp : " + urllink
        // html: 'http://localhost:4200/?'+  req.body.slug + '/' + req.body.EmailId 
      };
      User.countDocuments({EmailId: email},function(err1,res1) {
        if(err1) throw err1;
        console.log("Count: ",res1);
        if(res1==0) {
          Invitation.find({EmailId: email,senderEmailId: req.body.sender.EmailId},function(err2,res2){
            if(err2) throw err2;
            if(res2.length==0) {
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) throw error
                 console.log("usersdata: ",usersdata);
                 Invitation.create(usersdata,function(err3,res3){
                   if(err3) throw err3;
                  console.log("response",res3)
                 })               
              });
            }
            else {
              for(let response of res2) {
                let presentTime = moment().format();
                let expireTime = moment(response.expire_At).format();
                if(presentTime<=expireTime) {
                }
                else {
                  Invitation.deleteOne(response,function(err4,res4) {
                    if(err4) throw err4
                    console.log("Invalid Invitation Deleted.");
                  })
                }                
              }
              Invitation.countDocuments({EmailId: email,senderEmailId: req.body.sender.EmailId},function(err5,res5){
                if(res5>0) {
                }
                else {
                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) throw error
                     req.body.slug = req.body.slug;
                     // usersdata.Emailid='';
                     console.log("usersdata: ",usersdata);
                     Invitation.create(usersdata,function(err3,res3){
                       if(err3) throw err3;
                      console.log("response",res3)
                     })               
                  });
                }
              })
            }
          })
        }
        else {
          
        }
        
      })
    });
  }
  return res.status(200).json("Success");
}

// Updates an existing invitation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Invitation.findById(req.params.id, function (err, invitation) {
    if (err) { return handleError(res, err); }
    if(!invitation) { return res.status(404).send('Not Found'); }
    var updated = _.merge(invitation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(invitation);
    });
  });
};

// Deletes a invitation from the DB.
exports.destroy = function(req, res) {
  Invitation.findById(req.params.id, function (err, invitation) {
    if(err) { return handleError(res, err); }
    if(!invitation) { return res.status(404).send('Not Found'); }
    invitation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.GroupinvitationExpiry = function(req,res) {
  console.log("Group.body",req.body);
  let presentTime = moment().format();
  Invitation.findOne({$and:[{GroupId: req.body.GroupId},{senderId:req.body.InvitedBy},{EmailId:req.body.InviteeEmail}]},async function(req2,response){
    // console.log("invitationExpiry: ",response)
    if(response){
      let expireTime = moment(response.expire_At).format();
      console.log("expireTime: ",expireTime)
      console.log("presentTime: ",presentTime)
      if(presentTime <= expireTime) {
      res.status(200).json("SUCCESS");
      }
      else {
        await Invitation.remove(response,function(req1,res1) {
          console.log("Expired Invitation Deleted");
        });
        console.log("Req.body: ",req.body)
        await Groupmember.remove({$and:[{GroupId: req.body.GroupId},{memberEmailId: req.body.InviteeEmail}]},function(req3,res2) {
          console.log("Invalid Group Member deleted.")
        })
        return await res.status(401).json("Link Expired");
      }
    }
  });
}

exports.invitationExpiry = function(req,res){   
  let obj = {
    slug : req.body.invitationexpirydata.slug,
    EmailId : req.body.invitationexpirydata.email
  };
  let presentTime = moment().format();
  Invitation.findOne(obj,(req,response)=>{
    console.log("invitationExpiry: ",response)
    if(response){
      let expireTime = moment(response.expire_At).format();
      if(presentTime <= expireTime) {
      res.status(200).json("SUCCESS");
      }
    }
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}