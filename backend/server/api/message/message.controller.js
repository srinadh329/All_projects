'use strict';
var _ = require('lodash'); 
var Message = require('./message.model');
var mqtt = require('mqtt');
// var client = mqtt.connect('mqtt://CHATAPP-DEV');
var client = mqtt.connect('mqtt://172.16.1.23');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
var user = require('../user/user.model');
var Friendslist = require('../friendslist/friendslist.model')
const moment = require('moment'); 
var media = require('../media/media.model')
//For generation hash key for the messages 
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); 
const iv = crypto.randomBytes(16);
var call = require('../call/call.model')

function encrypt(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
 }

// Get list of messages  
exports.index = function(req, res) {
  Message.find(function (err, messages) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(messages);
  });
};

// This function will execute for get messages   
exports.show = function(req,res){  
  Friendslist.findOne({_id:req.params.id},function(err,response){
  if(response){ 
      if(JSON.stringify(response.senderId)==JSON.stringify(req.user._id)){
        Message.find({receiverId:response.senderId,senderId:response.receiverid,
          messageStatus:{$ne:"seen"}}).populate('reciverimg').populate('senderimg').populate('preciverimg').populate('psenderimg').exec(function(err,message1){
          if(message1.length != 0){
            for(var i=0;i<message1.length;i++){
              Message.findOneAndUpdate({_id:message1[i].id},{$set:{messageStatus:"seen"}},{new:true},function(err,resp){
             }) 
           }   
          } 
        })
      } 
    if(JSON.stringify(response.receiverid)==JSON.stringify(req.user._id)){ 
    Message.find({receiverId:response.receiverid,senderId:response.senderId,
      messageStatus:{$ne:"seen"}}).populate('uid').
      exec(function(err,message2){
      if(message2.length != 0){
          for(var i=0;i<message2.length;i++){    
            Message.findOneAndUpdate({_id:message2[i].id},{$set:{messageStatus:"seen"}},{new:true},function(err,resp){
              })  
            }  
          } 
        })
      } 
    Message.find({ $or : [{$and: [{receiverId: response.receiverid, senderId: response.senderId,deletingfriend:'value will be updated'}]}, 
    {$and: [{receiverId: response.senderId, senderId:response.receiverid,deletingfriend:'value will be updated'}]}]})
    .populate('media').populate('photo').populate('parentId').populate('pid').populate('reciverimg').populate('senderimg').populate('preciverimg').populate('psenderimg').exec(function (err, message) { 
    // require('../../app').socket.emit("msgReadRecipts",message)       
   return res.json(message)
        })
      }
     })
    };

 
// Subscriber invoking.
exports.subscriber = function(req, res) {
// var client2 = mqtt.connect('mqtt://172.16.1.25');
client.subscribe(req.body.userId.toString(), function() {
require('../../app').socket.emit('message',req.body) // to emit message to frontend
client.on('message', function(topic, message) {
  });
 });
}

// Editing messages 
exports.editMessage = function(req, res){  
  Message.findOneAndUpdate({_id:req.body.id},{$set:{photo:req.body.messageData.photo, message:req.body.messageData.message, Gps: req.body.messageData.Gps, locationurl: req.body.messageData.locationurl, locationlabel: req.body.messageData.locationlabel}},{new:true}).populate('parentId').populate('pid').populate('photo').exec(function(err, response){
    if(err) throw err;
    require('../../app').socket.emit('editedMessage:save',response) 
  })
  return res.status(200).json("Message Updated")
}




//This function will execute when sending a new msg 
exports.create = async function(req,res){
  if(req.body.message){
    var  urllink = req.body.message.includes("http");
    }
    // if(req.body.message)
    console.log("parent123",req.body);
  if(req.body.parentId){
    var ress = '';
   var pid = '';
   var preciverimg ='';
   var psenderimg = '';
    var parent = req.body.parentId;
    if(ress == '') ress = await functionA(parent);
    var result  = ress;
    var photo = result.photo;
    var media = result.media;
    if(photo.length == 0){
       pid = media;
    } else {
       pid = photo[0];
    }

    if(req.body.parentId != null){
      console.log("456",req.body.preciverimg,req.body.psenderimg);
      preciverimg = req.body.preciverimg,
     psenderimg = req.body.psenderimg
    } else {
      preciverimg = "null",
      psenderimg = "null"
    }
    

    } 
  if(req.body.message != null || req.body.photo.length != 0 || req.body.media != null || req.body.Gps.latitude != null){
  if(req.body.message == null && req.body.photo.length!=0) {

    if((req.body.photo[0] !=undefined && req.body.media == null)) var encrypted=encrypt(req.body.photo[0]); else {var encrypted =encrypt(req.body.media)}
    var obj = {
    photo:req.body.photo,
    message:req.body.message,
    senderId:req.body.senderId,
    senderEmail:req.body.senderEmail,
    senderName:req.body.senderName,
    receiverId:req.body.receiverId,
    receiverEmailId:req.body.receiverEmailId,
    MessageHash: encrypted.encryptedData,
    media:req.body.media,
    deletingfriend:"value will be updated",
    messageStatus:"value will be updated",
    deletingMsgstatus :"value will be updated",
    Gps:req.body.Gps,
    locationurl:req.body.locationurl,
    locationlabel: req.body.locationlabel,
    incognito : req.body.incognito,
    incognitoStatus:req.body.incognitoStatus,
     parentId:req.body.parentId,
     pid:pid,
     urlLink: urllink? "urllink" : "null",
     reciverimg:req.body.receiverId,
     senderimg:req.body.senderId,
     preciverimg:preciverimg,
     psenderimg:psenderimg
     
  }
 
  }else if(req.body.message!=null){
    console.log("Condition 2");
    var padding="";
    var str;
    if(req.body.message.length>=24) {
      str= req.body.message.substr(0,12);
      for(let i=0;i<12;i++)
      {
        padding=padding+String.fromCharCode(Math.floor((Math.random() * (90 - 65)) + 65));
      }
      console.log("Padding: ",padding);
      str=req.body.message+padding;
    }
    else if(req.body.message.length<24) {
      
      for(let i=0;i<24-req.body.message.length;i++)
      {
        padding=padding+String.fromCharCode(Math.floor((Math.random() * (90 - 65)) + 65));
      }
      console.log("Padding: ",padding);
      str=req.body.message+padding;
    }
    var encrypted = encrypt(str);
    

    var obj = {
      photo:req.body.photo,
      message:req.body.message,
      senderId:req.body.senderId,
      senderEmail:req.body.senderEmail,
      senderName:req.body.senderName,
      receiverId:req.body.receiverId,
      receiverEmailId:req.body.receiverEmailId,
      MessageHash: encrypted.encryptedData,
      media:req.body.media,
      deletingfriend:"value will be updated",
      messageStatus:"value will be updated",
      deletingMsgstatus :"value will be updated",
      Gps:req.body.Gps,
      locationurl:req.body.locationurl,
      locationlabel: req.body.locationlabel,
      incognito : req.body.incognito,
      incognitoStatus:req.body.incognitoStatus,
      parentId:req.body.parentId,
      pid:pid,
      urlLink: urllink? "urllink" : "null",
      reciverimg:req.body.receiverId,
      senderimg:req.body.senderId,
      preciverimg:preciverimg,
      psenderimg:psenderimg
    }
    
  }
  else if((req.body.message==null && req.body.photo.length==0) &&(req.body.Gps!=null)) {
    console.log("Condition 3");
    str=req.body.Gps.latitude.toString()+":"+req.body.Gps.longitude.toString();
    console.log("typeof: ",typeof str);
      console.log("Hash Location Input: ",str);
      var encrypted = encrypt(str);
    var obj = {
      photo:req.body.photo,
      message:req.body.message,
      senderId:req.body.senderId,
      senderEmail:req.body.senderEmail,
      senderName:req.body.senderName,
      receiverId:req.body.receiverId,
      receiverEmailId:req.body.receiverEmailId,
      MessageHash: encrypted.encryptedData,
      media:req.body.media,
      deletingfriend:"value will be updated",
      messageStatus:"value will be updated",
      deletingMsgstatus :"value will be updated",
      Gps:req.body.Gps,
      locationurl:req.body.locationurl,
      locationlabel: req.body.locationlabel,
      incognito : req.body.incognito,
      incognitoStatus:req.body.incognitoStatus,
      parentId:req.body.parentId,
      pid:pid,
      urlLink: urllink? "urllink" : "null",
      reciverimg:req.body.receiverId,
      senderimg:req.body.senderId,
      preciverimg:preciverimg,
      psenderimg:psenderimg

    }
  
  }else if((req.body.message==null && req.body.photo.length==0) && (req.body.media !=null)) {

    
    var encrypted = encrypt(req.body.media);
    var obj = {
    photo:req.body.photo,
    message:req.body.message,
    senderId:req.body.senderId,
    senderEmail:req.body.senderEmail,
    senderName:req.body.senderName,
    receiverId:req.body.receiverId,
    receiverEmailId:req.body.receiverEmailId,
    MessageHash: encrypted.encryptedData,
    media:req.body.media,
    deletingfriend:"value will be updated",
    messageStatus:"value will be updated",
    deletingMsgstatus :"value will be updated",
    Gps:req.body.Gps,
    locationurl:req.body.locationurl,
    locationlabel: req.body.locationlabel,
    incognito : req.body.incognito,
    incognitoStatus:req.body.incognitoStatus,
    parentId:req.body.parentId,
    pid:pid
    
    }

    }

  oneToOnePublish(req.body.receiverId.toString(),JSON.stringify(req.body));
  Friendslist.findOne({$or:[{senderId:req.body.senderId,receiverid:req.body.receiverId},{senderId:req.body.receiverId,receiverid:req.body.senderId}]},function(err,response){
  //  if(response.fromblockingStatus != "blocked" && response.toblockingStatus != "blocked"){
    if(response.senderId == req.body.senderId){
      if(response.fromblockingStatus == "blocked"){
        return res.status(200).json("senderblocked");  
      }
        if(response.toblockingStatus == "blocked"){ 
        return res.status(200).json("receiverblocked")
        }
    }
    if(response.receiverid == req.body.senderId){
      if(response.fromblockingStatus == "blocked"){
        return res.status(200).json("receiverblocked");  
      }
        if(response.toblockingStatus == "blocked"){ 
        return res.status(200).json("senderblocked")
        }
    }
  Message.create(obj, function(err, message){    
 if(message.receiverId == response.senderId){
 Friendslist.findOneAndUpdate({_id:response._id},{$set:{time:Date.now()}},{new:true},function(err,resptime){
    })
 }else if(message.receiverId == response.receiverid){
Friendslist.findOneAndUpdate({_id:response._id},{$set:{time:Date.now()}},{new:true},function(err,resptime){
  })
}
  user.findOne({_id:req.body.receiverId},function(err,docs){
  if(docs.loginStatus == 1){
  Message.findOneAndUpdate({_id:message._id},{$set:{messageStatus:"✔✔"}},function(req,updateMessage){
  Message.findOne({_id:updateMessage._id},async function(err,updatedMessage){
  updatedMessage = await updatedMessage.populate('media').populate('senderimg').populate('reciverimg').populate('preciverimg').populate('psenderimg').populate('photo').populate('pid').populate('parentId').execPopulate()
  if(updateMessage.incognito == 'incognito chat'){
// when user sends the msg in incognito mode then it will update after settimeout time
    setTimeout(function() {
      Message.findOneAndUpdate({create_At:updateMessage.create_At},{$set:{incognitoStatus:"1"}},{new:true},function(err,deleteres){
        if(deleteres.message != null){
          Message.findOneAndUpdate({_id:deleteres._id},{$set:{message:"incognito chat"}},{new:true},function(err,ressp){
          })
        }else if(deleteres.photo.length != 0){
          Message.findOneAndUpdate({_id:deleteres._id},{$set:{photo:"incognito chat"}},{new:true},function(err,ressp1){
          })
        }
      require('../../app').socket.emit('incognitodelres',deleteres) 
      })
    },30000); 
  }
  require('../../app').socket.emit('message',updatedMessage)   
   setTimeout(function(){
    Message.findOne({_id:updateMessage._id}).populate('media').populate('photo').
    populate('pid').populate('parentId').populate('senderimg').populate('reciverimg').populate('preciverimg').populate('psenderimg').exec(function(err,seenMsg){
    if(err) { return handleError(res, err); }
    return res.status(200).json(seenMsg); 
       })
     },150);
        })
      })
  }else{
  Message.findOneAndUpdate({_id:message._id},{$set:{messageStatus:"✔"}},function(err,updateMessage){  
  Message.findOne({_id:updateMessage._id},async function(err,updatedMessage){
    updatedMessage = await updatedMessage.populate('media').populate('photo').populate('senderimg').populate('reciverimg').populate('preciverimg').populate('psenderimg').populate('pid').populate('parentId').execPopulate()
    require('../../app').socket.emit('message',updatedMessage)  
  if(err) { return handleError(res, err); }
 // if user is offline then msg will sent to user's  mail 
    user.findOne({EmailId:req.body.receiverEmailId},function(err,userresponse){
      if(userresponse.slidedata == "1"){
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
          let mailOptions = {
            from: '"CHATINTACT 👻" <rahul.pentakota@cognitiveinnovations.in>',
            to: req.body.receiverEmailId, 
            subject: 'Message  ✔',
            text:req.body.message
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              updatedMessage.emailsentmsg = 1;
              console.log('Email sent: ' + info.response);
              return res.status(200).json(updatedMessage);
            }
          });
        });
      }else{
        return res.status(200).json(updatedMessage);
      }
    })
    // return res.status(200).json(updatedMessage);
        })         
      })
     } 
    })
  });
// }
})
}
};
async function functionA(parent){
  return new Promise((resolve, reject) => {
    Message.findOne({_id:parent}, function(err,result){
      var photo = result.photo;
      if(result.length!='0'){
        resolve(result);
      } 
     
    });
  })
}


// This function will execute for updating the seen msg 
exports.seenmsg = function(req,res){
  Message.find({senderId:req.body.senderId,receiverId:req.body.receiverId,messageStatus:{$ne:"seen"}},function(err,seenmsg){       
  seenmsg.forEach(function(item){
  Message.update(item,{$set:{messageStatus:"seen"}},{new:true},function(err,helloresponse){
     })
    })    
   })
  }

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Message.findById(req.params.id, function (err, message) {
    if (err) { return
      handleError(res, err); }
    if(!message) { return res.status(404).send('Not Found'); }
    var updated = _.merge(message, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(message);
    });
  });
};

// Deletes a message from the DB.
exports.destroy = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.status(404).send('Not Found'); }
    message.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};


// publishing one to one message
function oneToOnePublish(id,msg) {
client.publish(id, msg , function() {
console.log('message is publishing (one to one)');
  })
return;
}

// publishing one to many messages
function oneToManyPublish(id,msg) {
for(var i=0; i<id.length; i++) {
client.publish(id[i], msg, function(){
console.log('message is publishing (one to many)');
})
}
return;
}


// This function will be execute when user clicks clear chat     
exports.deletingAllmsgs = function(req,res){  
  let array1 = []
  let sendmsgobj = {
    senderId :req.body.loginuser,
    receiverId : req.body.chatuser 
  }
  let recmsgobj ={
    senderId :  req.body.chatuser,
    receiverId : req.body.loginuser
  }
  Message.find({$and:[{$or:[sendmsgobj,recmsgobj]},{deletingMsgstatus:'value will be updated',fromStaredMessage:'0',toStaredMessage:'0'}]}, function(err,docs){
    console.log("docssss",docs)
    if(docs.length != 0 && docs != null){
    for(var i=0;i<docs.length;i++){
    Message.findOneAndUpdate({_id:docs[i]._id},{$set:{deletingMsgstatus:"1"}},{new:true},function(err,response){
    array1.push(response)
    if(array1.length == docs.length){
    Message.find({$and:[{$or:[sendmsgobj,recmsgobj]},{deletingfriend:'value will be updated'}]}).populate('reciverimg').populate('senderimg').exec(function(err,deletingAllMsghashdata){
    require('../../app').socket.emit('deletingallmsg',deletingAllMsghashdata)
    return res.status(200).json(deletingAllMsghashdata)
        })
       }
      });      
     }     
    }
  })
}

// This function will execute when user clicks a single msg deleting
exports.deletingSinglemsg = function(req,res){    
  Message.findOne({_id:req.body._id},function(err,response){
  if(response.deletingMsgstatus != 1){
  Message.findOneAndUpdate({_id:req.body._id},{$set:{deletingMsgstatus:1}},{new:true}).populate('reciverimg').populate('senderimg').populate('media').populate('photo').populate('reciverimg').populate('senderimg').exec(function(err,updatedResponse){
  require('../../app').socket.emit('message:remove',updatedResponse)  
  return res.status(200).json(updatedResponse);
      })
    }else return res.status(200).json("you already deleted the message");
  })
}

exports.undeletingSinglemsg = function(req,res){   
  Message.findOne({_id:req.body._id},function(err,response){
  if(response.deletingMsgstatus != 0){
  Message.findOneAndUpdate({_id:req.body._id},{$set:{deletingMsgstatus:"value will be updated"}},{new:true}).populate('media').populate('photo').exec(function(err,updatedResponse){
  require('../../app').socket.emit('message:undo',updatedResponse)
  return res.status(200).json(updatedResponse);
      });
    }else return res.status(200).json("you already restored the message");
  })
}

// This functin will execute when user clicks on star message    'msgremfav'
exports.staredMessage = function(req,res){
  Message.findOne({_id:req.body.data._id},function(err,response){
  if(response.senderId == req.body.data1){
  if(response.fromStaredMessage == 0){ 
  Message.findOneAndUpdate({_id:req.body.data._id},{$set:{fromStaredMessage:1}},{new:true}).populate('photo').populate('pid').populate('parentId').populate('media').populate('reciverimg').populate('senderimg').populate('preciverimg').populate('psenderimg').exec(function(err,updatedResponse1){
  require('../../app').socket.emit('msgremfav',updatedResponse1);
  return res.status(200).json(updatedResponse1)
   })
  }else{
  Message.findOneAndUpdate({_id:req.body.data._id},{$set:{fromStaredMessage:0}},{new:true}).populate('photo').populate('pid').populate('parentId').populate('media').populate('reciverimg').populate('senderimg').populate('preciverimg').populate('psenderimg').exec(function(err,updatedResponse2){
  require('../../app').socket.emit('msgremfav',updatedResponse2);
  Message.find({$or:[{senderId:req.body.data1,fromStaredMessage:'1'},{receiverId:req.body.data1,toStaredMessage:'1'}]}).populate('photo').populate('pid').populate('parentId').populate('media').populate('reciverimg').populate('senderimg').populate('preciverimg').populate('psenderimg').exec(function(err,updatedResponse5){
  return res.status(200).json(updatedResponse5)
      });
     })
    }
   }
  if(response.receiverId == req.body.data1){
  if(response.toStaredMessage ==0){
  Message.findOneAndUpdate({_id:req.body.data._id},{$set:{toStaredMessage:1}},{new:true}).populate('photo').populate('pid').populate('parentId').populate('media').populate('reciverimg').populate('senderimg').populate('preciverimg').populate('psenderimg').exec(function(err,updatedResponse3){
  require('../../app').socket.emit('msgremfav',updatedResponse3);
  return res.status(200).json(updatedResponse3)
   })
  }else{
  Message.findOneAndUpdate({_id:req.body.data._id},{$set:{toStaredMessage:0}},{new:true}).populate('reciverimg').populate('senderimg').populate('preciverimg').populate('psenderimg').populate('photo').populate('pid').populate('parentId').populate('media').exec(function(err,updatedResponse4){
  require('../../app').socket.emit('msgremfav',updatedResponse4);
  Message.find({$or:[{senderId:req.body.data1,fromStaredMessage:'1'},{receiverId:req.body.data1,toStaredMessage:'1'}]}).populate('reciverimg').populate('senderimg').populate('preciverimg').populate('psenderimg').populate('photo').populate('pid').populate('parentId').populate('media').exec(function(err,updatedResponse6){
  return res.status(200).json(updatedResponse6)
    });
     })
    }
   }
  })
  }


// This functin will execute when user login for getting blocking response
exports.blockinguser1 = function(req,res){
  Friendslist.findOne({$or:[{from:req.body.from,to:req.body.to},{from:req.body.to,to:req.body.from}]},function(err,response){
  return res.status(200).json(response)
   })
  }
  
  
  //This function will execute when user clicks block 
  exports.blockinguser2 = function(req,res){
    if(req.body ){
    Friendslist.findOne({from:req.body.senderEmailId,to:req.body.recieverEmailId},function(err,response){
    if(response){
    if(response.fromblockingStatus != "blocked"){
    Friendslist.findOneAndUpdate({from:req.body.senderEmailId,to:req.body.recieverEmailId},{$set:{fromblockingStatus:"blocked"}},{new:true}).populate('senderId','Name path EmailId loginStatus updatedAt onCall').populate('receiverid','Name path EmailId loginStatus updatedAt onCall').sort({time: -1}).exec(function (err, updatedResponse){
      require('../../app').socket.emit('incognitoblockres',updatedResponse);
    return res.status(200).json(updatedResponse)
       })
    }else{
    Friendslist.findOneAndUpdate({from:req.body.senderEmailId,to:req.body.recieverEmailId},{$set:{fromblockingStatus:"unblocked state"}},{new:true}).populate('senderId','Name path EmailId loginStatus updatedAt onCall').populate('receiverid','Name path EmailId loginStatus updatedAt onCall').sort({time: -1}).exec(function (err, updatedResonse2){
      require('../../app').socket.emit('incognitoblockres',updatedResonse2);
    return res.status(200).json(updatedResonse2)
       })
      }
     }
    });
    
    Friendslist.findOne({from:req.body.recieverEmailId,to:req.body.senderEmailId},function(err,response){
    if(response){
    if(response.toblockingStatus != "blocked"){
    Friendslist.findOneAndUpdate({from:req.body.recieverEmailId,to:req.body.senderEmailId},{$set:{toblockingStatus:"blocked"}},{new:true}).populate('senderId','Name path EmailId loginStatus updatedAt onCall').populate('receiverid','Name path EmailId loginStatus updatedAt onCall').sort({time: -1}).exec(function (err, updatedResponse3){
      require('../../app').socket.emit('incognitoblockres',updatedResponse3);
    return res.status(200).json(updatedResponse3)
    })
      }else{
    Friendslist.findOneAndUpdate({from:req.body.recieverEmailId,to:req.body.senderEmailId},{$set:{toblockingStatus:"unblocked state"}},{new:true}).populate('senderId','Name path EmailId loginStatus updatedAt onCall').populate('receiverid','Name path EmailId loginStatus updatedAt onCall').sort({time: -1}).exec(function (err, updatedResponse4){
      require('../../app').socket.emit('incognitoblockres',updatedResponse4);
    return res.status(200).json(updatedResponse4)
         })
        } 
       }
      })
     }
    }
    
  
    //This function will execute when user clicks on sldeme toggle button   
    exports.slideforOfflinemsg = function(req,res){
      user.findOne({EmailId:req.body.data1},function(err,response){
      if(response.loginStatus == 0){
      if(response.slidedata == "0"){
      user.findOneAndUpdate({EmailId:req.body.data1},{$set:{slidedata:"1"}},{new:true},function(err,updatedresponse){
      return res.status(200).json(updatedresponse)
      })
        }else{
          user.findOneAndUpdate({EmailId:req.body.data1},{$set:{slidedata:"0"}},{new:true},function(err,updatedResponse){
          return res.status(200).json(updatedResponse)
         }) 
        }
       }
      }) 
     }



  // This function will execute when user clicks on forward message symbol for getting msg
    exports.forwardingmsg = function(req,res){
      Message.findOne(req.body,function(err,response){
      return res.status(200).json(response)
       })
      }

  // This function will execute when user clicks on star message ,{receiverId:req.body.id}
  exports.starmsg = function(req,res){
    Message.find({$or:[{senderId:req.body.loginuserdata.id,receiverId:req.body.chatuser._id,fromStaredMessage:1},{receiverId:req.body.loginuserdata.id,senderId:req.body.chatuser._id,toStaredMessage:1}]}).populate('photo').populate('media').populate('reciverimg').populate('senderimg').populate('preciverimg').populate('psenderimg').exec(function(err,response){
      return res.status(200).json(response)
    })
  }

    // This function will execute when user clicks on reply for the exact message
    exports.replymsgs = function(req,res){
      Message.findOne(req.body,function(err,response){
      return res.status(200).json(response)
       })
      }

     function handleError(res, err) {
      return res.status(500).send(err);
    }
 

    // This is for incognito accept request
    exports.incognitoAcceptChat4 = function(req,res){
      let data = req.body
      require('../../app').socket.emit('incogacp5',data);
      return res.status(200).json(data)
    }

      // This is for video call accept request
      exports.videoCallAccept4 = function(req,res){
        call.findOneAndUpdate({SenderID:req.body.chatuser,receiverid:req.body.loginuser},{$set:{Status:'Accepted'}},{new:true},function(err,respo){
          console.log("respooooooooo",respo)
          })
        let data = req.body
        require('../../app').socket.emit('videocallacp5',data);
        // return res.status(200).json(data)
      }

    // This is for incognito reject
    exports.incognitoRejectChat4 = function(req,res){
      let rejectData = req.body
      require('../../app').socket.emit('incogrjt',rejectData);
    }

      // This is for video call reject
      exports.videocallReject4 = function(req,res){
        call.findOneAndUpdate({SenderID:req.body.chatuser,receiverid:req.body.loginuser},{$set:{Status:'Rejected'}},{new:true},function(err,respo){
          console.log("respooooooooo",respo)
          })
        let rejectData = req.body
        require('../../app').socket.emit('videocallreject',rejectData);
      }

  // This is for incognito response wiil be null
    exports.showresponsenull = function(req,res){
      let data = req.body.data
      require('../../app').socket.emit('showresnull',data);
    }
    
    //getting messages based on date range
    exports.getmessages = function(req,res){ 
      console.log("tracking",req.body);
     var from_date = req.body.fromdate;
      // var from_date = "2020-8-13"
      var to_date   = req.body.todate;
      // var to_date   = "2020-8-15";
       Friendslist.findOne({_id:req.body.id},function(err,response){
         console.log("response1",response);
       if(response){ 
          //  if(JSON.stringify(response.senderId)==JSON.stringify(req.user._id)){
             Message.find({receiverId:response.senderId,senderId:response.receiverid,
               messageStatus:{$ne:"seen"},"create_At":{$gte:from_date,$lt:to_date}}).populate('reciverimg').populate('senderimg').exec(function(err,message1){
               if(message1.length != 0){
                 for(var i=0;i<message1.length;i++){
                   Message.findOneAndUpdate({_id:message1[i].id},{$set:{messageStatus:"seen"}},{new:true},function(err,resp){
                  }) 
                }   
               } 
             })
          //  } 
        //  if(JSON.stringify(response.receiverid)==JSON.stringify(req.user._id)){ 
         Message.find({receiverId:response.receiverid,senderId:response.senderId,
           messageStatus:{$ne:"seen"},"create_At":{$gte:from_date,$lt:to_date}}).populate('uid').
           exec(function(err,message2){
           if(message2.length != 0){
               for(var i=0;i<message2.length;i++){    
                 Message.findOneAndUpdate({_id:message2[i].id},{$set:{messageStatus:"seen"}},{new:true},function(err,resp){
                   })  
                 }  
               } 
             })
          //  } 
         Message.find({ $or : [{$and: [{receiverId: response.receiverid, senderId: response.senderId,deletingfriend:'value will be updated'}]}, 
         {$and: [{receiverId: response.senderId, senderId:response.receiverid,
           deletingfriend:'value will be updated'}]}],"create_At":{$gte:from_date,$lt:to_date}})
         .populate('media').populate('photo').populate('parentId').populate('pid')
         .populate('reciverimg').populate('senderimg').populate('preciverimg').populate('psenderimg').exec(function (err, message) { 
         // require('../../app').socket.emit("msgReadRecipts",message)       
        return res.json(message)
             })
           }
          })
         };
  //  This is for incognito when user block state
  exports.incognitoBlock = function(req,res){
    Friendslist.findOne({$or:[{from:req.body.login.EmailId,to:req.body.chat.EmailId},{to:req.body.login.EmailId,from:req.body.chat.EmailId}]},function(err,incognitoblockresp){
      return res.status(200).json(incognitoblockresp)
    })
  }
 
  exports.messagetypingindicator = function(req,res){
    let data = req.body
    require('../../app').socket.emit('msgIndicatorr',data);
  }

