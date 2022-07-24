'use strict';

var _ = require('lodash');
var Mobilelink = require('./mobilelink.model');
var config = require('../../config/environment');
const nodemailer = require('nodemailer');
var moment=require('moment')

var key = "secretkey";
var crypto = require("crypto")
function encrypt(key, data) {
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(key, data) {
  var decipher = crypto.createDecipher('aes-256-cbc', key);
  var decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}
// Get list of mobilelinks
exports.index = function(req, res) {
  Mobilelink.find(function (err, mobilelinks) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(mobilelinks);
  });
};

// Get a single mobilelink
exports.show = function(req, res) {
  Mobilelink.findById(decrypt(key,req.params.id), function (err, mobilelink) {
    if(err) { return handleError(res, err); }
    if(!mobilelink) { return res.status(404).send('Not Found'); }
    if(new Date() > mobilelink.expire_at) return res.status(200).json({expired:true});
    return res.status(200).json(mobilelink);
  });
};

// Creates a new mobilelink in the DB.
exports.create = function(req, res) {
  req.body.expire_at=moment().add(10, 'minutes').format('ddd, MMM D, YYYY hh:mm:ss A');
  Mobilelink.create(req.body, async function(err, mobilelink) {
    if(err) { return handleError(res, err); }
    await sendMessage(mobilelink)
    return res.status(201).json(mobilelink);
  });
};

// Updates an existing mobilelink in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  req.body.toIP=req.connection.remoteAddress;
  req.body.expire_at = Date.now()
  Mobilelink.findById(req.params.id, function (err, mobilelink) {
    console.log(err)
    if (err) { return handleError(res, err); }
    if(!mobilelink) { return res.status(404).send('Not Found'); }
    var updated = _.merge(mobilelink, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (err) { 
        console.log(err)
        return handleError(res, err); }
      return res.status(200).json(mobilelink);
    });
  });
};

// Deletes a mobilelink from the DB.
exports.destroy = function(req, res) {
  Mobilelink.findById(req.params.id, function (err, mobilelink) {
    if(err) { return handleError(res, err); }
    if(!mobilelink) { return res.status(404).send('Not Found'); }
    mobilelink.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

// function sendEmail(Emaildata){
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     secure: false,
//     port: 25, // use SSL
//     auth: {
//       user: 'noreply@cognitiveinnovations.in',
//       pass: 'Password1234*'
//     },
//     tls: {
//       rejectUnauthorized: false
//     }
//   });
//   if (Emaildata.type) {
//     var mobilelinkid = encrypt(key, Emaildata._id.toString());

//       var HelperOptions = {
//         from: '"DOCINTACT" <noreply@cognitiveinnovations.in>',
//         to: Emaildata.email,
//         subject: "Doc Intact ",
//         text: "link for upload the "+Emaildata.type+" : " + config.frontendUrl + "/uploadbylink/" + mobilelinkid
//       };
//   }
//   transporter.sendMail(HelperOptions, function (err, info) {
//     if (err) {console.log("error occured when sending mail" + err) }
//     else {console.log("link sent"); }
//   });
// }


function sendMessage(MessageData) {
  var AWS = require('aws-sdk');
  if (MessageData.type) {
    var mobilelinkid = encrypt(key, MessageData._id.toString());
    AWS.config.region = 'us-east-1';
    var sns = new AWS.SNS();
    var params = {
      Message: "Please click this link to upload the " + MessageData.type + " for DOCINTACT : " + config.frontendUrl + "/uploadbylink/" + mobilelinkid,
      MessageStructure: 'string',
      PhoneNumber: MessageData.phNumber,
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
           DataType: 'String',
           StringValue: 'Transactional'
        }}
    }
    console.log(params)
    var AWS = require('aws-sdk');
    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31'}).publish(params).promise();

    publishTextPromise.then(
      function (data) {
        console.log("Message ${params.Message} send sent to the topic ${params.TopicArn}");
        console.log("MessageID is " + data.MessageId);
      }).catch(
        function (err) {
          console.error(err, err.stack);
        });
  }
}