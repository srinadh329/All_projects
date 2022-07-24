'use strict';

var _ = require('lodash');
var Admin = require('./admin.model');

//var Message = require('../message/message.model');


var User = require('../user/user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var rn = require('random-number');
var links = require('../link/link.model');
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





// Get list of admins
exports.index = function(req, res) {
  Admin.find(function (err, admins) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(admins);
  });
};
// Get a single admin
exports.show = function(req, res) {
  console.log("4545",req.params.id);
  Admin.find({_id:req.params.id}, function (err, admin) {
    if(err) { return handleError(res, err); }
    if(!admin) { return res.status(404).send('Not Found'); }
    return res.json(admin);
  });
};




//create a organization users

exports.createuser = function(req,res){

  var password = generatepassword();
  //console.log(password);
  var obj = { Name: req.body.contact_person_name, EmailId: req.body.contact_person_email,password:password,organization_id:req.body.organization_id,roleid:req.body.roleid};
  var newUser = new User(obj);
  User.find({'EmailId':req.body.contact_person_email},function(err,response){
      if(err){return handleError(res, err); }
      //console.log(response.length);
      if(response.length !=0){
      return res.status(200).json({ message: "EmailID already exists" });
      } else {
        var newUser = new User(obj);
        newUser.save(async function (err, user) {
          console.log('23444',user);
           
          var dataa = {};
          dataa.IP = req.connection.remoteAddress;
          dataa.EmailId =  req.body.contact_person_email,
          dataa.create_At = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
          dataa.expire_At = moment().add(5000, 'seconds').format('ddd, MMM D, YYYY hh:mm:ss A');
          await links.create(dataa);
          if (err) return validationError(res, err);
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25, // use SSL
            auth: {
                user: 'rahul.pentakota@cognitiveinnovations.in',
                pass: 'anna@COGNITIVE'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
  
      var HelperOptions = {
                  from: '"CHATINTACT 👻" <rahul.pentakota@cognitiveinnovations.in>', // sender address
                  to: "madhu.desetti@cognitiveinnovations.in",
                  subject: " Login Details ",
  
              };
              HelperOptions.html = '<p> EMAIL ID :' + req.body.contact_person_email + '</p>' +
                                  '<p> Password :' + password +  '</p>'
      
              transporter.sendMail(HelperOptions, function(err, info) {
  
                  if (err) {
                      res.json({ "res": "Server error" })
                  } else {
                      res.json({ "res": "success" })
  
                  }
              });  
          var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
          return res.status(200).json({ message: "Sucess" });  
         // res.json({ token: token, result: user });
        });
       


      }
  });
  
}

// Creates a new admin in the DB.
exports.create = function(req, res) {
 
  if(req.body.organization_name != null &&  req.body.contact_person_name != null &&  req.body.contact_person_email != null &&  req.body.contact_person_phonenumber != null &&  req.body.alternate_phonenumber != null ){
  //var organization_id = Math.floor(100000 + Math.random() * 900000);
  var password = generatepassword();
   //console.log(password);
  // console.log('hello');
  var roleid = req.body.roleid;
  var Name = req.body.contact_person_name;
  var EmailId = req.body.contact_person_email;
  
  
  
  Admin.find({ 'organization_name': req.body.organization_name }).sort({_id:-1}).limit(1).exec(function(err, response) {
    if(err) { return handleError(res, err); }
    if (response.length!=0) {
      if(response[0].organization_name){
      return res.status(200).json({ message: "Organization Name already exists" });
      } 
    } else {
      Admin.find({}).sort({_id:-1}).limit(1).exec(function(err,result){
       //console.log(result); 
      if(err) { return handleError(res, err); }
        
      if(result.length==0){
     
        var org_id = 0;
      } else{
        
        var org_id = result[0].organization_id ;
      }
      var organization_id = parseInt(org_id)+1;
     
      
      var myobj = { organization_id: organization_id, organization_name: req.body.organization_name,contact_person_name:req.body.contact_person_name,contact_person_email:req.body.contact_person_email,contact_person_phonenumber:req.body.contact_person_phonenumber,alternate_phonenumber:req.body.alternate_phonenumber,organization_status:req.body.organization_status };
      //console.log(myobj);
        Admin.create(myobj, function(err, admin) {
          var obj = { Name: req.body.contact_person_name, EmailId: req.body.contact_person_email,password:password,organization_id:admin._id,roleid:roleid};
      var newUser = new User(obj);
          // console.log('77777',admin);
        if(err) { return handleError(res, err); }
      //return res.status(200).json({ message: "Organization Added successfully" });
      
      newUser.save(async function (err, user) {
        var dataa = {};
          dataa.IP = req.connection.remoteAddress;
          dataa.EmailId =  req.body.contact_person_email,
          dataa.create_At = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
          dataa.expire_At = moment().add(5000, 'seconds').format('ddd, MMM D, YYYY hh:mm:ss A');
          await links.create(dataa);
        if (err) return validationError(res, err);
       
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25, // use SSL
            auth: {
                user: 'rahul.pentakota@cognitiveinnovations.in',
                pass: 'anna@COGNITIVE'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

    var HelperOptions = {
                from: '"CHATINTACT 👻" <rahul.pentakota@cognitiveinnovations.in>', // sender address
                to: "madhu.desetti@cognitiveinnovations.in",
                subject: " Login Details ",

            };
            HelperOptions.html = '<p> EMAIL ID :' + req.body.contact_person_email + '</p>' +
                                '<p> Password :' + password +  '</p>'
    
            transporter.sendMail(HelperOptions, function(err, info) {

                

                if (err) { }
                res.json({ result: "Success" });


            });  
            var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
            return res.status(200).json({ message: "Sucess" });  
       // res.json({ token: token, result: user });
        //checkinvitation(user);
    
      });
    });
  }); 
      
      
      
    }
    
  });            
} else {
  return res.status(200).json({ message: "Fields Missing" }); 
} 
};

function generatepassword(){
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
var string_length = 8;
var randomstring = '';
var charCount = 0;
var numCount = 0;

for (var i=0; i<string_length; i++) {
    // If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
    if((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
        var rnum = Math.floor(Math.random() * 10);
        randomstring += rnum;
        numCount += 1;
    } else {
        // If any of the above criteria fail, go ahead and generate an alpha character from the chars string
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
        charCount += 1;
    }
}
return randomstring;
}

// Updates an existing admin in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Admin.findById(req.params.id, function (err, admin) {
    if (err) { return handleError(res, err); }
    if(!admin) { return res.status(404).send('Not Found'); }
    var updated = _.merge(admin, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(admin);
    });
  });
};

//Change Password
exports.changepassword = function (req, res, next) {
  if(req.body.id != null &&  req.body.oldpassword != null && req.body.newpassword !=null && req.body.confirmpassword !=null){
  var userId = req.body.id;
 // console.log(userId);
  var oldPass = String(req.body.oldpassword); 
  var newPass          = String(req.body.newpassword);
  var confirmPass  = String(req.body.confirmpassword);
  
  User.findById(userId, function (err, user) {
    //console.log(user);
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      if(newPass == confirmPass){
      //console.log('sucess');
      user.save(function (err) {
        if (err) return validationError(res, err);
        return res.status(200).json({ message: "Password Updated Successfully" });
        // res.json({res:"Success"})
      });
      } else {
        return res.status(200).json({ message: "Incorrect New Password AND Confirm Password" });  
      }
    } else {
      
      return res.status(200).json({ message: "Incorrect Old Password" }); 
      // res.status(403).send('Forbidden');
    }
  });
  } else {
    return res.status(200).json({ message: "Fields Missing" }); 
  }
};


// Deletes a admin from the DB.
exports.destroy = function(req, res) {
  Admin.findById(req.params.id, function (err, admin) {
    if(err) { return handleError(res, err); }
    if(!admin) { return res.status(404).send('Not Found'); }
    admin.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}