'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var rn = require('random-number')
var OtpModel = require('../otp/otp.model');
var moment = require('moment')
var Countries = require('../countries/countries.model');
var key = "secretkey";
var crypto = require("crypto")
var Links = require('../links/links.model')
var twitterAPI = require('node-twitter-api');
var _ = require('lodash');
var Department = require('../department/department.model');
var Sharingpeople = require('../sharingpeople/sharingpeople.model');
var Signature = require('../signature/signature.model');
var Photo = require('../photo/photo.model');
var Stamp = require('../stamp/stamp.model');
var Notification = require('../notification/notification.model');
var Fieldvalue = require('../fieldvalue/fieldvalue.model');
var Fieldoption = require('../fieldoption/fieldoption.model');
var async = require('async');

function encrypt(key, data) {
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(key, data) {
  console.log(key)
  console.log(data+"|||||||||")
  var decipher = crypto.createDecipher('aes-256-cbc', key);
  var decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}
var validationError = function (res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */

// Get list of employees
exports.index = function (req, res) {
  console.log(req.user)
  User.find({ role: 'user', active: true }, '-salt -hashedPassword').sort({ created_at: 'desc' }).exec(function (err, users) {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }
    res.send(users);
  });
};


exports.index1 = function (req, res) {
  User.find({ role: 'user', active: true }, '-salt -hashedPassword').sort({ created_at: 'desc' }).exec(function (err, users) {
    if (err) return res.status(500).send(err);
    res.send(users);
  });
};

exports.activatenewemail = function (req, res) {
  console.log("activateemail")
  var newpass = req.body.password;
  var decryptid = decrypt(key, req.body.id);
  if (newpass) {
    console.log("ifffffffffff",decryptid)
    User.findOne({ _id: decryptid }, '-salt -hashedPassword', function (err, user) {
      user.active = "true";
      user.new = 'true';
      user.password = newpass
      user.updated_at = Date.now();
      user.save(function (err, users) {
        if (err) return validationError(res, err);
        res.json(users)
      });
    });
  }
  else {
    User.findOne({ _id: decryptid }, function (err, user) {
      if (user) {
        user.active = 'true';
        console.log(user.active)
        if (user.expire_at <= Date.now() || user.status == false) res.json({ "linkstatus": "Link Expired" });
        else {
          user.updated_at = Date.now();
          user.save(function (err, users) {
            if (err) return validationError(res, err);
            // res.json(users)
            res.json({ "linkstatus": "Success" });
          });
        }
      }
      else res.json({ "linkstatus": "Invalid" });
    });
  }
}
exports.checkStatus = function (req, res) {
  var decryptid = decrypt(key, req.params.id);
  User.findOne({ _id: decryptid }).exec(function (err, users) {
    if (err) return res.status(500).send(err);
    else{
      console.log("gggggggggggggggggggggggggg")
      console.log(users)
      var date=Date.now()
      console.log(date)
      if ( users && users.expire_at <= Date.now())
      {console.log("kkkkkkkkkkkkkkkkkkkkkkk"); res.json({ "linkstatus": "Link Expired" }) ;}
        else{
          console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
      users = JSON.parse(JSON.stringify(users))
      users.encryptmail = encrypt(key,users.email)
      return res.status(200).json(users)}
    }
  });
};



/**
 * Creates a new user
 */
exports.create = function (req, res, next) {


  req.body.active = false;
  if (req.body.linkSignup) {
    req.body.email = decrypt(key, req.body.email);
    req.body.active = true;
    req.body.password = req.body.cPassword

  }
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  if(!req.body.new)newUser.new = 'true'
  newUser.created_at = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
  newUser.expire_at = moment().add(1, 'day').format('ddd, MMM D, YYYY hh:mm:ss A');
  newUser.save(function (err, user) {
    console.log(user)
    if (err) return validationError(res, err);
    
    if (!req.body.linkSignup) {
      console.log(req.body,"hiiiii");
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25, // use SSL
        auth: {
          user: 'noreply@cognitiveinnovations.in',
          pass: 'Password1234*'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      var activationkey = encrypt(key, user.email.toString());
      var HelperOptions = {

        from: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
        to: user.email,
        subject: "Docintact Account Confirmation",
       // text: "Click This link To Activate your Account : " + config.frontendUrl + "/signupemailconfirm/" + activationkey

      };

      HelperOptions.html = '<div class="background" style= "width: 680px; height: 795px; background-color: #F4F7FA; text-align: center; margin: auto;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">' +
        '<div class="logo" Style="margin-top:2rem"><img src ="https://staging.docintact.com/assets/images/Group2244.png"> </div>' +
        '<div class="innrbackground"  style=" width: 580px; height: 535px; background-color: #FFF; text-align: center; margin: auto; margin-top: 2rem;">' +

        '<img src ="https://staging.docintact.com/assets/images/verifyemail.png" style="margin-top: 2rem;" >' +
        '<h2 style="margin-top: 2rem;  font-size:22px; font-weight: 600">Verify Your Email Address</h2>' +
        '<hr  class="mt-0 hr-w hr1_bg" style="width: 85%;     margin-top: 24px !important;">' +

        '<p style="font-size:16px; margin: 65px; margin-top: 26px; margin-bottom: 18px; font-weight: 500;">In order to start using your Doc Intact account, you need to' +
        'verify your email address.</p>' +
        '<h5>Click the Below Button to Verify Your Email Address</h5>'+
        '<span class="im">&nbsp;<a class="m_233836446190015510btn m_233836446190015510btn-primary" href="' + config.frontendUrl + "/signupemailconfirm/" + activationkey + '"  style="text-decoration:none;display:inline-block;font-weight:normal;line-height:1.25;text-align:center;white-space:nowrap;vertical-align:middle;font-size:1rem;border-radius:0.25rem;color:#fff;background-color:#0275d8;padding:0.5rem 1rem;border:1px solid #0275d8;" target="_blank">Verify Email Address </a></span>'+ 
        '<hr  class="mt-0 hr-w" style=" width: 12%; margin-top: 35px !important;">' +

        '<p style="font-size:16px; margin: 65px; margin-top: 14px; margin-bottom: 18px; color: #A2A2A3;">if you did not sign up for this account you can ignore this email and the  ' +
        'account will be deleted.</p>' +

        '</div>' +

        '<p style="font-size: 14px;color: #A2A2A3; margin-top: 50px;"><img src ="https://staging.docintact.com/assets/images/careof.png">&nbsp;&nbsp; Doc Intact 2019</p>' +
        '</div>'

      transporter.sendMail(HelperOptions, function (err, info) {
        if (err) { console.log("error occured when sending mail" + err) }
        else { console.log("link sent" + id1); }
      });

    }

    var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
    return res.status(200).send({ token: token, email: user.email, name: user.name, role: user.role, type: user.type, new: user.new });
  });
};
exports.checkusers1 = function (req, res) {
  console.log(req.body)
  if (req.body.type == 'email') var q = { email: req.body.value };
  if (req.body.type == 'mobile') var q = { mobilenumber: req.body.value };
  if (req.body.type == 'slug') var q = { slug: req.body.value };
  if (req.body.type == 'activeEmail') var q = { email:  decrypt(key, req.body.value) };
  console.log(q);
  User.findOne(q, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(200).send({ "data": false });
    else return res.status(200).json({ "data": true, user });
  });

}

exports.checkusers = function (req, res) {
  console.log(req.body)
  if (req.body.type == 'email') var q = { email: req.body.value };
  if (req.body.type == 'mobile') var q = { mobilenumber: req.body.value };
  if (req.body.type == 'slug') var q = { slug: req.body.value };
  if (req.body.type == 'activeEmail') var q = { email:  decrypt(key, req.body.value) };
  console.log(q);
  User.findOne(q, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(200).send({ "data": false });
    else return res.status(200).send({ "data": true, user });
  });

}
//decrypt user details
exports.userecryptDatas = function (req, res) {
  console.log("Body",req.body)
  var user={}
  if (req.body)  {
    if (req.body.name) user.name = decrypt(key, req.body.name) 
    if (req.body.email) user.email = decrypt(key, req.body.email) 
    if (req.body.new) user.new = req.body.new
    if (req.body.role) user.role = decrypt(key, req.body.role) 
    if (req.body.type) user.type = decrypt(key, req.body.type) 
    if (req.body.provider) user.provider = decrypt(key, req.body.provider)
    if (req.body.twitter_id) user.twitter_id = decrypt(key, req.body.twitter_id)
    if (req.body.facebook_id) user.facebook_id = decrypt(key, req.body.facebook_id)
 
  console.log( user.name )
  console.log( user )

  return res.status(200).send(user);

  }

  // });

}
/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;
  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
  });
};


//================================================================================================
// Forgot Password Sending OTP to the Email
exports.forgotPassEmail = function (req, res) {
  if( req.headers && req.headers.ipaddress){
    req.body.IpAddress=req.headers.ipaddress
  } 
  else {
    req.body.IpAddress=req.body.IpAddress
  }
  const tempsess = req.session
  const email = req.body.email;
  User.findOne({ email: email }, function (err, user) {
    if (!user) return res.status(200).json({ "res": "notFound" });
    // if (user.status == "Active") {
    tempsess.email = email;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25, // use SSL
      auth: {
        user: 'noreply@cognitiveinnovations.in',
        pass: 'Password1234*'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    var gen = rn.generator({
      min: 100000
      , max: 999999
      , integer: true
    })
    var otpttl = moment().add(120, 'seconds').format('ddd, MMM D, YYYY hh:mm:ss A')
    tempsess.count = 0;
    tempsess.registerotpttl = otpttl;
    const id1 = gen();
    tempsess.otpforemail = id1;
    var data = {};
    data.IP = req.body.IpAddress;
    data.otp = id1;
    data.email = email;
    data.expire_at = otpttl
    OtpModel.create(data);
    var HelperOptions = {
      from: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
      to: email,
      subject: " Docintact Password Reset OTP ",
      // text: "OTP for Changing the password is " + id1,
 
    };
    HelperOptions.html ='<div class="background" style= "width: 680px; height: 718px; background-color: #F4F7FA; text-align: center; margin: auto;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">'+
    '<h2 style="padding-top: 1rem;"> Password Reset OTP</h2>'+
    '<div class="innrbackground"  style=" width: 580px; height: 535px; background-color: #FFF; text-align: center; margin: auto; margin-top: 2rem;">'+
    
      '<img src ="https://staging.docintact.com/assets/images/otp.png" style="margin-top: 2rem;" >'+
    '<h2 style="margin-top: 2rem;  font-size:18px; font-weight: 500">Enter the OTP to Reset your Docintact Account  Password</h2>'+
    '<p>'+email+'</p>'+
    '<p style="font-size:1.5rem; margin: 65px; margin-top: 17px; margin-bottom: 18px; font-weight: 400;background-color:#d8d0d0;">Your One Time Password is  '+ id1+'</p>'+
  '<h6 style="font-size:1rem;"> Do not share this OTP  to anyone for security reasons</h6>'+
  '<p style="font-size:13px; margin: 65px; margin-top: 14px; margin-bottom: 18px; color: #000; margin-top:2rem"><span style="color:#EA5455;font-size: 17px;">Note:</span>This OTP is valid for the 2 Mins only. If you did not make this request please'+ 
    '  write at support@docintact.com  </p>'+
  
    '</div>'+
    
    '<p style="font-size: 14px;color: #A2A2A3; margin-top: 50px;"><img src ="https://staging.docintact.com/assets/images/careof.png">&nbsp;&nbsp; Doc Intact 2019</p>'+
    '</div>'
    console.log(id1)
    transporter.sendMail(HelperOptions, function (err, info) {

      if (err) {
        res.json({ "res": "Server error" })
      }
      else {
        res.json({ "res": "success" })

      }
    });



  });

};


//=================================================================================================
// OTP Checking
exports.otpCheck = function (req, res) {

  var timestamp = moment().format('ddd, MMM D, YYYY hh:mm:ss A')
  var tempsess = req.session
  const email = req.body.email;
  const otp = req.body.otp;

  OtpModel.findOne({ IP: req.body.IP }).sort({ _id: -1 }).exec(function (err, otpDoc) {
    console.log(otpDoc)

    if (new Date(otpDoc.expire_at) >= new Date(timestamp)) {

      if (otpDoc.otp == otp) {
        res.status(200).json({ "res": "success" })
      }
      else {
        var count = ++otpDoc.expire_count;
        otpDoc.expire_count = count;
        otpDoc.updated_at = Date.now();
        otpDoc.save(function (err) {
          if (err) return validationError(res, err);

        });

        if (count >= 4) {
          User.findOne({ email: otpDoc.email }, function (err, user) {
            user.status = false;
            user.updated_at = Date.now();
            user.save(function (err) {
              if (err) return validationError(res, err);
              res.status(200).json({ "res": "block" })
            });
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

exports.mailer1 = function (req, res) {
  const tempsess = req.session
  const email = req.user.email;
  // const otpforemail = req.body.OTP;
  tempsess.email = email;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25, // use SSL
    auth: {
      user: 'noreply@cognitiveinnovations.in',
      pass: 'Password1234*'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var gen = rn.generator({
    min: 100000
    , max: 999999
    , integer: true
  })
  var otpttl = moment().add(120, 'seconds').format('ddd, MMM D, YYYY hh:mm:ss A')
  tempsess.count = 0;
  tempsess.registerotpttl = otpttl;
  const id1 = gen();
  tempsess.otpforemail = id1;
  var data = {};
  data.IP = req.body.IP;
  data.otp = id1;
  console.log(data.otp)
  data.email = email;
  data.expire_at = otpttl;
  OtpModel.create(data);

  var HelperOptions = {
    from: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
    to: email,
    subject: "Email verification for OTP",
    text: "OTP for verifying your E-mail id is " + id1,

  };
  transporter.sendMail(HelperOptions, function (err, info) {

    if (err) {
      res.json({ "res": "" })
    }
    else {
      res.json({ "res": "success" })

    }
  });
};



/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  if( req.headers && req.headers.ipaddress){
    req.body.IpAddress=req.headers.ipaddress
  } 
  else {
    req.body.IpAddress=req.body.IpAddress
  }
  var userId = req.user._id;
  var oldPass = req.body.oldpass;
  const tempsess = req.session;
  var newPass = req.body.pwd3;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25, // use SSL
    auth: {
      user: 'noreply@cognitiveinnovations.in',
      pass: 'Password1234*'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    // if(req.body._id) { delete req.body._id; }

    User.find({ email: user.email }, function (err, dummy) {

      if (err) { return handleError(res, err); }
      const mysalt = dummy[0].salt;
      const mysalt1 = mysalt.toString('base64');
      var salt1 = new Buffer(mysalt1, 'base64');
      var pass = crypto.pbkdf2Sync(oldPass, salt1, 10000, 64, "sha512").toString('base64');
      if (dummy[0]) {
        if (dummy[0].hashedPassword == pass) {
          User.findById(userId, function (err, user) {
             var userdata=user
             if(userdata.name) var name=userdata.name
             if(userdata.companyname) var name=userdata.companyname
             userdata.IpAddress = req.body.IpAddress;
             userdata.browser = req.headers["user-agent"]
             const DeviceDetector = require("device-detector-js");
             const deviceDetector = new DeviceDetector();
             const device = deviceDetector.parse( userdata.browser );
             if(device.client.name &&device.client.version)
             {
               var browserinfo=device.client.name+',Version'+device.client.version;
             }
             else if(device.client.name &&device.client.version)
             {
               var browserinfo=device.client.name;
               
             }
             if(device.os)
             {
               if(device.os.name &&device.os.platform)
               {
                 var osinfo=device.os.name+',Platform'+device.os.platform;
               }
               else if(device.os.name &&device.os.version &&device.device.brand)
               {
                 var osinfo=device.os.name+',Version'+device.os.version+''+device.device.brand+''+device.device.model;
               }
         
             }
            //  userdata.deviceName = os.platform();
            if (user.authenticate(oldPass)) {
              user.password = newPass;
              user.updated_at = Date.now();
              user.save(function (err) {
                if (err) return validationError(res, err);
                else 
                {

                  var HelperOptions = {
                    from: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
                    to: user.email,
                    subject: "Docintact Password Reset Successfully ",
                    // text: "link to accept the invitation:" + config.frontendUrl + "/signupemployee/" + activationkey
                  };
          
   
                  HelperOptions.html ='<div class="background" style= "width: 680px; height: 815px; background-color: #F4F7FA; text-align: center; margin: auto;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">'+
                  '<div class="logo" Style="margin-top:2rem"><img src ="https://staging.docintact.com/assets/images/Group2244.png"> </div>'+
                  '<div class="innrbackground"  style=" width: 580px; height: 679px; background-color: #FFF; text-align: center; margin: auto;">'+
                  '<a href="#"><img src="https://staging.docintact.com/assets/images/passwordreset.png"></a>'+
                  '<h2 style="margin-top: 0.9rem;  font-size:21px; font-weight: 500;color: #4CA2D1;margin-left: -122px;" >Hi,'+name+'</h2>'+ 
                   '<ul style="list-style:none;text-align: left;margin-left: 77px;">'+
               '<li style="padding-bottom:10px;">You`ve successfully changed your DocIntact password.</li>'+
               '<li style="padding-top:5px;padding-bottom:10px;">The DocIntact Team</li>'+
               '<li>Thanks for using DocIntact !</li>'+
               '</ul>'+
                  '<h2 style="margin-top: 0.9rem;  font-size:21px; font-weight: 500;color: #4CA2D1;margin-left: -21px;">When and where this happened:</h2>'+
               '<ul style="list-style:none;text-align:left;margin-left:78px;padding-inline-start: 0;">'+
               '<li style="padding-bottom:10px;">Date:&nbsp;&nbsp;'+moment(Date.now()).utcOffset(330).format('lll')+'</li>'+
               '<li style="padding-bottom:10px;">IP:&nbsp;&nbsp;'+userdata.IpAddress+'</li>'+
               '<li style="padding-bottom:10px;">Browser:&nbsp;&nbsp;'+browserinfo+'</li>'+
                '<li style="padding-bottom:10px;">OS:&nbsp;&nbsp;'+osinfo+'</li>'+
               '</ul>'+
                  '<hr  class="mt-0 hr-w" style=" width: 12%; margin-top: 35px !important;">'+
                   '<p style="font-size:16px; margin: 65px; margin-top:4px; margin-bottom: 18px; color: #A2A2A3;">If it is not done by You? Make sure to change your password right away.</p>'+
                  '</div>'+
                   '<p style="font-size: 14px;color: #A2A2A3;"><img src ="https://staging.docintact.com/assets/images/careof.png" style="vertical-align: text-top;">&nbsp;&nbsp; Doc Intact 2019</p>'+
                  '</div>'
          
          
          
                  transporter.sendMail(HelperOptions, function (err, info) {
                    if (err) {  console.log(err) }
                    else { console.log("sucess")}
                  });
                return res.json({ result: "success" });
                }
                
                
              });
            } else {
              res.status(403).send('Forbidden');
            }
          });
        } else {
          return res.json({ result: "Old password mismatch" });
        }
      }
    })
  });
}


//OldPassword Checking

exports.oldPasswordChecking = function (req, res, next) {
  var userId = req.user._id;
  if (req.body.type == 'password') var oldPassword = { password: req.body.value };
  User.findById(userId, function (err, user) {
    if (user.authenticate(oldPassword.password)) {
      // user.password = newPassword;

      if (err) return validationError(res, err);
      return res.json({ "result": "matched" });
      //});
    } else {
      return res.json({ "result": "Old password mismatch" });
    }

  });
}
//=================================================================================================
// Change password in Forgot password

exports.forgotPassChange = function (req, res) {

  if( req.headers && req.headers.ipaddress){
    req.body.IpAddress=req.headers.ipaddress
  } 
  else {
    req.body.IpAddress=req.body.IpAddress
  }
  var email = req.body.email;
  var newPass = req.body.newPass;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25, // use SSL
    auth: {
      user: 'noreply@cognitiveinnovations.in',
      pass: 'Password1234*'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  User.findOne({ email: email }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    user.password = newPass;
    var userdata=user;
    if(userdata.name) var name=userdata.name
    if(userdata.companyname) var name=userdata.companyname
    userdata.IpAddress = req.body.IpAddress;
    userdata.browser = req.headers["user-agent"]
    // userdata.deviceName = os.platform();
    user.updated_at = Date.now();
    const DeviceDetector = require("device-detector-js");
    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse( userdata.browser );
    if(device.client.name &&device.client.version)
    {
      var browserinfo=device.client.name+',Version'+device.client.version;
    }
    else if(device.client.name &&device.client.version)
    {
      var browserinfo=device.client.name;
      
    }
    if(device.os)
    {
      if(device.os.name &&device.os.platform)
      {
        var osinfo=device.os.name+',Platform'+device.os.platform;
      }
      else if(device.os.name &&device.os.version &&device.device.brand)
      {
        var osinfo=device.os.name+',Version'+device.os.version+''+device.device.brand+''+device.device.model;
      }

    }
    user.save(function (err) {
      if (err)
      
      {
        return validationError(res, err);
      }
      else 
      {
        var HelperOptions = {
          from: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
          to: req.body.email,
          subject: "Docintact Password Reset Successfully ",
          // text: "link to accept the invitation:" + config.frontendUrl + "/signupemployee/" + activationkey
        };

   HelperOptions.html ='<div  style= "width: 680px; height: 815px; background-color: #F4F7FA; text-align: center; margin: auto;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">'+
   '<div style="margin-top:2rem"><img src ="https://staging.docintact.com/assets/images/Group2244.png"> </div>'+
   '<div  style=" width: 580px; height: 679px; background-color: #FFF; text-align: center; margin: auto;">'+
   '<a href="#"><img src="https://staging.docintact.com/assets/images/passwordreset.png"></a>'+
   '<h2 style="margin-top: 0.9rem;  font-size:21px; font-weight: 500;color: #4CA2D1;margin-left: -122px;" >Hi,'+name+'</h2>'+ 
    '<ul style="list-style:none;text-align: left;margin-left: 77px;">'+
'<li style="padding-bottom:10px;">You`ve successfully changed your DocIntact password.</li>'+
'<li style="padding-top:5px;padding-bottom:10px;">The DocIntact Team</li>'+
'<li>Thanks for using DocIntact !</li>'+
'</ul>'+
   '<h2 style="margin-top: 0.9rem;  font-size:22px; font-weight: 500;color: #4CA2D1;margin-left: -21px;">When and where this happened:</h2>'+
'<ul style="list-style:none;text-align:left;margin-left:78px;padding-inline-start: 0;">'+
'<li style="padding-bottom:10px;">Date:&nbsp;&nbsp;'+moment(Date.now()).utcOffset(330).format('lll')+'</li>'+
'<li style="padding-bottom:10px;">IP:&nbsp;&nbsp;'+userdata.IpAddress+'</li>'+
'<li style="padding-bottom:10px;">Browser:&nbsp;&nbsp;'+browserinfo+'</li>'+
'<li style="padding-bottom:10px;">OS:&nbsp;&nbsp;'+osinfo+'</li>'+
'</ul>'+
   '<hr  class="mt-0 hr-w" style=" width: 12%; margin-top: 35px !important;">'+
    '<p style="font-size:16px; margin: 65px; margin-top: 4px; margin-bottom: 18px; color: #A2A2A3;">If it is not done by You? Make sure to change your password right away.</p>'+
   '</div>'+
    '<p style="font-size: 14px;color: #A2A2A3;"><img src ="https://staging.docintact.com/assets/images/careof.png" style="vertical-align: text-top;">&nbsp;&nbsp; Doc Intact 2019</p>'+
   '</div>'



        transporter.sendMail(HelperOptions, function (err, info) {
          if (err) {  console.log(err) }
          else { console.log("sucess")}
        });
        res.status(200).json({ res: "success" });
      }

      
    });

  });
}


//=================================================================================================

exports.checkUser = function (req, res) {
  if (req.body.type == 'email') var q = { email: req.body.value };
  if (req.body.type == 'mobile') var q = { mobilenumber: req.body.value };
  User.findOne(q, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(200).send({ "data": false });
    else return res.status(200).send({ "data": true });
  });

}


//===============================================================================================
/**
 * Creates a new user
 */



/**
 * Get my info
 */
exports.me = function (req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId, active: true
  }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

exports.addEmployee = function (req, res) {
  console.log("GGHGGHGGG")
  console.log(req.body)
  console.log('end');

  // req.body.IP = req.connection.remoteAddress;
  req.body.name = req.body.fname +" "+req.body.lname
  req.body.password = "AjXrffhgUgfdfgfDFRVghvshhbkbjvbjdh"
  req.body.type = "employee"
  req.body.status=true;
  req.body.active = false,
  req.body.organizationid = req.user.id;
  req.body.expire_at=moment().add(2, 'days').format('ddd, MMM D, YYYY hh:mm:ss A');
    // user.updated_at = Date.now();
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25, // use SSL
    auth: {
      user: 'noreply@cognitiveinnovations.in',
      pass: 'Password1234*'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var expire_at = moment().add(2, 'days').format('ddd, MMM D, YYYY hh:mm:ss A');
  var created_at = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
  var linkdata = {
    created_at: created_at,
    expire_at: expire_at,
    email: req.body.email
 }
  Links.create(linkdata, function (err, link) {
    User.create(req.body, function (err, user) {
      if (err) {
        console.log(err)
        return validationError(res, err);
      }
      else {
        var activationkey = encrypt(key, user._id.toString());
        var HelperOptions = {
          from: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
          to: req.body.email,
          subject: "Docintact Account  Confirmation ",
          // text: "link to accept the invitation:" + config.frontendUrl + "/signupemployee/" + activationkey
        };

        HelperOptions.html = '<div class="background" style= "width: 680px; height: 795px; background-color: #F4F7FA; text-align: center; margin: auto;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">' +
          '<div class="logo" Style="margin-top:2rem"><img src ="https://staging.docintact.com/assets/images/Group2244.png"> </div>' +
          '<div class="innrbackground"  style=" width: 580px; height: 535px; background-color: #FFF; text-align: center; margin: auto; margin-top: 2rem;">' +

          '<img src ="https://staging.docintact.com/assets/images/verifyemail.png" style="margin-top: 2rem;" >' +
          '<h2 style="margin-top: 2rem;  font-size:22px; font-weight: 600">Verify Your Email Address</h2>' +
          '<hr  class="mt-0 hr-w hr1_bg" style="width: 85%;     margin-top: 24px !important;">' +

          '<p style="font-size:16px; margin: 65px; margin-top: 26px; margin-bottom: 18px; font-weight: 500;">In order to start using your Doc Intact account, you need to' +
          'Verify  your email address.</p>' +
          '<h4> Click the Below   Button  to verify your email Address </h4>'+
          '<span class="im">&nbsp;<a class="m_233836446190015510btn m_233836446190015510btn-primary" href="' + config.frontendUrl + "/signupemployee/" + activationkey + '"  style="text-decoration:none;display:inline-block;font-weight:normal;line-height:1.25;text-align:center;white-space:nowrap;vertical-align:middle;font-size:1rem;border-radius:0.25rem;color:#fff;background-color:#0275d8;padding:0.5rem 1rem;border:1px solid #0275d8;" target="_blank">Verify Email Address </a></span>'+ 
           '<hr  class="mt-0 hr-w" style=" width: 12%; margin-top: 35px !important;">' +

          '<p style="font-size:16px; margin: 65px; margin-top: 14px; margin-bottom: 18px; color: #A2A2A3;">if you did not sign up for this account you can ignore this email and the  ' +
          'account will be deleted.</p>' +

          '</div>' +

          '<p style="font-size: 14px;color: #A2A2A3; margin-top: 50px;"><img src ="https://staging.docintact.com/assets/images/careof.png">&nbsp;&nbsp; Doc Intact 2019</p>' +
          '</div>'



        transporter.sendMail(HelperOptions, function (err, info) {
          if (err) { res.json({ "res": "error" }) }
          else { res.json({ "res": "success" }) }
        });
      }
      res.json(user);


    });
  });


};
exports.addemployessfromexcel = async function (req, res) {
  var successdata=[]
  var userexistdata=[]
  var faileddata=[]
  // excel sheet format 
  var rawdata=[ 'SNO',
  'FIRSTNAME',
  'LASTNAME',
  'EMAIL',
  'CONTACTNO',
  'GENDER',
  'DEPARTMENT' ]

 if(JSON.stringify(req.body[0])==JSON.stringify(rawdata))
 {
   if(req.body && req.body.length!=1){
    var count =0

    for (let data of req.body) {
     
      if(count!=0){
             var employeedata={
               name:data[1]+""+data[2],
               fname:data[1],
               lname:data[2],
               gender:data[5],
               mobilenumber:data[4],
               email:data[3],
               password:'',
               departmentname:data[6],
               type : "employee",
               active : false,
               expire_at:moment().add(2, 'days').format('ddd, MMM D, YYYY hh:mm:ss A'),
               status:true,
             }
            }
            var name =/^[a-zA-Z]+$/
            var mailformat = /^([A-Za-z]|[0-9])[A-Za-z0-9.-]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})$/
            var mobilepat=/^\d{10}$/; 
            if( employeedata && employeedata.gender)  
            console.log("gdggd",mailformat.test(String(employeedata.email).toLowerCase()))
            if(employeedata && mailformat.test(String(employeedata.email).toLowerCase()) && name.test(String(employeedata.fname)) && name.test(String(employeedata.lname)) && ((String(employeedata.gender).toLowerCase()==='f')||(String(employeedata.gender).toLowerCase()==='male')||(String(employeedata.gender).toLowerCase()==='m')||(String(employeedata.gender).toLowerCase()==='female')) && mobilepat.test(employeedata.mobilenumber) && employeedata.departmentname)
            {  
              employeedata.password = "AjXrffhgUgfdfgfDFRVghvshhbkbjvbjdh"
              employeedata.organizationid = req.user.id;
              try {
                let department = await Department.findOne({$and:[{deptname: {$regex:employeedata.departmentname, $options: 'i'}},{organizationid:req.user._id},{active:true}]}).populate('organizationid').populate('parentdepartmentid').exec()
                let found = await User.findOne({ email: employeedata.email.toLowerCase()}).exec();
               if(found!=null) userexistdata.push(employeedata);
               if(!found && department)
               {
                
               if(employeedata && employeedata.departmentname)
               {
                   employeedata.department=department._id
                } 
              
                var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                secure: false,
                                port: 25,
                                auth: {
                                  user: 'noreply@cognitiveinnovations.in',
                                  pass: 'Password1234*'
                                },
                                tls: {
                                  rejectUnauthorized: false
                                }
                              });
                                          var expire_at = moment().add(2, 'days').format('ddd, MMM D, YYYY hh:mm:ss A');
                    var created_at = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
                    var linkdata = {
                      created_at: created_at,
                      expire_at: expire_at,
                      email: employeedata.email
                    }
  
  
                 let usercreate = await  User.create(employeedata,   async function (err, user) {
                  if (err) {
                  console.log(err,"errorrrrr")
               
                  }
                  else {
                    
                   var activationkey = encrypt(key, user._id.toString());
                    var HelperOptions = {
                      from: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
                      to: employeedata.email,
                      subject: "Docintact Account  Confirmation ",
                    };
  
  
  
                    HelperOptions.html = '<div class="background" style= "width: 680px; height: 795px; background-color: #F4F7FA; text-align: center; margin: auto;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">' +
                      '<div class="logo" Style="margin-top:2rem"><img src ="https://staging.docintact.com/assets/images/Group2244.png"> </div>' +
                      '<div class="innrbackground"  style=" width: 580px; height: 535px; background-color: #FFF; text-align: center; margin: auto; margin-top: 2rem;">' +
  
                      '<img src ="https://staging.docintact.com/assets/images/verifyemail.png" style="margin-top: 2rem;" >' +
                      '<h2 style="margin-top: 2rem;  font-size:22px; font-weight: 600">Verify Your Email Address</h2>' +
                      '<hr  class="mt-0 hr-w hr1_bg" style="width: 85%;     margin-top: 24px !important;">' +
  
                      '<p style="font-size:16px; margin: 65px; margin-top: 26px; margin-bottom: 18px; font-weight: 500;">In order to start using your Doc Intact account, you need to' +
                      'Verify  your email address.</p>' +
                      '<h4> Click the Below   Button  to verify your email Address </h4>'+
                      '<span class="im">&nbsp;<a class="m_233836446190015510btn m_233836446190015510btn-primary" href="' + config.frontendUrl + "/signupemployee/" + activationkey + '"  style="text-decoration:none;display:inline-block;font-weight:normal;line-height:1.25;text-align:center;white-space:nowrap;vertical-align:middle;font-size:1rem;border-radius:0.25rem;color:#fff;background-color:#0275d8;padding:0.5rem 1rem;border:1px solid #0275d8;" target="_blank">Verify Email Address </a></span>'+ 
                       '<hr  class="mt-0 hr-w" style=" width: 12%; margin-top: 35px !important;">' +
  
                      '<p style="font-size:16px; margin: 65px; margin-top: 14px; margin-bottom: 18px; color: #A2A2A3;">if you did not sign up for this account you can ignore this email and the  ' +
                      'account will be deleted.</p>' +
  
                      '</div>' +
  
                      '<p style="font-size: 14px;color: #A2A2A3; margin-top: 50px;"><img src ="https://staging.docintact.com/assets/images/careof.png">&nbsp;&nbsp; Doc Intact 2019</p>' +
                      '</div>'
  
  
  
  
                                 let mailstatus= transporter.sendMail(HelperOptions, function (err, info) {
                           if (err) { return err }
                     else { return info }
                     });
                     console.log(mailstatus)
                  return user
                
                    
                  }
                })
                 if(usercreate)successdata.push(usercreate)
              } else if(!found && !department){
                faileddata.push(employeedata)
              }
        
            } catch(e) {
            }
            }
            else {
               if(count!=0)faileddata.push(employeedata)
            }
  
      count++
    }
      res.json({ "success": successdata, "faileddata": faileddata, "userexistdata": userexistdata })
  }
  else {
    res.json({"res":"Empty data"})
  }
   }

  else {
    res.json({ "res": "Invalid excel format" })
  }
};















//=================================getting countries//===================================================================
exports.countries = function(req, res) {
  console.log(req.body.searchcountry)
  Countries.find({ name: { $regex: '^' + req.body.searchcountry, $options: 'i' }}).exec(function (err, countries) {
    console.log(countries)
    if(err) { return handleError(res, err); }
    return res.status(200).json(countries);
  })
}
//=====================================================*CONTACT US EMAIL SENDING*===============================================================
exports.contact = function (req, res) {
  const email = req.body.email;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25, // use SSL
      auth: {
        user: 'noreply@cognitiveinnovations.in',
        pass: 'Password1234*'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    var HelperOptions = {
      from: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
      to: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
      subject: "Doc Intact ",
      text: "From:\n"+req.body.email+"\n"+"Message:\n\t"+req.body.message+"\n"+"Mobile Numbe:\n\t"+req.body.mnumber
    };
    transporter.sendMail(HelperOptions, function (err, info) { 
      if (err)  res.status(202).json({ "fail": "A problem has been occurred while submitting your data." });
      res.status(200).json({ "res": "Your message has been sent successfully" })
    });
};
//===============================================================================================================
//  Get list of employees

exports.employelist = function (req, res) {
  User.find({ $and: [{ organizationid: req.user.organizationid }, { active: true }] }).exec(function (err, users) {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }
    return res.status(200).json(users);
  })
}

// exports.show = function (req, res, next) {
//   var userId = req.params.id;
//   console.log("___________________" + req.params.id)
//   User.findById(userId, function (err, user) {
//     if (err) return next(err);
//     if (!user) return res.status(401).send('Unauthorized');
//     res.json(user.profile);
//   });
// };

// get count of employees

exports.empcount = function (req, res) {
  User.find({ $and: [{ department: req.params.id }, { active: true }] }).exec(function (err, users) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(users);
  })
}

exports.employeedetails = function (req, res) {
  User.find({ $and: [{ organizationid: req.user.id }, { type: 'employee' }] ,}).populate('department').exec(function (err, users) {
    if (err) { return res.status(500).send(err); }
    return res.status(200).json(users);
  });
};

exports.searchEmployees = function (req, res) {
  console.log(req.body.search)
  User.find({ $and: [{ $or: [{ fname: { $regex: req.body.search, $options: 'i' } }, { lname: { $regex: req.body.search, $options: 'i' } },
   { mobilenumber: { $regex: req.body.search, $options: 'i' } }, { email: { $regex: req.body.search, $options: 'i' } }, 
   { departmentname: { $regex: req.body.search, $options: 'i' } }] }, {organizationid: req.user.id }, { status: true }] }).populate('department').exec(function (err, users) {
    if (err) { return res.status(500).send(err); }
    console.log(users)
    return res.status(200).json(users);
  });
};

exports.UsersSearch = function (req, res) {
  console.log(req.body.search)
  User.find({ $or: [{ name: { $regex: req.body.search, $options: 'i' } }, { fname: { $regex: req.body.search, $options: 'i' } }] }).exec(function (err, users) {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }
    else return res.status(200).json(users);
  });
};

exports.employeelogin = function (req, res) {
  var decryptid = decrypt(key, req.body.id);

  //find the link
  Links.findOne({ _id: decryptid }, function (err, link) {
    if (err) { res.status(401).json({ "error": "error" }) }
    if (!link) res.status(400).json({ "msg": "Invalid Url" })
    console.log('sdfsfd');
    if (new Date(req.body.timestamp) > new Date(link.expire_at)) {

      res.status(400).json({ "msg": "Link expired" })
    }
    else {

      //if link exits find the user

      User.findOne({ email: link.email }, function (err, user) {
        if (err) return next(err);
        if (!user) return res.status(200).send({ "data": false });
        else return res.status(200).send(user);
      });
    }

  })


}


//============================================================================================
exports.updatenewuser = function (req, res) {
  console.log(req.user.id);
  if (req.body._id) { delete req.params.id; }
  User.findOne({ _id: req.user.id }, function (err, user) {
    user.new = false;
    user.save(function (err) {
      if (err) return validationError(res, err);
    });
  });

};


exports.activateemail = function (req, res) {
  console.log("activateemail")
  var newpass = req.body.password;
  var decryptid = decrypt(key, req.body.id);
  if (newpass) {
    console.log("ifffffffffff")
    User.findOne({ email: decryptid }, '-salt -hashedPassword', function (err, user) {
      user.active = "true";
      user.new = 'true';
      user.password = newpass
      user.updated_at = Date.now();
      user.save(function (err, users) {
        if (err) return validationError(res, err);
        res.json(users)
      });
    });
  }
  else {
    User.findOne({ email: decryptid }, function (err, user) {
      if (user) {
        user.active = 'true';
        console.log(user.active)
        if (user.expire_at <= Date.now()) res.json({ "linkstatus": "Link Expired" });
        else {
          user.updated_at = Date.now();
          user.save(function (err, users) {
            if (err) return validationError(res, err);
            // res.json(users)
            res.json({ "linkstatus": "Success" });
          });
        }
      }
      else res.json({ "linkstatus": "Invalid" });
    });
  }
}


exports.resendEmail = function (req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25, // use SSL
    auth: {
      user: 'noreply@cognitiveinnovations.in',
      pass: 'Password1234*'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  console.log(req +'fbbbggddddddddddddddddd')
  if(req.body.type) req.body.email = decrypt(key, req.body.email);
  console.log(req.body.email)
  var expire_at = moment().add(2, 'days').format('ddd, MMM D, YYYY hh:mm:ss A');
  var created_at = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
  var linkdata = { created_at: created_at, expire_at: expire_at }
  User.findOne({email:req.body.email}, function (err, user) {
    if(user)
    {
      var updated = _.merge(user, linkdata);
      updated.save(function (err) { });
    }   
  })

  //  var  newUser;
  //   newUser.created_at = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
  //   newUser.created_at=moment().add(2, 'minutes').format('ddd, MMM D, YYYY hh:mm:ss A');


  var activationkey = encrypt(key, req.body.email);
  var HelperOptions = {

    from: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
    to: req.body.email,
    subject: "Docintact Account Confirmation",
    // text: "Click This link To Activate your Account : " + config.frontendUrl + "/signupemailconfirm/" + activationkey

  };
  HelperOptions.html = '<div class="background" style= "width: 680px; height: 795px; background-color: #F4F7FA; text-align: center; margin: auto;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">' +
    '<div class="logo" Style="margin-top:2rem"><img src ="https://staging.docintact.com/assets/images/Group2244.png"> </div>' +
    '<div class="innrbackground"  style=" width: 580px; height: 535px; background-color: #FFF; text-align: center; margin: auto; margin-top: 2rem;">' +

    '<img src ="https://staging.docintact.com/assets/images/verifyemail.png" style="margin-top: 2rem;" >' +
    '<h2 style="margin-top: 2rem;  font-size:22px; font-weight: 600">Verify Your Email Address</h2>' +
    '<hr  class="mt-0 hr-w hr1_bg" style="width: 85%;     margin-top: 24px !important;">' +

    '<p style="font-size:16px; margin: 65px; margin-top: 26px; margin-bottom: 18px; font-weight: 500;">In order to start using your Doc Intact account, you need to' +
    'confirm your email address.</p>' +
    '<h4> Click the Below   Button  to verify your email Address </h4>'+
    '<span class="im">&nbsp;<a class="m_233836446190015510btn m_233836446190015510btn-primary" href="' + config.frontendUrl + "/signupemailconfirm/" + activationkey + '"   style="text-decoration:none;display:inline-block;font-weight:normal;line-height:1.25;text-align:center;white-space:nowrap;vertical-align:middle;font-size:1rem;border-radius:0.25rem;color:#fff;background-color:#0275d8;padding:0.5rem 1rem;border:1px solid #0275d8;" target="_blank">Verify Email Address </a></span>'+ 

    '<hr  class="mt-0 hr-w" style=" width: 12%; margin-top: 35px !important;">' +

    '<p style="font-size:16px; margin: 65px; margin-top: 14px; margin-bottom: 18px; color: #A2A2A3;">if you did not sign up for this account you can ignore this email and the  ' +
    'account will be deleted.</p>' +

    '</div>' +

    '<p style="font-size: 14px;color: #A2A2A3; margin-top: 50px;"><img src ="https://staging.docintact.com/assets/images/careof.png">&nbsp;&nbsp; Doc Intact 2019</p>' +
    '</div>'
  transporter.sendMail(HelperOptions, function (err, info) {
    if (err) { console.log("error occured when sending mail" + err) }
    if (!err) {
      console.log("Email sent")
      res.json({ "res": "success" })
    }
  });

}

exports.resendEmailforemployee = function (req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25, // use SSL
    auth: {
      user: 'noreply@cognitiveinnovations.in',
      pass: 'Password1234*'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  console.log(req +'fbbbggddddddddddddddddd')

  console.log(req.body.email)
  var expire_at = moment().add(2, 'days').format('ddd, MMM D, YYYY hh:mm:ss A');
  var created_at = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
  var linkdata = { created_at: created_at, expire_at: expire_at }
  User.findOne({email:req.body.email}, function (err, user) {
    if(user)
    {
      var updated = _.merge(user, linkdata);
      updated.save(function (err) { });

      var activationkey = encrypt(key, user._id.toString());
      var HelperOptions = {
        from: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
        to: req.body.email,
        subject: "Docintact Account  Confirmation ",
        // text: "link to accept the invitation:" + config.frontendUrl + "/signupemployee/" + activationkey
      };



      HelperOptions.html = '<div class="background" style= "width: 680px; height: 795px; background-color: #F4F7FA; text-align: center; margin: auto;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">' +
        '<div class="logo" Style="margin-top:2rem"><img src ="https://staging.docintact.com/assets/images/Group2244.png"> </div>' +
        '<div class="innrbackground"  style=" width: 580px; height: 535px; background-color: #FFF; text-align: center; margin: auto; margin-top: 2rem;">' +

        '<img src ="https://staging.docintact.com/assets/images/verifyemail.png" style="margin-top: 2rem;" >' +
        '<h2 style="margin-top: 2rem;  font-size:22px; font-weight: 600">Verify Your Email Address</h2>' +
        '<hr  class="mt-0 hr-w hr1_bg" style="width: 85%;     margin-top: 24px !important;">' +

        '<p style="font-size:16px; margin: 65px; margin-top: 26px; margin-bottom: 18px; font-weight: 500;">In order to start using your Doc Intact account, you need to' +
        'Verify  your email address.</p>' +
        '<h4> Click the Below   Button  to verify your email Address </h4>'+
        '<span class="im">&nbsp;<a class="m_233836446190015510btn m_233836446190015510btn-primary" href="' + config.frontendUrl + "/signupemployee/" + activationkey + '"  style="text-decoration:none;display:inline-block;font-weight:normal;line-height:1.25;text-align:center;white-space:nowrap;vertical-align:middle;font-size:1rem;border-radius:0.25rem;color:#fff;background-color:#0275d8;padding:0.5rem 1rem;border:1px solid #0275d8;" target="_blank">Verify Email Address </a></span>'+ 
         '<hr  class="mt-0 hr-w" style=" width: 12%; margin-top: 35px !important;">' +

        '<p style="font-size:16px; margin: 65px; margin-top: 14px; margin-bottom: 18px; color: #A2A2A3;">if you did not sign up for this account you can ignore this email and the  ' +
        'account will be deleted.</p>' +

        '</div>' +

        '<p style="font-size: 14px;color: #A2A2A3; margin-top: 50px;"><img src ="https://staging.docintact.com/assets/images/careof.png">&nbsp;&nbsp; Doc Intact 2019</p>' +
        '</div>'

transporter.sendMail(HelperOptions, function (err, info) {
  if (err) { console.log("error occured when sending mail" + err) }
  if (!err) {
    console.log("Email sent")
    res.json({ "res": "success" })
  }
});








    }   
  })

  //  var  newUser;
  //   newUser.created_at = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
  //   newUser.created_at=moment().add(2, 'minutes').format('ddd, MMM D, YYYY hh:mm:ss A');


 

}



















exports.deleteDoc = function (req, res) {
  
  User.remove({ $or:[{'facebook.id': req.params.id},{'twitter.id_str': req.params.id}] }).exec(function (err) { 
    if(err) return res.status(200).json(err)
    else return res.status(200).json("success") 
  });
}
exports.twitteruserinfoweb = function (req, res) {
User.findOne({'twitter.id_str':req.body.twitter_id}, function (err, user) {
  if(err) return res.status(200).json(err)
  else if(!user) return res.status(200).json("No account");
  else{
    user.email = req.body.email;
    user.save(function (err) {
      if(err) return res.status(200).json(err)
      else {
        var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
        return res.json({user:user,token:token});
      }
    })
  }
})

}
exports.facebookuserinfoweb = function (req, res) {
  User.findOne({'facebook.id':req.body.facebook_id}, function (err, user) {
    if(err) return res.status(200).json(err)
    else if(!user) return res.status(200).json("No account");
    else{
      user.email = req.body.email;
      user.save(function (err) {
        if(err) return res.status(200).json(err)
        else {
          var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
          return res.json({user:user,token:token});
        }
      })
    }
  })
  
  }
// Updates an existing user in the DB.
exports.updateemployee = function (req, res) {
  var newPass = req.body.password
  if (req.body._id) { delete req.body._id; }

  User.findOne({ _id: req.body.id }, function (err, user) {
    user.password = newPass;
    user.status = req.body.status
    user.updated_at = Date.now();
    user.save(function (err) {
      if (err) return validationError(res, err);

      var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresIn: 60 * 60 * 5 });
      res.json({ token: token });
    });

  });

};



// Update Employee Details.

exports.employeelogindetails = function (req, res) {
  User.findOne({ email: req.body.email },async function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404).send('Not Found'); }
    if (req.body.type == 'replace') {
      console.log(req.body.email)
      await Sharingpeople.find({ toemail: req.body.email }, { active: true }).exec(function (err, sharingpeoples) {
        async.each(sharingpeoples, async function (element, call) {
          element.active = false
          element.updated_at = Date.now();
          element.save(function (err) {
            if (err) { return handleError(res, err); }
          });
        })
      })
      await Signature.find({ email: req.body.email }, { active: true }).exec(function (err, signatures) {
        async.each(signatures, async function (element, call) {
          element.active = false
          element.updated_at = Date.now();
          element.save(function (err) {
            if (err) { return handleError(res, err); }
          });
        })
      })
      await Photo.find({ email: req.body.email }, { active: true }).exec(function (err, photos) {
        async.each(photos, async function (element, call) {
          element.active = false
          element.updated_at = Date.now();
          element.save(function (err) {
            if (err) { return handleError(res, err); }
          });
        })
      })
      await Stamp.find({ email: req.body.email }, { active: true }).exec(function (err, stamps) {
        async.each(stamps, async function (element, call) {
          element.active = false
          element.updated_at = Date.now();
          element.save(function (err) {
            if (err) { return handleError(res, err); }
          });
        })
      })
      await Fieldoption.find({ email: req.body.email }, { active: true }).exec(function (err, fieldoptions) {
        async.each(fieldoptions, async function (element, call) {
          element.active = false
          element.updated_at = Date.now();
          element.save(function (err) {
            if (err) { return handleError(res, err); }
          });
        })
      })
      await Fieldvalue.find({ email: req.body.email }, { active: true }).exec(function (err, fieldvalues) {
        async.each(fieldvalues, async function (element, call) {
          element.active = false
          element.updated_at = Date.now();
          element.save(function (err) {
            if (err) { return handleError(res, err); }
          });
        })
      })
      await Notification.find({ toemail: req.body.email }, { active: true }).exec(function (err, fieldoptions) {
        async.each(fieldoptions, async function (element, call) {
          element.active = false
          element.updated_at = Date.now();
          element.save(function (err) {
            if (err) { return handleError(res, err); }
          });
        })
      })
      var newemail = req.body.email.substring(0, req.body.email.lastIndexOf("@"));
      console.log(newemail)
      var newmail = Math.round((new Date()).getTime() / 1000)
      var email = newemail + '_' + newmail + '@gmail.com'
      req.body.email = email
    }
    var user = _.merge(user, req.body);
    user.updated_at = Date.now();
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });
};


//checkall users
exports.checkallusers = function (req, res) {
  User.find({ email: req.body.email }).exec(function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(400).send();
    else return res.status(200).send(user);
  });

}



exports.departmentEmployess = function (req, res) {
  var users = []
  User.find({ department: req.params.id, active: true }).exec(function (err, user) {
    if (!user) return res.status(400).send();
    else
      return res.status(200).send(user);
  });

}


exports.departmentemails = function (req, res) {
  var users = []
  User.find({ department: req.params.id, active: true }).exec(function (err, user) {
    if (!user) return res.status(400).send();
    else {
      user.forEach(element => {
        users.push(element.email)
      })

    }
    return res.status(200).send(users);
  });

}
// Updates an existing user in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404).send('Not Found'); }
    var updated = _.merge(user, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });
};
//filtr users
exports.filterResults = function (req, res) {


  console.log(req.body.where)
  //req.body.fromdate= {$lte: req.body.fromdate, $gte: req.body.todate}

  User.find(req.body.where).populate('uid').populate('touid').exec(function (err, user) {

    if (err) { return handleError(res, err); }

    return res.status(200).json(user);

  });
};
//send email

exports.sendMailForSignup = function (req, res) {
  console.log(req.body.email)
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user)
    {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25, // use SSL
      auth: {
        user: 'noreply@cognitiveinnovations.in',
        pass: 'Password1234*'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    var activationkey = encrypt(key, req.body.email.toString());
  
    var HelperOptions = {
  
      from: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
      to: req.body.email,
      subject: "Docintact Account Confirmation",
      // text: "Click This link To Activate your Account : " + config.frontendUrl + "/signup/" + activationkey
  
    };
    HelperOptions.html = '<div class="background" style= "width: 680px; height: 795px; background-color: #F4F7FA; text-align: center; margin: auto;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">' +
    '<div class="logo" Style="margin-top:2rem"><img src ="https://staging.docintact.com/assets/images/Group2244.png"> </div>' +
    '<div class="innrbackground"  style=" width: 580px; height: 535px; background-color: #FFF; text-align: center; margin: auto; margin-top: 2rem;">' +

    '<img src ="https://staging.docintact.com/assets/images/verifyemail.png" style="margin-top: 2rem;" >' +
    '<h2 style="margin-top: 2rem;  font-size:22px; font-weight: 600">Verify Your Email Address</h2>' +
    '<hr  class="mt-0 hr-w hr1_bg" style="width: 85%;     margin-top: 24px !important;">' +

    '<p style="font-size:16px; margin: 65px; margin-top: 26px; margin-bottom: 18px; font-weight: 500;">In order to start  Your Free Trail using your Doc Intact account, you need to' +
    'confirm your email address.</p>' +
    '<h4> Click the Below   Button  to verify your email Address </h4>'+
    '<span class="im">&nbsp;<a class="m_233836446190015510btn m_233836446190015510btn-primary" href="' + config.frontendUrl + "/signup/" + activationkey + '"   style="text-decoration:none;display:inline-block;font-weight:normal;line-height:1.25;text-align:center;white-space:nowrap;vertical-align:middle;font-size:1rem;border-radius:0.25rem;color:#fff;background-color:#0275d8;padding:0.5rem 1rem;border:1px solid #0275d8;" target="_blank">Verify Email Address </a></span>'+ 

    '<hr  class="mt-0 hr-w" style=" width: 12%; margin-top: 35px !important;">' +

    '<p style="font-size:16px; margin: 65px; margin-top: 14px; margin-bottom: 18px; color: #A2A2A3;">if you did not sign up for this account you can ignore this email and the  ' +
    'account will be deleted.</p>' +

    '</div>' +

    '<p style="font-size: 14px;color: #A2A2A3; margin-top: 50px;"><img src ="https://staging.docintact.com/assets/images/careof.png">&nbsp;&nbsp; Doc Intact 2019</p>' +
    '</div>'
    transporter.sendMail(HelperOptions, function (err, info) {
      if (err) { console.log("error occured when sending mail" + err) }
      else {
        console.log("link sent" + id1);
        res.json({ "res": "success" })
      }
    });
  }
  });
  

};

exports.twitteruserinfo = function(req,res)
{
  var twitter = new twitterAPI({
    consumerKey: '7ByXzKGsLpep13Ov8RJ5oG9qE',
    consumerSecret: '2kr2wBmbfviB9kv3dSpgC2LC3aefMLkWMzrqHuplr8aYlAaQef',
    callback: ''
  });  
  var params = {
    'include_email' : true
   };
   twitter.verifyCredentials(req.body.token, req.body.secret, params, function(error, data, response) {
    if (error) {
      //something was wrong with either accessToken or accessTokenSecret
      //start over with Step 1
    } else {
  User.findOne({$or:[{'twitter.id_str':data.id_str},{email: data.email}]}, function (err, user) {
    if (!user) {
         user = new User({
        name: data.name,
        email: data.email,
        role: 'user',
        provider: req.body.provider,
        type:req.body.type,
        new: true,
        active: true,
        IP: req.body.IP,
        twitter: data,
      });
      if(data.email!="" || data.email!=null)
      {
        user.save(function (err) {
          if (err) return validationError(res, err);
          var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
          return res.status(200).send({ token: token, user: user });     
           });
      }
      else
      {
        user.save(function (err) {
          if (err) return validationError(res, err);
          return res.status(200).send({ user: user });
        });
      }
    } 
    else {
      console.log(user.email)
      if(user.email!="" || user.email!=null)
      {
        var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
        return res.status(200).send({ token: token, user: user });
      }
      else{
        return res.status(200).send({  user: user,emailid : 'emailnotfound' });
      }
      
    }
  })

 }
})
}

exports.twtupdate = function (req,res)
{
  // console.log(req.body)
User.findOne({'email':req.body.email}).exec(function(err,user){
if(user)
{
return res.status(200).send({statustwt:'emailexist'})
}
else
{
  User.findOne({'twitter.id_str':req.body.recordid}).exec(function(err,user)
  {
    if(user)
    {
      
    user.email = req.body.email;
    user.save(function (err) {
      if(err) return res.status(200).json(err)
      else {
        var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
        return res.json({user:user,token:token});
      }
    })
    }
    else{
      return res.json({twitwrusr:'somethingwrong'});
    }
  })
}
})
}


exports.fbverifyemail = function (req,res)
{
// console.log(req.body.fbuniqid.id)
User.findOne({'facebook.id':req.body.fbuniqid.id}).exec(function(err,user){
  if(user)
  {
    // console.log(user.email)
    if(user.email!=undefined && user.email!="" && user.email!=null)
    {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
      return res.status(200).send({ token: token, user: user });
    }
    else{
      return res.status(200).send({  user: user,emailid : 'emailnotfound' });
    }
  }
  else
  {
    return res.status(200).send({  user: user,emailuser : 'usernotfound' });
  }
})

}

exports.fbupdateemail = function (req,res)
{
  // console.log(req.body)
  User.findOne({'email':req.body.email}).exec(function(err,user){
    if(user)
    {
    return res.status(200).send({statusface:'emailexist'})
    }
    else
    {
      User.findOne({'facebook.id':req.body.fbupdateid}).exec(function(err,user)
      {
        if(user)
        {
         user.email = req.body.email;
        user.save(function (err) {
          if(err) return res.status(200).json(err)
          else {
            var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
            return res.json({user:user,token:token});
          }
        })
        }
        else{
          return res.json({twitwrusr:'somethingwrong'});
        }
      })
    }
    })
}
//mobilesocial login
exports.sociallogin = function (req, res, next) {
  console.log(req.body)
  req.body.IP = req.connection.remoteAddress;
  User.findOne({
    'email': req.body.email
  }, function (err, user) {
    if (!user) {
      if(req.body.provider=='google')
      {
        user = new User({
          name: req.body.name,
          email: req.body.email,
          role: 'user',
          provider: req.body.provider,
          type:req.body.type,
          new: true,
          active: true,
          IP: req.body.IP,
          google: req.body,
        });
      }else 
      {
        user = new User({
          name: req.body.name,
          email: req.body.email,
          role: 'user',
          provider: req.body.provider,
          type:req.body.type,
          new: true,
          active: true,
          IP: req.body.IP,
          facebook:req.body.facebook,
        });
      }
     
      user.save(function (err) {
        if (err) return validationError(res, err);
        var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
        return res.status(200).send({ token: token, user: user });
      });
    } else {
      console.log(user)
      var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
      return res.status(200).send({ token: token, user: user });
    }
  })
};

exports.googledrivemobile =function(req,res)
{
  // ya29.GlshB_bsPiKs7TpmDIWhLMWqLZRIfQFmE3NE7nNo0T_lvf4yfjOvP3Jvs149kfCj_iPnftBcY_FMK81cIcCpzt4P5WRvIYcD332euc0Imbu6U2K4ZMWVhj5yArJj
  console.log(req.body)
  var request = require('request')
  var headers = { "Authorization": 'Bearer ' + req.body.googletoken }
  request.get({
    url: 'https://www.googleapis.com/drive/v3/files/',
    headers: headers
  }, function (error, response, filedata) {
  console.log(response.body)
  console.log(filedata)
return res.status(200).json(filedata)
  })
    
}
exports.getuser=function(req,res){
  console.log("ssssssssssssssssssssssssssssssssssssssssssss")
  console.log(req.params.id,'venki')
  User.findOne({ _id: req.params.id }).exec(function (err, users) {
    if (err) return res.status(500).send(err);
    else{

      return res.status(200).json(users)}
    
  }); 
}

/**
* Authentication callback
*/
exports.authCallback = function (req, res, next) {
  res.redirect('/');
};

function handleError(res, err) {
  return res.status(500).send(err);
}

