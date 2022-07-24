'use strict';

var _ = require('lodash');
var Stamp = require('./stamp.model');
const selfCert = require('self-cert')
var key = "secretkey";
var crypto = require("crypto")
const AWS = require('aws-sdk');
var fs = require('fs');
var moment = require("moment")

const path = require('path');
function encrypt(key, data) {
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');

  return crypted;
}

// ===================== Get single Stamp =======================

exports.getstamp = function(req, res) {
  console.log(req.params.id)
  Stamp.findById(req.params.id).populate('uid').exec( function (err, stamp) {
    if(err) { return handleError(res, err); }
    if(!stamp) { return res.status(404).send('Not Found'); }
    return res.status(200).json(stamp);
  });
};

// ==================================================================
// Get list of current user stamps
exports.index = function (req, res) {
  Stamp.find({ $and: [{ email: req.params.email }, { setDelete: false }, { active: true }] }).sort({ created_at: 'desc' }).exec(function (err, stamps) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(stamps);
  });
};
//get default stamp
exports.getDefault = function(req, res) {
  Stamp.findOne({$and:[{email:req.params.id},{setDefault:true},{setDelete:false}]}).exec( function (err, stamp) {
    if(err) { return handleError(res, err); }
    if(!stamp) { return res.status(404).send('Not Found'); }
    return res.status(200).json(stamp);
  });
};
// Updates an existing stamp for the setDefault/setDelete stamp.
exports.setDefaultSetting = function (req, res) {
  Stamp.findById(req.params.id, function (err, stamp) {
    if (err) { return handleError(res, err); }
    if (!stamp) { return res.status(404).send('Not Found'); }
    if (req.body.setDefault && !req.body.setDelete) {
      Stamp.update({ $and: [{ email: req.body.email }, { setDelete: false }, { active: true }] }, { $set: { setDefault: false } }, { multi: true }, function (err, stamps) {
        if (err) { return handleError(res, err); }
        var updated = _.merge(stamp, req.body);
        updated.updated_at = Date.now();
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.status(200).json(stamp);
        });
      });
    }
    else {
      console.log(req.body.setDefault)
      var updated = _.merge(stamp, req.body);
      updated.updated_at = Date.now();
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(stamp);
      });
    }

  });
};

// Get a single stamp
exports.show = function (req, res) {
  Stamp.findById(req.params.id, function (err, stamp) {
    if (err) { return handleError(res, err); }
    if (!stamp) { return res.status(404).send('Not Found'); }
    return res.json(stamp);
  });
};

// Creates a new stamp in the DB.
exports.create = async function (req, res) {
  var file = {};
  file.originalFilename = req.files.uploads.originalFilename;
  file.path = req.files.uploads.path;
  file.path = file.path.replace("../", "");
  file.path = file.path.replace("backend/", "");
  file.size = req.files.uploads.size;
  file.type = req.files.uploads.type;
  file.name = req.files.uploads.name;
  if (req.body.folderid) file.folderid = req.body.folderid;
  var encryptedid = encrypt(key, file.name);
  file.encryptedid = encryptedid;
  if(req.body.uid) file.uid = req.body.uid;
  file.email=req.body.email;
  file.type = req.body.type;
  file.expirydate = new Date(moment().add(365, 'days').format())

  var p = await uploadS3(__dirname + '/../../../' + file.path, 'stamp', true, function (p) {
    file.path = p;
    Stamp.create(file, function (err, stamp) {
      if (err) { return handleError(res, err); }
      else {
        const certDetails = selfCert({
          attrs: {
            commonName: 'CognitiveInnovations.in',
            countryName: 'IN',
            stateName: 'AP',
            locality: 'VSP',
            orgName: 'Cognitive Innovations',
            shortName: stamp._id
          },
          bits: 2048,
          expires: file.expirydate
        })
        Stamp.findById(stamp._id, function (err, updateStamp) {
          if (err) { return handleError(res, err); }
          if (!stamp) { return res.status(404).send('Not Found'); }
          var data = {};
          data.privateKey = certDetails.privateKey;
          data.publicKey = certDetails.publicKey;
          data.certificate = certDetails.certificate;
          var updated = _.merge(stamp, data);
          updated.save(function (err) {
            if (err) { return handleError(res, err); }
            else {
              fs.mkdirSync('./stamp/' + stamp._id);
              fs.writeFile('./stamp/' + stamp._id + '/stamp.pem', stamp.certificate, async function (err) {
                if (err) throw err;
                else {
                  var p = await uploadS3(__dirname + '/../../../' + 'stamp/' + stamp._id + '/stamp.pem', 'stamp', true, function (pempath) {
                    stamp.pemFilePath = pempath
                    stamp.save(function (err, updatedstamp) {
                      if (err) return res.status(500).send(err);
                      return res.status(200).json(updatedstamp);
                    });
                  });
                }
              });
            }
          });
        });
      }
    });
  });
};


/////--------------- Upload file to S3 Start----------------------
async function uploadS3(filePath,folderName, deleteFile, callback){
  //configuring the AWS environment
  AWS.config.update({
    accessKeyId: "AKIAYLZVQDQMJIGVCQUM",
    secretAccessKey: "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"
    });

  var s3 = new AWS.S3();
  //configuring parameters
  var params = {
    Bucket: 'docintact',
    Body : fs.createReadStream(filePath),
    Key : folderName+"/"+Date.now()+"_"+path.basename(filePath)
  };
  s3.upload(params, function (err, data) {
    //handle error
    if (err) {
    console.log("Error", err);
    }
    //success
    if (data) {
     if(deleteFile) if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    console.log("Uploaded in:", data.Location);
    if(callback) callback(data.Location);
    else return data.Location;
    }
  });
}
/// ----------Upload file to S3 End---------------------

// Creates a new stamp from mobilelink in the DB.
exports.createfrommobilelink = async function (req, res) {
  var file = {};
  file.originalFilename = req.files.uploads.name;
  file.path = req.files.uploads.path;
  file.path = file.path.replace("../", "");
  file.path = file.path.replace("backend/", "");
  file.size = req.files.uploads.size;
  file.type = req.files.uploads.type;
  file.name = req.files.uploads.name;
  if (req.body.folderid) file.folderid = req.body.folderid;
  var encryptedid = encrypt(key, file.name);
  file.encryptedid = encryptedid,
  file.type = req.body.type
  file.expirydate = new Date(moment().add(365, 'days').format())

  var p = await uploadS3(__dirname + '/../../../' + file.path, 'stamp', true, function (p) {
    file.path = p;
    Stamp.create(file, function (err, stamp) {
      if (err) { return handleError(res, err); }
      else {
        const certDetails = selfCert({
          attrs: {
            commonName: 'CognitiveInnovations.in',
            countryName: 'IN',
            stateName: 'AP',
            locality: 'VSP',
            orgName: 'Cognitive Innovations',
            shortName: stamp._id
          },
          bits: 2048,
          expires: file.expirydate
        })
        Stamp.findById(stamp._id, function (err, updateStamp) {
          if (err) { return handleError(res, err); }
          if (!stamp) { return res.status(404).send('Not Found'); }
          var data = {};
          data.privateKey = certDetails.privateKey;
          data.publicKey = certDetails.publicKey;
          data.certificate = certDetails.certificate;
          var updated = _.merge(stamp, data);
          updated.save(function (err) {
            if (err) { return handleError(res, err); }
            else {
              fs.mkdirSync('./stamp/' + stamp._id);
              fs.writeFile('./stamp/' + stamp._id + '/stamp.pem', stamp.certificate, function (err) {
                if (err) throw err;
                else
                  return res.status(200).json(stamp);
              });
            }
          });
        });
      }
    });
  });
};

// Updates an existing stamp in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Stamp.findById(req.params.id, function (err, stamp) {
    if (err) { return handleError(res, err); }
    if (!stamp) { return res.status(404).send('Not Found'); }
    var updated = _.merge(stamp, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(stamp);
    });
  });
};

// Deletes a stamp from the DB.
exports.destroy = function (req, res) {
  Stamp.findById(req.params.id, function (err, stamp) {
    if (err) { return handleError(res, err); }
    if (!stamp) { return res.status(404).send('Not Found'); }
    stamp.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}