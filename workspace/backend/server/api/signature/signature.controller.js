'use strict';

var _ = require('lodash');
var Signature = require('./signature.model');
var async = require('async');
const selfCert = require('self-cert')
const AWS = require('aws-sdk');
var fs = require('fs');
const path = require('path');
// var mammoth = require("mammoth");

var key = "secretkey";
var crypto = require("crypto")
var moment = require("moment")
function encrypt(key, data) {
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');

  return crypted;
}
// Get list of current user signatures
exports.index = function (req, res) {
  Signature.find({ $and: [{ email: req.params.email }, { setDelete: false }, { active: true }, { signtype: 'signature' }] }).sort({ created_at: 'desc' }).exec(function (err, signatures) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(signatures);
  });
};
// Get list of Initial user signatures
exports.initialList = function (req, res) {
  Signature.find({ $and: [{ email: req.params.email }, { setDelete: false }, { active: true }, { signtype: 'initial' }] }).sort({ created_at: 'desc' }).exec(function (err, signatures) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(signatures);
  });
};
// Updates an existing signature for the setDefault/setDelete signature.
exports.setDefaultSetting = function (req, res) {
  Signature.findById(req.params.id, function (err, signature) {
    if (err) { return handleError(res, err); }
    if (!signature) { return res.status(404).send('Not Found'); }
    if (req.body.setDefault && !req.body.setDelete) {
      Signature.update({ $and: [{ email: req.body.email }, { setDelete: false }, { active: true }, { signtype: req.body.signtype }] }, { $set: { setDefault: false } }, { multi: true }, function (err, signatures) {
        if (err) { return handleError(res, err); }
        var updated = _.merge(signature, req.body);
        updated.updated_at = Date.now();
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.status(200).json(signature);
        });
      });
    }
    else {
      console.log(req.body.setDefault)
      var updated = _.merge(signature, req.body);
      updated.updated_at = Date.now();
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(signature);
      });
    }

  });
};

// ===================== get single signature =======================

exports.getsignature = function (req, res) {
  console.log(req.params.id)
  Signature.findById(req.params.id).populate('uid').exec(function (err, signature) {
    if (err) { return handleError(res, err); }
    if (!signature) { return res.status(404).send('Not Found'); }
    return res.json(signature);
  });
};

// ==================================================================

// Get a single signature
exports.show = function (req, res) {
  Signature.findById(req.params.id, function (err, signature) {
    if (err) { return handleError(res, err); }
    if (!signature) { return res.status(404).send('Not Found'); }
    let buff = signature.signaturebaseData.data;
    let base64data = buff.toString('base64');
    res.json({ pic: base64data });
    // return res.json(signature);
  });
};

//get default signature
exports.getDefault = function (req, res) {
  console.log(req.params.email + "" + req.body.signtype)
  Signature.findOne({ $and: [{ email: req.params.email }, { setDefault: true }, { signtype: req.body.signtype }, { setDelete: false }] }).exec(function (err, signature) {
    console.log({ $and: [{ email: req.params.email }, { setDefault: true }, { signtype: req.body.signtype }, { setDelete: false }] })
    if (err) { return handleError(res, err); }
    if (!signature) { return res.status(404).send('Not Found'); }
    return res.status(200).json(signature);
  });
};

// Creates a new signature in the DB.
exports.create = async function (req, res) {
  var shell = require('shelljs');
  var fs = require('fs');
  var file = {};
  console.log(req.body)
  if (req.body.type == "signaturepad") {
    file.signaturebaseData = req.body.signdata.base64
    file.type = req.body.type
    file.uid = req.body.uid
    file.signtype = req.body.signtype
    file.size = req.body.size
    file.email = req.body.email
  }
  else if (req.body.type == "fileupload") {
    file.originalFilename = req.files.uploads.originalFilename;
    file.path = req.files.uploads.path;
    file.path = file.path.replace("../", "");
    file.path = file.path.replace("backend/", "");
    file.size = req.files.uploadssize;
    file.type = req.files.uploads.type;
    file.name = req.files.uploads.name;
    if (req.body.folderid) file.folderid = req.body.folderid;
    var encryptedid = encrypt(key, file.name);
    file.encryptedid = encryptedid,
    file.uid = req.body.uid;
    file.type = req.body.type
    file.signtype = req.body.signtype
    file.email = req.body.email
  }
  else if (req.body.type == "font") {
    file.fontText = req.body.fonttype;
    file.fontStyle = req.body.fontstyle;
    file.type = req.body.type
    file.uid = req.body.uid
    file.signtype = req.body.signtype
    file.email = req.body.email
  }
  
  file.expirydate = new Date(moment().add(365, 'days').format())

  if (req.body.type == "fileupload"){
    var p = await uploadS3(__dirname + '/../../../' + file.path, 'signature', true, function (p) {
      file.path = p;
      Signature.create(file, function (err, signature) {
        if (err) {
          return handleError(res, err);
        }
        else {
          const certDetails = selfCert({
            attrs: {
              commonName: 'CognitiveInnovations.in',
              countryName: 'IN',
              stateName: 'AP',
              locality: 'VSP',
              orgName: 'Cognitive Innovations',
              shortName: signature._id
            },
            bits: 2048,
            expires: file.expirydate
          })
          Signature.findById(signature._id, function (err, updateSignature) {
            if (err) { return handleError(res, err); }
            if (!signature) { return res.status(404).send('Not Found'); }
            var data = {};
            data.privateKey = certDetails.privateKey;
            data.publicKey = certDetails.publicKey;
            data.certificate = certDetails.certificate;
            var updated = _.merge(signature, data);
            updated.save(function (err) {
              if (err) { return handleError(res, err); }
              else {
                fs.mkdirSync('./signature/' + signature._id);
                fs.writeFile('./signature/' + signature._id + '/signature.pem', signature.certificate, async function (err) {
                  if (err) throw err;
                  else {
                    var p = await uploadS3(__dirname + '/../../../' + 'signature/' + signature._id + '/signature.pem', 'signature', true, function (pempath) {
                      signature.pemFilePath = pempath
                      signature.save(function (err, updatedsignature) {
                        if (err) return res.status(500).send(err);
                        console.log(updatedsignature)
                        return res.status(200).json(updatedsignature);
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
  }
  else{
    Signature.create(file, function (err, signature) {
      if (err) {
        return handleError(res, err);
      }
      else {
        const certDetails = selfCert({
          attrs: {
            commonName: 'CognitiveInnovations.in',
            countryName: 'IN',
            stateName: 'AP',
            locality: 'VSP',
            orgName: 'Cognitive Innovations',
            shortName: signature._id
          },
          bits: 2048,
          expires: file.expirydate
        })
        Signature.findById(signature._id, function (err, updateSignature) {
          if (err) { return handleError(res, err); }
          if (!signature) { return res.status(404).send('Not Found'); }
          var data = {};
          data.privateKey = certDetails.privateKey;
          data.publicKey = certDetails.publicKey;
          data.certificate = certDetails.certificate;
          var updated = _.merge(signature, data);
          updated.save(function (err) {
            if (err) { return handleError(res, err); }
            else {
              fs.mkdirSync('./signature/' + signature._id);
              fs.writeFile('./signature/' + signature._id + '/signature.pem', signature.certificate, async function (err) {
                if (err) throw err;
                else {
                  var p = await uploadS3(__dirname + '/../../../' + 'signature/' + signature._id + '/signature.pem', 'signature', true, function (pempath) {
                    signature.pemFilePath = pempath
                    signature.save(function (err, updatedsignature) {
                      if (err) return res.status(500).send(err);
                      console.log(updatedsignature)
                      return res.status(200).json(updatedsignature);
                    });
                  });
                }
              });
            }
          });
        });
      }
    });
  }
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

// Creates a new signature from mobilelink in the DB.
exports.createfrommobilelink = function (req, res) {
  var shell = require('shelljs');
  var fs = require('fs');
  var file = {};
  if (req.body.type == "signaturepad") {
    file.signaturebaseData = req.body.signdata
    file.type = req.body.type
  }
  // else if (req.body.type == "fileupload") {
  //   file.originalFilename = req.files.uploads[0].originalFilename;
  //   file.path = req.files.uploads[0].path;
  //   file.path = file.path.replace("../", "");
  //   file.path = file.path.replace("backend/", "");
  //   file.size = req.files.uploads[0].size;
  //   file.type = req.files.uploads[0].type;
  //   file.name = req.files.uploads[0].name;
  //   if (req.body.folderid) file.folderid = req.body.folderid;
  //   var encryptedid = encrypt(key, file.name);
  //   file.encryptedid = encryptedid,
  //   file.type = req.body.type
  // }
  // else if (req.body.type == "font") {
  //   file.fontText = req.body.fonttype;
  //   file.fontStyle = req.body.fontstyle;
  //   file.type = req.body.type
  // }
  file.expirydate = new Date(moment().add(365, 'days').format())

  Signature.create(file, function (err, signature) {
    if (err) { return handleError(res, err); }
    else {
      const certDetails = selfCert({
        attrs: {
          commonName: 'CognitiveInnovations.in',
          countryName: 'IN',
          stateName: 'AP',
          locality: 'VSP',
          orgName: 'Cognitive Innovations',
          shortName: signature._id
        },
        bits: 2048,
        expires: file.expirydate
      })
      Signature.findById(signature._id, function (err, updateSignature) {
        if (err) { return handleError(res, err); }
        if (!signature) { return res.status(404).send('Not Found'); }
        var data = {};
        data.privateKey = certDetails.privateKey;
        data.publicKey = certDetails.publicKey;
        data.certificate = certDetails.certificate;
        var updated = _.merge(signature, data);
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          else {
            fs.mkdirSync('./signature/' + signature._id);
            fs.writeFile('./signature/' + signature._id + '/signature.pem', signature.certificate, function (err) {
              if (err) throw err;
              else
                return res.status(200).json(signature);
            });
          }
        });
      });
    }
  });
};

// Updates an existing signature in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Signature.findById(req.params.id, function (err, signature) {
    if (err) { return handleError(res, err); }
    if (!signature) { return res.status(404).send('Not Found'); }
    var updated = _.merge(signature, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(signature);
    });
  });
};

// Deletes a signature from the DB.
exports.destroy = function (req, res) {
  Signature.findById(req.params.id, function (err, signature) {
    if (err) { return handleError(res, err); }
    if (!signature) { return res.status(404).send('Not Found'); }
    signature.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}