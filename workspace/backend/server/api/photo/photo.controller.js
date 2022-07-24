'use strict';

var _ = require('lodash');
var Photo = require('./photo.model');
var config = require('../../config/environment');
var request = require("request");
var key = "secretkey";
const selfCert = require('self-cert')
const AWS = require('aws-sdk');
var fs = require('fs');
var moment = require("moment")

const path = require('path');
var crypto = require("crypto")
function encrypt(key, data) {
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');

  return crypted;
}
// ===================== Get single Photo =======================

exports.getphoto = function(req, res) {
  console.log(req.params.id)
  Photo.findById(req.params.id).populate('uid').exec( function (err, photo) {
    if(err) { return handleError(res, err); }
    if(!photo) { return res.status(404).send('Not Found'); }
    return res.status(200).json(photo);
  });
};

// ==================================================================
// Get list of current user photos
exports.index = function (req, res) {
  Photo.find({ $and: [{ email: req.params.email }, { setDelete: false }, { active: true }] }).sort({ created_at: 'desc' }).exec(function (err, photos) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(photos);
  });
};
//get default photo
exports.getDefault = function(req, res) {
  console.log(req.params.id+"@@@@@@@@@@@@@@@@@")
  Photo.findOne({$and:[{email:req.params.id},{setDefault:true},{setDelete:false}]}).exec( function (err, photo) {
    if(err) { return handleError(res, err); }
    if(!photo) { return res.status(404).send('Not Found'); }
    return res.status(200).json(photo);
  });
};
// Updates an existing photo for the setDefault/setDelete photo.
exports.setDefaultSetting = function (req, res) {
  Photo.findById(req.params.id, function (err, photo) {
    if (err) { return handleError(res, err); }
    if (!photo) { return res.status(404).send('Not Found'); }
    if (req.body.setDefault && !req.body.setDelete) {
      Photo.update({ $and: [{ email: req.body.email }, { setDelete: false }, { active: true }] }, { $set: { setDefault: false } }, { multi: true }, function (err, photos) {
        if (err) { return handleError(res, err); }
        var updated = _.merge(photo, req.body);
        updated.updated_at = Date.now();
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.status(200).json(photo);
        });
      });
    }
    else {
      console.log(req.body.setDefault)
      var updated = _.merge(photo, req.body);
      updated.updated_at = Date.now();
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(photo);
      });
    }

  });
};

// Get a single photo
exports.show = function (req, res) {
  Photo.findById(req.params.id, function (err, photo) {
    if (err) { return handleError(res, err); }
    if (!photo) { return res.status(404).send('Not Found'); }
    return res.json(photo);
  });
};

// Creates a new photo in the DB.
exports.create = async function (req, res) {
  var file = {}
  file.originalFilename = req.files.uploads[1].originalFilename;
  file.path = req.files.uploads[1].path;
  file.path = file.path.replace("../", "");
  file.path = file.path.replace("backend/", "");
  file.size = req.files.uploads[1].size;
  file.type = req.files.uploads[1].type;
  file.name = req.files.uploads[1].name;
  file.AIpath = req.files.uploads[0].path;
  var encryptedid = encrypt(key, file.name);
  file.encryptedid = encryptedid,
  file.uid = req.body.uid;
  file.email = req.body.email
  file.type = req.body.type
  if (req.body.authentication) file.authentication = req.body.authentication
  file.expirydate = new Date(moment().add(365, 'days').format())

  var p = await uploadS3(__dirname + '/../../../' + file.path, 'photo', true, async function (p) {
    file.path = p;
    var pat = await uploadS3(__dirname + '/../../../' + file.AIpath, 'photo', true, function (AIp) {
      file.AIpath = AIp
      Photo.create(file, function (err, photo) {
        if (err) { return handleError(res, err); }
        else {
          const certDetails = selfCert({
            attrs: {
              commonName: 'CognitiveInnovations.in',
              countryName: 'IN',
              stateName: 'AP',
              locality: 'VSP',
              orgName: 'Cognitive Innovations',
              shortName: photo._id
            },
            bits: 2048,
            expires: file.expirydate
          })
          Photo.findById(photo._id, function (err, updatePhoto) {
            if (err) { return handleError(res, err); }
            if (!photo) { return res.status(404).send('Not Found'); }
            var data = {};
            data.privateKey = certDetails.privateKey;
            data.publicKey = certDetails.publicKey;
            data.certificate = certDetails.certificate;
            var updated = _.merge(photo, data);
            updated.save(function (err) {
              if (err) { return handleError(res, err); }
              else {
                fs.mkdirSync('./photo/' + photo._id);
                fs.writeFile('./photo/' + photo._id + '/photo.pem', photo.certificate, async function (err) {
                  if (err) throw err;
                  else {
                    var p = await uploadS3(__dirname + '/../../../' + 'photo/' + photo._id + '/photo.pem', 'photo', true, function (pempath) {
                      photo.pemFilePath = pempath
                      if (photo.authentication) {
                        var options = {
                          method: 'POST',
                          uri: config.python + '/postdata',
                          body: photo._id,
                          json: true
                        };
                        var sendrequest = request(options, function (response, result) {
                          console.log("AI enter")
                          if (response) console.log(response)
                          if (result) console.log(photo._id, result.body)
                          if (response) {
                            photo.active = false
                            Photo.findByIdAndUpdate(photo._id, photo, function (err, updatedPhoto) {
                              if (err) return res.status(500).send(err);
                              return res.status(500).send(response)
                            });
                          }
                          else if (result.body == photo._id) {
                            photo.bottlenecksCreated = true;
                            photo.save(function (err, updatedPhoto) {
                              if (err) { return handleError(res, err); }
                              return res.status(200).json(updatedPhoto);
                            });
                          }
                          else {
                            photo.active = false
                            Photo.findByIdAndUpdate(photo._id, photo, function (err, updatedPhoto) {
                              if (err) return res.status(500).send(err);
                              return res.status(200).json({ message: 'AIfailed' });;
                            });
                          }
                        });
                      }
                      else {
                        photo.save(function (err, updatedPhoto) {
                          if (err) return res.status(500).send(err);
                          console.log(updatedPhoto)
                          return res.status(200).json(updatedPhoto);
                        });
                      }
                    });
                  }
                });
              }
            });
          });
        }
      });
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

exports.mobilecreate = async function (req, res) {
    var file = {}
    file.originalFilename = req.files.uploads[0].originalFilename;
    file.path = req.files.uploads[0].path;
    file.path = file.path.replace("../", "");
    file.path = file.path.replace("backend/", "");
    file.size = req.files.uploads[0].size;
    file.type = req.files.uploads[0].type;
    file.name = req.files.uploads[0].name;
    file.AIpath = req.files.uploads[0].path;
    var encryptedid = encrypt(key, file.name);
    file.encryptedid = encryptedid,
    file.uid = req.body.uid;
    file.email=req.body.email
    file.type = req.body.type
    if(req.body.authentication) file.authentication = req.body.authentication;
    file.expirydate = new Date(moment().add(365, 'days').format())

    var p = await uploadS3(__dirname + '/../../../' + file.path, 'photo', true, function (p) {
      file.path = p;
      Photo.create(file, function (err, photo) {
        if (err) { return handleError(res, err); }
        else {
          const certDetails = selfCert({
            attrs: {
              commonName: 'CognitiveInnovations.in',
              countryName: 'IN',
              stateName: 'AP',
              locality: 'VSP',
              orgName: 'Cognitive Innovations',
              shortName: photo._id
            },
            bits: 2048,
            expires: file.expirydate
          })
          Photo.findById(photo._id, function (err, updatePhoto) {
            if (err) { return handleError(res, err); }
            if (!photo) { return res.status(404).send('Not Found'); }
            var data = {};
            data.privateKey = certDetails.privateKey;
            data.publicKey = certDetails.publicKey;
            data.certificate = certDetails.certificate;
            var updated = _.merge(photo, data);
            updated.save(function (err) {
              if (err) { return handleError(res, err); }
              else {
                fs.mkdirSync('./photo/' + photo._id);
                fs.writeFile('./photo/' + photo._id + '/photo.pem', photo.certificate, async function (err) {
                  if (err) throw err;
                  else {
                    var p = await uploadS3(__dirname + '/../../../' + 'photo/' + photo._id + '/photo.pem', 'photo', true, function (pempath) {
                      photo.pemFilePath = pempath
                      if (photo.authentication) {
                        var options = {
                          method: 'POST',
                          uri: config.python + '/postdata',
                          body: photo._id,
                          json: true
                        };
                        var sendrequest = request(options, function (response, result) {
                          console.log("AI enter")
                          if (response) console.log(response)
                          if (result) console.log(photo._id, result.body)
                          if (response) {
                            photo.active = false
                            Photo.findByIdAndUpdate(photo._id, photo, function (err, updatedPhoto) {
                              if (err) return res.status(500).send(err);
                              return res.status(500).send(response)
                            });
                          }
                          else if (result.body == photo._id) {
                            photo.bottlenecksCreated = true;
                            photo.save(function (err, updatedPhoto) {
                              if (err) { return handleError(res, err); }
                              return res.status(200).json(updatedPhoto);
                            });
                          }
                          else {
                            photo.active = false
                            Photo.findByIdAndUpdate(photo._id, photo, function (err, updatedPhoto) {
                              if (err) return res.status(500).send(err);
                              return res.status(200).json({ message: 'AIfailed' });;
                            });
                          }
                        });
                      }
                      else {
                        photo.save(function (err, updatedPhoto) {
                          if (err) return res.status(500).send(err);
                          return res.status(200).json(updatedPhoto);
                        });
                      }
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
// Creates a bottlenecks to the photo.
exports.bottlenecksCreation = function (req, res) {
    Photo.findById(req.body._id, function (err, photo) {
      if (err) { return handleError(res, err); }
      if (!photo) { return res.status(404).send('Not Found'); }
       var options = {
        method: 'POST',
        uri: config.python+'/postdata',
        body: photo._id,
        json: true
      };
      var sendrequest = request(options, function (response, result) {
        console.log("AI enter")
        if(response) console.log(response)
        if(result) console.log(photo._id,result.body)
        if(response)
        {
          return res.status(500).send(response)
        }
        else if(result.body==photo._id)
        {
          photo.bottlenecksCreated=true;
          photo.save(function (err,updatedPhoto) {
            if (err) { return handleError(res, err); }
            return res.status(200).json(updatedPhoto);
          });
        }
        else
        {
          return res.status(200).json({message: 'AIfailed'});;
        }
      });
    });
};

// Creates a new photo from mobilelink in the DB.
exports.createfrommobilelink = function (req, res) {
  console.log(req.body)
    console.log(req.files)
    var file = {}
    file.originalFilename = req.files.uploads[1].originalFilename;
    file.path = req.files.uploads[1].path;
    file.path = file.path.replace("../", "");
    file.path = file.path.replace("backend/", "");
    file.size = req.files.uploads[1].size;
    file.type = req.files.uploads[1].type;
    file.name = req.files.uploads[1].name;
    file.AIpath = req.files.uploads[0].path;
    // if (req.body.folderid) file.folderid = req.body.folderid;
    var encryptedid = encrypt(key, file.name);
    // file.link = "http://localhost:4200/document/:" + encryptedid,
    file.encryptedid = encryptedid,
    file.type = req.body.type
    if(req.body.authentication) file.authentication = req.body.authentication
    file.expirydate = new Date(moment().add(365, 'days').format())

    Photo.create(file, function (err, photo) {
      if (err) { return handleError(res, err); }
      else {
        console.log(photo)
        const certDetails = selfCert({
          attrs: {
            commonName: 'CognitiveInnovations.in',
            countryName: 'IN',
            stateName: 'AP',
            locality: 'VSP',
            orgName: 'Cognitive Innovations',
            shortName: photo._id
          },
          bits: 2048,
          expires: file.expirydate
        })
        Photo.findById(photo._id, function (err, updatePhoto) {
          if (err) { return handleError(res, err); }
          if (!photo) { return res.status(404).send('Not Found'); }
          var data = {};
          data.privateKey = certDetails.privateKey;
          data.publicKey = certDetails.publicKey;
          data.certificate = certDetails.certificate;
          var updated = _.merge(photo, data);
          updated.save(function (err) {
            if (err) { return handleError(res, err); }
            else {
              fs.mkdirSync('./photo/' + photo._id);
              fs.writeFile('./photo/' + photo._id + '/photo.pem', photo.certificate, function (err) {
                if (err) throw err;
                else
                {
                  if(photo.authentication)
                  {
                    var options = {
                      method: 'POST',
                      uri: config.python+'/postdata',
                      body: photo._id,
                      json: true
                    };
                    var sendrequest = request(options, function (response, result) {
                      console.log("AI enter")
                      if(response) console.log(response)
                      if(result) console.log(photo._id,result.body)
                      if(response)
                      {
                        photo.active=false
                        Photo.findByIdAndUpdate(photo._id,photo, function (err, updatedPhoto) {
                          if (err) return res.status(500).send(err);
                          return res.status(500).send(response)
                        });
                      }
                      else if(result.body==photo._id)
                      {
                        photo.bottlenecksCreated=true;
                        photo.save(function (err,updatedPhoto) {
                          if (err) { return handleError(res, err); }
                          return res.status(200).json(updatedPhoto);
                        });
                      }
                      else
                      {
                        photo.active=false
                        Photo.findByIdAndUpdate(photo._id,photo, function (err, updatedPhoto) {
                          if (err) return res.status(500).send(err);
                          return res.status(200).json({message: 'AIfailed'});;
                        });
                      }
                    });
                  }
                  else
                    return res.status(200).json(photo);
                }
              });
            }
          });
        });

      }
    });
};

// Updates an existing photo in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Photo.findById(req.params.id, function (err, photo) {
    if (err) { return handleError(res, err); }
    if (!photo) { return res.status(404).send('Not Found'); }
    var updated = _.merge(photo, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(photo);
    });
  });
};

// Deletes a photo from the DB.
exports.destroy = function (req, res) {
  Photo.findById(req.params.id, function (err, photo) {
    if (err) { return handleError(res, err); }
    if (!photo) { return res.status(404).send('Not Found'); }
    photo.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};
exports.dragcreate = function (req, res) {
  if (req.body.type == 'captured') {
    req.body.uid = req.user.id
    Photo.create(req.body, function (err, photo) {
      if (err) { return handleError(res, err); }
      return res.status(201).json(photo);
    });
  }
  else {
    console.log(req.files.uploads.name)

    console.log(req.files)
    var file = {}
    file.originalFilename = req.files.uploads.originalFilename;
    file.path = req.files.uploads.path;
    file.path = file.path.replace("../", "");
    file.path = file.path.replace("backend/", "");
    file.size = req.files.uploads.size;
    file.type = req.files.uploads.type;
    file.name = req.files.uploads.name;
    file.uid=req.files.uploads.uid;
    if (req.body.folderid) file.folderid = req.body.folderid;
    var encryptedid = encrypt(key, file.name);
    file.link = "http://localhost:4200/document/:" + encryptedid,
      file.encryptedid = encryptedid,
      file.uid = req.user.id;
    file.type = req.body.type
    Photo.create(file, function (err, photo) {
      if (err) { return handleError(res, err); }
      return res.status(201).json(photo);
    });

  
  }
};
function handleError(res, err) {
  return res.status(500).send(err);
}