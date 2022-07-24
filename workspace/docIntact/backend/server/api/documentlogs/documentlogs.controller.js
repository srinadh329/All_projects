'use strict';

var _ = require('lodash');
var Documentlogs = require('./documentlogs.model');
const os = require('os');
const AWS = require('aws-sdk');
var fs = require('fs');
const path = require('path');
var async = require('async');

// Get list of documentlogss
exports.index = function (req, res) {
  Documentlogs.find(function (err, documentlogss) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(documentlogss);
  });
};
// Get a single document log based on message
exports.getDocumentSingleLog = function (req, res) {
  console.log('======>>>>>>>>>>>>>>>>>>>>>..',req.body)
  Documentlogs.find({ $and: [{ documentid: req.body.documentid}, {sharedid: req.body.sharedid },{toemail: req.body.toemail },{message: req.body.message }] }).populate('toid').populate('uid').populate('documentid').sort({ "_id": -1 }).exec(function (err, documentlogs) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(documentlogs);
  });
};
// Get a single documentlogs
exports.show = function (req, res) {
  console.log(req.params.id)
  Documentlogs.find({ $or: [{ documentid: req.params.id}, {folderid: req.params.id }] }).populate('toid').populate('uid').populate('documentid').sort({ "_id": -1 }).exec(function (err, documentlogs) {
    if (err) { return handleError(res, err); }
    if (!documentlogs) { return res.status(404).send('Not Found'); }
    return res.json(documentlogs);
  });
};


exports.getSingleLog = function (req, res) {
  console.log(req.params.id)
  Documentlogs.findOne(req.params.id).populate('toid').populate('uid').populate('documentid').sort({ "_id": -1 }).exec(function (err, documentlogs) {
    if (err) { return handleError(res, err); }
    if (!documentlogs) { return res.status(404).send('Not Found'); }
    return res.json(documentlogs);
  });
};
// Creates a new documentlogs in the DB.
exports.create = function (req, res) {
  
  // req.body.uid=req.body.uid
  // req.body.email
  // req.body.IpAddress = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if( req.headers && req.headers.ipaddress){
    req.body.IpAddress=req.headers.ipaddress
  } 
  else{
    req.body.IpAddress=req.body.IpAddress
  }
  const DeviceDetector = require("device-detector-js");
  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(req.headers["user-agent"]);
  if(device)
  req.body.browser =device.client.name+', Version'+device.client.version;
  if(device.os.platform)
  req.body.deviceName =device.os.name+',Platform -'+device.os.platform;
  else
  req.body.deviceName =device.os.name
  //  req.body.deviceName = os.hostname()
  Documentlogs.create(req.body, function (err, documentlogs) {
    if (err) {
      console.log(err)
      return handleError(res, err);
    }
    return res.status(201).json(documentlogs);
  });
};

// creates a new fieldlogs
exports.fieldlogs = function (req, res) {
  // req.body.IpAddress = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if( req.headers && req.headers.ipaddress){
    req.body.IpAddress=req.headers.ipaddress
  } 
  else{
    req.body.IpAddress=req.body.IpAddress
  }
  const DeviceDetector = require("device-detector-js");
  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(req.headers["user-agent"]);
  if(device && device.client.name && device.client.version)
  {
    req.body.browser=device.client.name+', Version'+device.client.version;
  }
  if(device && device.client.name && !device.client.version)
  {
    req.body.browser=device.client.name;
  }
  if(device.os.platform)
  req.body.deviceName =device.os.name+',Platform -'+device.os.platform;
  else
  req.body.deviceName =device.os.name
  console.log(req.body);
  if(req.body.created_at) delete req.body.created_at;
  Documentlogs.create(req.body, function (err, documentlogs) {
    if (err) {
      console.log(err)
      return handleError(res, err);
    }
    return res.status(201).json(documentlogs);
  });
}
// end of fieldlogs

// creates a new fieldlogs on Bulk amount
exports.createBulkFieldLogs = function (req, res) {
  if( req.headers && req.headers.ipaddress){
    req.body.IpAddress=req.headers.ipaddress
  } 
  else{
    req.body.IpAddress=req.body.IpAddress
  }
  // req.body.IpAddress = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const DeviceDetector = require("device-detector-js");
  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(req.headers["user-agent"]);
  console.log(typeof(req.body),req.body);

    async.each(req.body, function (log, call) {
      if(device)
      log.browser=device.client.name+', Version'+device.client.version;
      if(device.os.platform)
      log.deviceName =device.os.name+',Platform -'+device.os.platform;
      else
      log.deviceName =device.os.name
      console.log(log)
      Documentlogs.create(log, function (err, documentlog) {
        if (err) {
          console.log(err)
          return handleError(res, err);
        }
        console.log(documentlog)
        call();
      });
    });
    return res.status(201).json();
}
// end of fieldlogs on Bulk amount


// Creates a new documentlogs of upload video in the DB.
exports.uploadvideocreate = async function (req, res) {
  var file = {};
  file.originalFilename = req.files.video[0].originalFilename;
  file.path = req.files.video[0].path;
  file.path = file.path.replace("../", "");
  file.path = file.path.replace("backend/", "");
  file.size = req.files.video[0].size;
  file.type = req.files.video[0].type;
  file.name = req.files.video[0].name;
  file.uid = req.body.uid;
  file.email = req.body.email;

  file.message = 'Video Record';
  if (req.body.documentid) file.documentid = req.body.documentid;
  if (req.body.sharedid) file.sharedid = req.body.sharedid;
  var p = await uploadS3(__dirname + '/../../../' + file.path, 'uploads', true, function (p) {
    file.path = p;
    Documentlogs.create(file, function (err, documentlogs) {
      if (err) {
        console.log(err)
        return handleError(res, err);
      }
      return res.status(201).json(documentlogs);
    });
  })
};

// ============Upload to S3===================
async function uploadS3(filePath, folderName, deleteFile, callback) {
  //configuring the AWS environment
  AWS.config.update({
    accessKeyId: "AKIAYLZVQDQMJIGVCQUM",
    secretAccessKey: "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"
  });

  var s3 = new AWS.S3();
  //configuring parameters
  var params = {
    Bucket: 'docintact',
    Body: fs.createReadStream(filePath),
    Key: folderName + "/" + Date.now() + "_" + path.basename(filePath)
  };
  s3.upload(params, function (err, data) {
    //handle error
    if (err) {
      console.log("Error", err);
    }
    //success
    if (data) {
      if (deleteFile) if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
      console.log("Uploaded in:", data.Location);
      if (callback) callback(data.Location);
      else return data.Location;
    }
  });
}
// ===========Upload to S3 End================
// Updates an existing documentlogs in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Documentlogs.findById(req.params.id, function (err, documentlogs) {
    if (err) { return handleError(res, err); }
    if (!documentlogs) { return res.status(404).send('Not Found'); }
    documentlogs.pageInfo=null
    var updated = _.merge(documentlogs, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(documentlogs);
    });
  });
};

// Deletes a documentlogs from the DB.
exports.destroy = function (req, res) {
  Documentlogs.findById(req.params.id, function (err, documentlogs) {
    if (err) { return handleError(res, err); }
    if (!documentlogs) { return res.status(404).send('Not Found'); }
    documentlogs.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};
//filter in dashboard
exports.filesFilter = function (req, res) {
  console.log(req.body.where)
  // Documentlogs.find({ $and: [req.body.where, { $and: [{ uid: req.user._id }] }] }).sort({created_at: 'desc'}).populate('documentid').exec(function (err, documents) { 
  Documentlogs.find(req.body.where).sort({ created_at: 'desc' }).populate('documentid').exec(function (err, documents) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(documents);
  });
};
exports.getdevice=function(req,res){

  const DeviceDetector = require("device-detector-js");
  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(req.headers["user-agent"]);
  if(device){
    if(device.os)
    {
      var devicedata=device.os.name
    }
    else var devicedata='not found'
  }
  else 
  {
    var devicedata='not found'
  }
  return res.send({devicedata})
};
function handleError(res, err) {
  return res.status(500).send(err);
}



exports.my = function (req, res) {
  console.log(req.body);
  if (req.body.startdate && req.body.enddate && req.body.todaydate == null && req.body.yesterdaydate == null) {
    // Documentlogs.find({ $and: [{ email: req.body.email }, { 'createdAt': { $gte: req.body.startdate, $lte: req.body.enddate } }, { 'latitude': { $gte: req.body.oldlatitude, $lte: req.body.latitude } }, { 'longitude': { $gte: req.body.oldlongitude, $lte: req.body.longitude } }] }).populate('documentid').sort('-updatedAt').exec(function (err, dpinfo) {
    Documentlogs.find({ $and: [{ email: req.body.email }, { 'createdAt': { $gte: req.body.startdate, $lte: req.body.enddate } }] }).populate('documentid').sort('-updatedAt').exec(function (err, dpinfo) {
      if (err) { return handleError(res, err); }
      console.log(dpinfo)
      return res.status(200).json(dpinfo);
    });
  }
  else if (req.body.todaydate && req.body.yesterdaydate) {
    // Documentlogs.find({ $and: [{ email: req.body.email }, { 'createdAt': { $gte: req.body.yesterday, $lte: req.body.createdAt } }, { 'latitude': { $gte: req.body.oldlatitude, $lte: req.body.latitude } }, { 'longitude': { $gte: req.body.oldlongitude, $lte: req.body.longitude } }] }).populate('documentid').sort('-updatedAt').exec(function (err, sinfo) {
    Documentlogs.find({ $and: [{ email: req.body.email }, { 'createdAt': { $gte: req.body.yesterdaydate, $lte: req.body.todaydate } } ] }).populate('documentid').sort('-updatedAt').exec(function (err, sinfo) {
      if (err) { return handleError(res, err); }
      console.log(sinfo)
      return res.status(200).json(sinfo);
    });
  }
  else if (req.body.todaydate && !req.body.yesterdaydate) {
    // Documentlogs.find({ $and: [{ email: req.body.email }, { 'createdAt': { $gte: req.body.createdAt } }, { 'latitude': { $gte: req.body.oldlatitude, $lte: req.body.latitude } }, { 'longitude': { $gte: req.body.oldlongitude, $lte: req.body.longitude } }] }).populate('documentid').sort('-updatedAt').exec(function (err, sinfo) {
    Documentlogs.find({ $and: [{ email: req.body.email }, { 'createdAt': { $gte: req.body.todaydate } } ] }).populate('documentid').sort('-updatedAt').exec(function (err, sinfo) {
      if (err) { return handleError(res, err); }
      console.log(sinfo)
      return res.status(200).json(sinfo);
    });
  }
  else {
    console.log('In else')
    return res.status(200).json([]);}
}
