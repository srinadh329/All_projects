'use strict';

var _ = require('lodash');
var Media = require('./media.model');
var User = require('../user/user.model');
const AWS = require('aws-sdk');
const fs = require('fs');

// Get list of medias
exports.index = function(req, res) {
  Media.find(function (err, medias) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(medias);
  });
};


// Get a single media
exports.show = function(req, res) {
  Media.findById(req.params.id, function (err, media) {
    if(err) { return handleError(res, err); }
    if(!media) { return res.status(404).send('Not Found'); }
    return res.json(media);
  });
};

// Creates a new media in the DB.
exports.create = async function(req, res) {
  console.log("userdata",req.user);
  
  var imagedata=[];
  var extension=null,type=null;
  var image = [];
  if(req.files.uploads) {
    for(let file of req.files.uploads){
      // console.log('456546',req.files.uploads);
      // console.log('789789',file.path);
      var p = await uploadS3(__dirname + '/../../../' + file.path, 'uploads', true, function (p) {
        file.path = p;
       var imagedata = {originalFilename: file.originalFilename,
        path: file.path,
        size: file.size,
        name: file.name,
        type: file.type}
        Media.create(imagedata, function(err, medias) {
        
       
        image.push(medias);
       
        if(err) { return handleError(res, err); }
        if(req.files.uploads.length === image.length) { return res.status(201).json(image); }
      });
      
    });
    }
  }
  
}

exports.updateprofile= async function(req,res)
{
  console.log("updateprofile",req.files,req.user._id);
  var id = req.user._id;
  var imagedata=[];
  var extension=null,type=null;
  var image = [];
  if(req.files.uploads) {
    for(let file of req.files.uploads){
      // console.log('456546',req.files.uploads);
      // console.log('789789',file.path);
      var p = await uploadS3(__dirname + '/../../../' + file.path, 'uploads', true, function (p) {
        file.path = p;
       var imagedata = {originalFilename: file.originalFilename,
        path: file.path,
        size: file.size,
        name: file.name,
        type: file.type}
        Media.create(imagedata, function(err, response){  
          console.log("123456",response);
          
            User.update({_id:req.user._id},{$set:{originalFilename: response.originalFilename,
              path: response.path,
              size: response.size,
              name: response.name,
              type: response.type}},{new:true},function(err,medias){
              console.log("response:",medias)
            //  res.status(200).json({res:"Success"}) 
               image.push(medias);
       
        if(err) { return handleError(res, err); }
        if(req.files.uploads.length === image.length) { return res.status(201).json(image); }
      });
      
    });
  })
    }
  }
  
  
}


async function uploadS3(filePath, folderName, deleteFile, callback) {
  //configuring the AWS environment
  const path = require('path');
  
  var s3 = new AWS.S3({useAccelerateEndpoint:true});
  var params = {
      Bucket: 'testchatapp-cil',
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
          if (deleteFile)
              if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
          console.log("Uploaded in:", data.Location);
          if (callback) callback(data.Location);
          else return data.Location;
      }
  });
}
// Updates an existing media in the DB.
exports.update = function(req, res) {
  //console.log('2');
  console.log('99999999',req.body);
  if(req.body._id) { delete req.body._id; }
  Media.findById(req.params.id, function (err, media) {
    if (err) { return handleError(res, err); }
    if(!media) { return res.status(404).send('Not Found'); }
    var updated = _.merge(media, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(media);
    });
  });
};

// Deletes a media from the DB.
exports.destroy = function(req, res) {
  Media.findById(req.params.id, function (err, media) {
    if(err) { return handleError(res, err); }
    if(!media) { return res.status(404).send('Not Found'); }
    media.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};
//// downloading the url link 
exports.urldata=function(req,res){
  console.log(req.body);
  const download=require('download');
  const fs =require('fs')
  download(req.body.url).then(async data => {
    var fileName = req.body.url;
    var extension = fileName.replace(/^.*\./, '');
    console.log (extension);
var encryptedname= Math.round(Date.now())
    fs.writeFileSync('./uploads/' + encryptedname+'.'+extension, data);
  var   stats = fs.statSync('./uploads/' + encryptedname+'.'+extension)
    console.log(encryptedname);
    var exec =require('child_process').exec;
var path=' ./uploads/'+encryptedname+'.'+extension;

exec(`file -b --mime-type ${path}` ,function(error,stdout,stderr){
    console.log(stdout)
    console.log(error)
    var image={
      originalFilename: 'chatintact',
      path: 'uploads/'+  encryptedname+'.'+extension,
      size: stats.size,
      name:  encryptedname+'.'+extension,
      type: stdout.trim(''),     
    }
    Media.create(image, function(err, medias) {
      if(err) { return handleError(res, err); }
      if(medias) { return res.status(201).json(medias); }
    });
})


 

})


}



function handleError(res, err) {
  return res.status(500).send(err);
}