'use strict';

var _ = require('lodash');
var Link = require('./link.model');
const nodemailer = require('nodemailer');
const moment = require('moment');
// Get list of links
exports.index = function(req, res) {
  Link.find(function (err, links) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(links);
  });
};

// Get a single link
exports.show = function(req, res) {
  Link.findById(req.params.id, function (err, link) {
    if(err) { return handleError(res, err); }
    if(!link) { return res.status(404).send('Not Found'); }
    return res.json(link);
    });
    };

// Creates a new link in the DB.
exports.create = function(req, res) {
console.log('create', req.body);
    Link.create(req.body, function(err, link) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(link);
    });
   };

// Creates a new links in the DB from .
exports.create1 = function (req, res) {
  console.log('createone otp', req.body);
  var random = Math.floor(Math.random() * (1000000 - 100000) + 100000); var data = {};
  Link.findOne({ EmailId: req.body.EmailId }).exec(function (err, link) {
    if (link) {
      nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 25,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'rahul.pentakota@cognitiveinnovations.in', // generated ethereal user
            pass: 'anna@COGNITIVE' // generated ethereal password
          }
        });

        link.EmailId = req.body.EmailId,
        link.create_At = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
        link.expire_At = moment().add(120, 'seconds').format('ddd, MMM D, YYYY hh:mm:ss A');
        link.otp = random;

        // setup email data with unicode symbols
        let mailOptions = {
          from: '"CHATINTACT 👻" <rahul.pentakota@cognitiveinnovations.in>', // sender address
          to: req.body.EmailId, // list of receivers
          subject: 'Testing ✔', // Subject line
          text: 'Hello', // plain text body
          html: 'Your one time password for CHATINTACT ' + random // html body
        };
        console.log("OTP",random)
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) { }
          link.save();
          res.json({ result: "Sucessfully Sent" });
        });
      });
    }
    else {
      var dataa = {};
      nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 25,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'rahul.pentakota@cognitiveinnovations.in', // generated ethereal user
            pass: 'anna@COGNITIVE' // generated ethereal password
          }
        });
        // setup email data with unicode symbols
        let mailOptions = {
          from: '"CHATINTACT 👻" <rahul.pentakota@cognitiveinnovations.in>', // sender address
          to: req.body.EmailId, // list of receivers
          subject: 'Testing ✔', // Subject line
          text: 'Hello', // plain text body
          html: 'Your one time password for CHATINTACT ' + random // html body
        };
        dataa.IP = req.connection.remoteAddress;
        dataa.EmailId = req.body.EmailId,
        dataa.create_At = moment().format('ddd, MMM D, YYYY hh:mm:ss A');
        dataa.expire_At = moment().add(120, 'seconds').format('ddd, MMM D, YYYY hh:mm:ss A');
        dataa.otp = random;
        console.log("OTP",random);
        console.log("dataa",dataa);
        Link.create(dataa);
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) { }
          res.json({ result: "Success" });
        });
      });
    }
  }
  )
}
// Updates an existing link in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Link.findById(req.params.id, function (err, link) {
    if (err) { return handleError(res, err); }
    if(!link) { return res.status(404).send('Not Found'); }
    var updated = _.merge(link, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(link);
    });
  });
};

// Deletes a link from the DB.
exports.destroy = function(req, res) {
  Link.findById(req.params.id, function (err, link) {
    if(err) { return handleError(res, err); }
    if(!link) { return res.status(404).send('Not Found'); }
    link.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}