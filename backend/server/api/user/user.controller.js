'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var rn = require('random-number');
var links = require('../link/link.model');
var Roles = require('../roles/roles.model') 
var Groupmember = require('../groupmember/groupmember.model');
var Groups = require('../group/group.model');
var user = require('../user/user.model');
var Call = require('../call/call.model');
var Userprofile =  require('../userprofile/userprofile.model');
var Invitations =  require('../invitation/invitation.model');
var _ = require('lodash');

var validationError = function (res, err) {
  return res.status(422).json(err);
};
const nodemailer = require('nodemailer');
const moment = require('moment');
var crypto = require('crypto');
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL    
var key = 'ChatIntact!@';
var decipherData;


var validationError = function(res, err) {
  return res.status(422).json(err);
};


exports.systemIP = function (req, res) {
  var ip = req.connection.remoteAddress;
  return res.status(201).json(ip);
};


/**
 * Get list of users  ,EmailId:{$ne:userId }
 */



exports.index =  function(req, res) {
  var userId = req.user.EmailId;
 // console.log("@@@@@@@@@@@@@@@@@@",userId)
  //console.log('req.params', req.params)
  
    var regex = new RegExp(req.params["EmailId"], 'i');
    //console.log('data',regex);

  
    Groupmember.find({Grname:regex,isJoin:'Accepted',memberEmailId:userId}).exec(function(err,res1){
    //Groupmember.find({Grname:regex},function(err,res1){
      //console.log(">>>>>>>>>>>>",res1);
      //console.log('7777',res1.length);
      var groups = res1;
      //console.log('666666666',groups);
      // if(res1.length!=0){
      // var renew = '';
      // if(renew == '') renew =   await functionA(userId,groups);
      // }


    var query = User.find({'$or':[{EmailId:new RegExp(req.params["EmailId"],'i')},{Name:new RegExp(req.params["EmailId"],'i')}]},{ 'EmailId': 1,'Name' :2}).exec(function(err, users) {
    //var query = User.find({EmailId: regex},{Name: regex},{ 'EmailId': 1,'Name' :2});query.exec(function (err, users) {
      if(err) return res.status(500).send(err);
      //console.log("users&&&&&&&&&&&&&&&&&&&&&&&" + users);
      var data = users;
      var normalusers = data.filter(function(loginuser) {
        return loginuser.EmailId != userId;
      });
      //console.log('5555',renew);
      // var grnames = renew;
      // console.log('4444444',grnames);
      // console.log("5858",normalusers);
      // console.log("999999",groups);

      Array.prototype.push.apply(normalusers,groups); 


      // var listedusers = Object.assign(grnames, normalusers);

      //console.log("65656",normalusers);
     
      return res.status(201).json(normalusers);


      
    });
  });
};
//Organization User Search 
exports.orgsearch =  function(req, res) {

  console.log("orguserid",req.params);
  
    var userId = req.params.EmailId;
  var org_id = req.params.org_id;
  console.log('777',req.params.org_id);
  

 // console.log("@@@@@@@@@@@@@@@@@@",userId)
  //console.log('req.params', req.params)
  
    var regex = new RegExp(req.params["EmailId"], 'i');
    //console.log('data',regex);

  
    //Groupmember.find({Grname:regex,isJoin:'Accepted',memberEmailId:userId,organization_id:org_id}).exec(function(err,res1){
      Groupmember.find({Grname:regex,isJoin:'Accepted',memberEmailId:userId}).exec(function(err,res1){ 
    var groups = res1;
      
    //Userprofile.find({$and:[{EmailId:req.user.EmailId},{orgname:null}]},function(err,response){


    var query = User.find({$and:[{EmailId:new RegExp(req.params["EmailId"],'i')},
    {Name:new RegExp(req.params["EmailId"],'i')},{organization_id:org_id}]},{ 'EmailId': 1,'Name' :2})
    .exec(function(err, users) {
    
      if(err) return res.status(500).send(err);
     
      var data = users;
      var normalusers = data.filter(function(loginuser) {
        return loginuser.EmailId != userId;
      });
     

      Array.prototype.push.apply(normalusers,groups); 
      return res.status(201).json(normalusers);
      
    });
  });
};

// async function functionA(userId,groups){
//   //console.log("eeeeeeeee",groups);
 
//   //console.log('56565656',groups.length);

//   // Groupmember.find({GroupId:id,isJoin:'Accepted',memberEmailId:userId}).populate('GroupId','GroupName').exec(function(err,res2){
//   //     console.log("res222222222222222",res2);
//   //     })

//   return new Promise((resolve, reject) => {
     
//     for(let i=0;i<groups.length;i++){
//       var id = groups[i]._id;
//        //console.log('7777777',id);    
//     Groupmember.find({GroupId:id,isJoin:'Accepted',memberEmailId:userId,deletedStatus:'true'}).populate('GroupId','GroupName').exec(function(err,result){
//        console.log('99999999999',result.length);
    
//       if(result.length!='0'){
//         for(let t=0;t<result.length;t++){
//           //var gname = result[t].GroupId.GroupName;

//        // console.log('111111111111',gname);
//         resolve(result);
//         }
//       } 
     
//     });
//   }
  
//   })

// }



// exports.index = function(req, res) {
//   var userId = req.user.EmailId;
//   console.log("@@@@@@@@@@@@@@@@@@",userId)
//   console.log('req.params', req.params)
//     var regex = new RegExp(req.params["EmailId"], 'i');
//     console.log('data',regex);
//     var query = User.find({EmailId: regex},{ 'EmailId': 1,'Name' :2});query.exec(function (err, users) {
//       if(err) return res.status(500).send(err);
//       console.log("users&&&&&&&&&&&&&&&&&&&&&&&" + users);
//       var data = users;
//       var listedusers = data.filter(function(loginuser) {
//         return loginuser.EmailId != userId;
//       });
//       return res.status(201).json(listedusers);
//     });
// };

// exports.index = function(req, res) {
//   var userId = req.user.EmailId;
//   console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@",userId)
//   console.log('req.params', req.params)
//     var regex = new RegExp(req.params["EmailId"], 'i');
//     console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$',regex);
//     if(userId.includes(regex),function(err,response){
//       console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",response)
//     }){
//       var query = User.find({EmailId: regex}, { 'EmailId': 1,'Name' :2});query.exec(function (err, users) {
//         if(err) return res.status(500).send(err);
//         console.log("users&&&&&&&&&&&&&&&&&&&&&&&" + users);
//         res.status(200).json(users);       
//       });
//     }
// };


/**
 * Creates a new user
 */
// exports.create = function (req, res, next) {
//   console.log('req.body', req.body.type);
//   var newUser = new User(req.body);
//   req.body.slug = req.body.slug;
//   console.log(newUser, 'newuser')
//   links.findOne({ IP: req.connection.remoteAddress, EmailId: req.body.EmailId }).sort({ _id: -1 }).exec(function (err, otpDoc) {
//     otpDoc.expire_count = 0;
//     otpDoc.save();
//   });
//   newUser.save(function (err, user) {
//     if (req.body.type) {
//       var dataa = {};
//       dataa.IP = req.connection.remoteAddress;
//       dataa.EmailId = req.body.EmailId,
//       dataa.create_At = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
//       dataa.expire_At = moment().add(5000, 'seconds').format('ddd, MMM D, YYYY hh:mm:ss A');
//       links.create(dataa);
//     }
//     if (err) return validationError(res, err);
//     var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
//     res.json({ token: token, result: user });
//     checkinvitation(user);

//   });
// };
exports.create = function (req, res, next) {
  console.log('req.body', req.body);
  //var roleid = '5e3a4f2cbce9993f682bbc49';
  var roleid = '5e7471132f381c25eca030f5'
  var organization_id ='5e748a6ecee5a407f095b137';
  var obj = { Name: req.body.user.Name, EmailId: req.body.user.EmailId,password:req.body.user.password,role:req.body.user.role,roleid:roleid,organization_id:organization_id};
  var newUser = new User(obj);
  // req.body.slug = req.body.slug;
  links.findOne({ IP: req.connection.remoteAddress, EmailId: req.body.user.EmailId }).sort({ _id: -1 }).exec(function (err, otpDoc) {
    otpDoc.expire_count = 0;
    otpDoc.save();
  });
  newUser.save(async function (err, user) {
    console.log("created User: ",user);
    // if (req.body.user.type) {
      var dataa = {};
      dataa.IP = req.connection.remoteAddress;
      dataa.EmailId = req.body.EmailId,
      dataa.create_At = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
      dataa.expire_At = moment().add(5000, 'seconds').format('ddd, MMM D, YYYY hh:mm:ss A');
      await links.create(dataa);
    if(req.body.groupinvite) {
      await Groupmember.update({$and:[{GroupId: req.body.groupinvite.GroupId},{memberEmailId: req.body.groupinvite.InviteeEmail}]},{$set:{isJoin: "Accepted", memberId: user._id}},function(err,UpdatedGroupmember){
        console.log("Updated Group Member: ",UpdatedGroupmember)
        Groupmember.find({$and:[{GroupId: req.body.groupinvite.GroupId},{isJoin: "Pending"},{memberEmailId: req.body.groupinvite.InviteeEmail}]},function(err2,res) {
          if(res) {
            Groupmember.deleteMany(res,function(err,delresponse){
              console.log("delresponse: ",delresponse);
            })
          }
        })
      })
    }
    // }
    if (err) return validationError(res, err);
    var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
    res.json({ token: token, result: user });
    checkinvitation(user);

  });
};

const checkinvitation = function(data){
  console.log(data);
  console.log('////////////////////', data.id, data.EmailId, data.Name);
  Invitations.findOneAndUpdate({EmailId: data.EmailId}, {$set:{receiverid:data.id, receiverEmailId:data.EmailId, Name:data.Name}}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log("documentupdated",doc);
});
}


/**
 * Get a single user
 */

exports.checkUserExists = function (req,res) {
console.log("checkUserExists req.params: ",req.params);
user.countDocuments({EmailId: req.params.emailid},function(err,res1) {
  if(err) throw err;
  console.log("Count: ",res1);
  return res.status(200).json(res1)
})
// res.status(200).send('Unauthorized');
}

exports.show = function (req, res, next) {
  console.log(req.body, req.params)
  var id = req.params;
  console.log("hello singleuser",id, req.params);
   User.findById({_id: req.params.id}, function (err, user) {
     console.log("user",user);
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    return res.status(200).json(user);
  });
};
/* get normal users */
exports.getusers = function(req,res,next){
  console.log("1111",req.params);
  
  User.find({ roleid: req.params.role_id}).
      exec(function (err, user) {
        if(err) return res.status(500).send(err);
        //console.log('The user is %s', user.roleid.role_name);
       // require('../../app').socket.emit("orgemployelist",user)  
        return res.status(200).json(user); 
        // prints "The author is Ian Fleming"
      });

}
/**
 * Get individual organization users 
 */
exports.getorgusers = function(req,res,next){
  console.log("testinggggggggggg",req.params)
  var organization_id = req.org_id;
  User.
      find({ organization_id: req.params.org_id}).
      populate('roleid').
      populate('organization_id').
      exec(function (err, user) {
        if(err) return res.status(500).send(err);
        //console.log('The user is %s', user.roleid.role_name);
       // require('../../app').socket.emit("orgemployelist",user)
       console.log("users",user);
         
        return res.status(200).json(user); 
        // prints "The author is Ian Fleming"
      });
}
/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  User.findById(userId, function (err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function (err) {
        if (err) return validationError(res, err);
        res.status(200).json({ res: "Success" })
        // res.json({res:"Success"})
      });
    } else {
      res.json({ res: "Fail" })
      // res.status(403).send('Forbidden');
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  console.log("userId", userId);
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt  
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

//email for forgot password
exports.forgotPassEmail = function (req, res) {
  const email = req.body.EmailId;
  User.findOne({ EmailId: email }, function (err, user) {
    if (!user) return res.status(200).json({ "res": "notFound" });
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25, // use SSL
      auth: {
        user: 'rahul.pentakota@cognitiveinnovations.in', // generated ethereal user
        pass: 'anna@COGNITIVE' // generated ethereal password
      },
      tls: { rejectUnauthorized: false }
    });
    var gen = rn.generator({ min: 100000, max: 999999, integer: true })
    var otpttl = moment().add(120, 'seconds').format('ddd, MMM D, YYYY hh:mm:ss A')
    const id1 = gen();
    var data = {};
    data.IP = req.connection.remoteAddress;
    data.otp = id1;
    data.EmailId = email;
    data.expire_At = otpttl;
    console.log('maildata', data);
    var HelperOptions = {
      from: '"CHATINTACT " <rahul.pentakota@cognitiveinnovations.in>',
      to: email,
      subject: "Email verification for OTP",
      text: "OTP for verifying your E-mail id is " + id1,
    };
    transporter.sendMail(HelperOptions, function (err, info) {
      if (err) {
        res.json({ "res": "" })
      }
      else {
        console.log('sendMail response', info);

        res.json({ "res": "success" });
        links.findOne({ EmailId: data.EmailId }).exec(function (err, links) {
          if (links) {
            var updated = _.merge(links, data);
            updated.save();
          }
        });
      }
    });
  });
};

exports.otpCheckforgot = function (req, res) {
  console.log("otpcheck", req.body);
  var result = Object.values(req.body.otp)
 var timestamp = moment().format('ddd, MMM D, YYYY hh:mm:ss A')
 var tempsess = req.session;
 const otp = req.body.otp;
 console.log("otparr", otp.values);

 links.findOne({ IP: req.connection.remoteAddress, EmailId: req.body.EmailId }).sort({ _id: -1 }).exec(function (err, otpDoc) {
   console.log(otpDoc.otp);
   
   var str = otpDoc.otp.toString();
   console.log("7777777777777",str);
   
   if (new Date(otpDoc.expire_At) > new Date(timestamp)) {
     if (str.charAt(0)== result[0] && str.charAt(1) == result[1] && str.charAt(2) == result[2] && str.charAt(3) == result[3] && str.charAt(4) == result[4] && str.charAt(5) == result[5]) {     
       return res.status(200).json({ "res": "success" })
     }
     else {
       var count = ++otpDoc.expire_count;
       otpDoc.expire_count = count;
       otpDoc.save(function (err) {
         if (err) return validationError(res, err);
       });
       if (count >= 4) {
         User.findOne({ EmailId: otpDoc.EmailId }, function (err, user) {
           if (user) {
             if (user.role == 'PremiumUser') {
               Userprofile.findOne({ owner_email: otpDoc.EmailId }, function (err, puserprofile) {
                 if (puserprofile) {
                   puserprofile.status = "Inactive";
                   puserprofile.save();
                 }
               });
             }
             if (user.role == 'Client') {
               console.log(otpDoc.EmailId);
               
               Userprofile.findOne({EmailId: otpDoc.EmailId }, function (err, userprofile) {               
                 if (userprofile) {
                   userprofile.status = "Inactive";
                   userprofile.save();
                 }
               });
             }
             user.status = "Inactive";
             user.save(function (err) {
               if (err) return validationError(res, err);
               res.status(200).json({ "res": "block" })
             });
           }
           else res.status(200).json({ "res": "OTPFAILED" })
         });
       }
       else {
         res.status(200).json({ "res": "OTPFAILED" })
       }
     }
   }
   else {
     res.status(200).json({ "res": "OTP-expired" });
   }
 });
};


// checking Email,PAN and GST
exports.checkUser = function (req, res) {
  if (req.body.type == 'email') var q = { EmailId: req.body.value };
  console.log(q);
  User.find(q, function (err, user) {
  if (err) return next(err);
  if (!user) { return res.status(200).send({ "data": "no" }); }
  if (user && user.status == 'Inactive') { return res.status(200).send({ "data": "blocked" }); }
  else return res.status(200).send(user);
  });
  }


// exports.checkUser = function (req, res) {
//   if (req.body.type == 'email') var q = { EmailId: req.body.value.email };
//   User.find(q, function (err, user) {
//     if(user.length == 0){
//     Invitations.findOne({EmailId:req.body.value.email,senderEmailId:req.body.loginuser}).exec(function(err,result){
//     console.log("resssssssssss",result);
//      // if(result){
//       return res.status(200).json("you already sent the invitation")
//    //  }       
//      })
//   //   if (err) return next(err);
//   //   if (user.length == 0) { return res.status(200).send({ "data": "no" }); }
//   //  if (user && user.status == 'Inactive') { return res.status(200).send({ "data": "blocked" }); }
//   }
//   else return res.status(200).json("user is already registered");   
//   });
// }

//forget Password
exports.forgetpwd = function (req, res) {
  var newPass = req.body.password;
  var q = {
    EmailId: req.body.EmailId
  };
  User.findOne(q, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(200).send({ res: "Fail" });
    else {
      user.password = newPass;
      user.save(function (err) {
        if (err) return validationError(res, err);
        res.status(200).json({ res: "Success" })
      });
    }
  });
}

//change forgot password
exports.forgotPassChange = function (req, res) {
  var email = req.body.EmailId;
  var newPass = req.body.password;
  User.findOne({ EmailId: email }, function (err, user) {
    user.password = newPass;
    user.save(function (err) {
      if (err) return validationError(res, err);
      res.status(200).json({ res: "success" });
    });
  });
}



exports.links1 = function (req, res) {
  var decipher = crypto.createDecipher(algorithm, key);
  try {
    decipherData = decipher.update(req.body.temp, 'hex', 'utf8') + decipher.final('utf8');
    var mailaddress = decipherData.split('-')[0];
    var mailCreatedTime = decipherData.split('-')[1];
    var mailExpiredTime = decipherData.split('-')[2];

    links.find({ EmailId: mailaddress }).exec(function (err, users) {
      if (err) return res.status(500).send(err);
      else {
        if ((users.length) && (mailCreatedTime === moment(users[0].create_At).format('ddd, MMM D, YYYY hh:mm:ss A')) && (mailExpiredTime === moment(users[0].expire_At).format('ddd, MMM D, YYYY hh:mm:ss A'))) {
          if (moment(req.body.time) > moment(users[0].expire_At)) { res.status(200).json({ users: "In valid URL" }) }
          else { res.status(200).json({ users: "valid URL" }) }
        }
        else { res.status(200).json({ users: "In valid URL" }) }
      }
    });
  } catch (err) {
    res.status(200).json({ users: "In valid URL" })
  }
}


/* updating login status to 1 or 0*/
exports.updateStatus = function(req, res) {   
  console.log("11",req.body);
  var time = moment().format('ddd, MMM D, YYYY hh:mm:ss ');
  User.findOneAndUpdate({EmailId:req.body.email}, {$set:{loginStatus:req.body.loginStatus,updatedAt:time}},{new:true}, function(err, loginstatus){
    require('../../app').socket.emit("userloginstatus",loginstatus)
    if(err){
    } 
    else {
      return res.json(loginstatus)
    }
});
}

exports.updateprofile = function (req, res) {
  User.findById(req.params.id, function (err, details) {
    if (err) { return handleError(res, err); }
    if (!details) { return res.status(404).send('Not Found'); }
    var updated = _.merge(details, req.body);
    updated.save(function (err) {
      if (err) return validationError(res, err);
      res.status(200).json({ res: "Success" })
    });
  });
};


/**
 * Authentication callback 
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

// chatoff  {$set:{loginStatus:1,updatedAt:time}},{new:true}
exports.chatofff = function(req,res){
  User.findOne({EmailId:req.body.EmailId},function(err, userloginstatus){
    if(userloginstatus.loginStatus == 0){
      User.findOneAndUpdate({EmailId:userloginstatus.EmailId},{$set:{loginStatus:1}},{new:true},function(err,resp){
        require('../../app').socket.emit("userloginstatus",resp);
        return res.status(200).json(resp)
      });
    }else if(userloginstatus.loginStatus == 1){
      User.findOneAndUpdate({EmailId:userloginstatus.EmailId},{$set:{loginStatus:0}},{new:true},function(err,resp){
        require('../../app').socket.emit("userloginstatus",resp);
        return res.status(200).json(resp)
      });
    }
});
}

// tab close event 
exports.tabclose = function(req,res){
  var time = moment().format('ddd, MMM D, YYYY hh:mm:ss ');
  User.findOneAndUpdate({EmailId:req.body.EmailId},{$set:{loginStatus:0,updatedAt:time}},{new:true},function(err,tabcloseresp){
   require('../../app').socket.emit("tabcloseevent",tabcloseresp);
  })
}

exports.refreshevent = function(req,res){
  User.findOneAndUpdate({EmailId:req.body.EmailId},{$set:{loginStatus:1}},{new:true},function(err,resp){
  require('../../app').socket.emit("refresh",resp);
  });
}

exports.endvideocall = function(req,res) {
  console.log("End Video Call: ",req.body);
  User.findByIdAndUpdate(req.body.id,{$set:{onCall: false}},{returnOriginal:false},function(err,resp) {
    console.log("End Video Call Response: ",resp);
    Call.find({$or:[{"SenderID.id": req.params.id},{"ReceiverID.id": req.params.id}]},function(err,resp2) {
      console.log("Call Log Response: ",resp2);
      return res.status(200).json(resp2);
    })
  })
}


exports.chatingoffbutton = function(req,res){
  console.log("testinggggggggggggggggggggggggggggggggg",req.body)
  User.findOne({EmailId:req.body.EmailId},function(err,resp){
    console.log("resppppp",resp);
    return res.status(200).json(resp)
  })
  }