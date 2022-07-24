'use strict';

var _ = require('lodash');
var Fieldoption = require('./fieldoption.model');
var Fieldvalue = require('../fieldvalue/fieldvalue.model');

// Get list of fieldoptions
exports.index = function(req, res) {
  console.log(req.body)
  Fieldoption.findOne({$and:[{active:true},{versionid:req.body.versionid},{documentid:req.body.documentid}]}).exec(function (err, fieldoptions) {
    if(err) { return handleError(res, err); }
    console.log(fieldoptions)
    console.log("===============")

    return res.status(200).json(fieldoptions);
  });
};

exports.versionFieldValues = function(req, res) {
  var result = [];
  var async = require('async');
  Fieldoption.findOne({$and:[{active:true},{versionid:req.body.versionid},{documentid:req.body.documentid}]}).exec(function (err, fieldoptions) {
    if(err) { return handleError(res, err); }
    else if(!fieldoptions) { return res.status(200).send(result); }
    else {
      Fieldvalue.find({ $and: [{ documentid: req.body.documentid }, { active: true }] }).exec(function (err, fieldvalue) {   
        if(!fieldvalue) return res.json(fieldoptions);
        else{
            async.eachSeries(fieldoptions.fields, function iteratee(field, callback) {
              var f = _.filter(fieldvalue, { 'id': field.id })[0];
              console.log(f)
              if(f && f.id)
              {
                console.log(f.photoId+"{}{{{{{{{{{{{{{{{{{{{{{{{")
                var _f = field;
                if(f.value) _f.value = f.value;
                if(f.path) _f.path = f.path;
                if(f.size) _f.size = f.size;
                if(f.fontText) _f.fontText = f.fontText;
                if(f.fontStyle) _f.fontStyle = f.fontStyle;
                if(f.signaturebaseData) _f.signaturebaseData = f.signaturebaseData;
                if(f.signatureType) _f.signatureType = f.signatureType;
                if(f.photoType) _f.photoType = f.photoType;
                if(f.stampType) _f.stampType = f.stampType;
                if(f.signatureId) _f.signatureId = f.signatureId;
                if(f.photoId) _f.photoId = f.photoId;
                if(f.stampId) _f.stampId = f.stampId;
                if(f.insertedemail) _f.insertedemail = f.insertedemail;
                if(f.created_at)_f.created_at=f.created_at; 
                if(f.longitude)_f.longitude=f.longitude;
                if(f.latitude)_f.latitude=f.latitude;
                result.push(_f);
                callback();
                //result
              }else{
                result.push(field);
                callback();
              } 
            }, function done() {
                res.send(result);
            });
          }
        
      });
    }
  });
};
// Get list of fieldtemplates
exports.gettempltes = function(req, res) {
  Fieldoption.find({$and:[{active:true},{uid:req.user.id},{istemplate:true}]}).sort({ created_at: 'desc' }).exec(function (err, fieldoptions) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(fieldoptions);
  });
};
//
// Get list of fieldtemplates on agrement copy
// exports.agrementCopyTemplates = function(req, res) {
//   Fieldoption.find({$and:[{active:true},{uid:req.user.id},{documentid:req.params.id},{istemplate:true}]}).sort({ created_at: 'desc' }).exec(function (err, fieldoptions) {
//     if(err) { return handleError(res, err); }
//     return res.status(200).json(fieldoptions);
//   });
// };
// Get a single fieldoption
exports.show = function(req, res) {
  Fieldoption.find({$and:[{active:true},{encryptedid:req.params.id}]}).exec(function (err, fieldoption) {
    if(err) { 
      console.log(err)
      return handleError(res, err); }
    if(!fieldoption) { return res.status(404).send('Not Found'); }
    return res.json(fieldoption);
  });
};
// Get a selected Template
exports.getSelectedTemplate = function(req, res) {
  console.log(req.params.id)
  Fieldoption.findById(req.params.id).exec(function (err, fieldoption) {
    if(err) { return handleError(res, err); }
    if(!fieldoption) { return res.status(404).send('Not Found'); }
    return res.json(fieldoption);
  });
};
// Creates a new fieldoption in the DB.
exports.create = function(req, res) {
  req.body.uid=req.user._id;
  Fieldoption.create(req.body, function(err, fieldoption) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(fieldoption);
  });
};
// Creates a new fieldoption in the DB.
exports.emailcheck = function(req, res) {
  console.log(req.body)
  req.body.uid=req.user._id;
  Fieldoption.find({$and:[{uid:req.user._id},{'fields.email':{ $regex:req.body.searchvalue}}]}).exec(function (err, fieldoption) {
    if(err) { return handleError(res, err); }
    if(!fieldoption) { return res.status(404).send('Not Found'); }
    return res.json(fieldoption);
  });
};
// Updates an existing fieldoption in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Fieldoption.findById(req.params.id, function (err, fieldoption) {
    if (err) { return handleError(res, err); }
    if(!fieldoption) { return res.status(404).send('Not Found'); }
    var updated = _.merge(fieldoption, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(fieldoption);
    });
  });
};
// ovveride template
exports.overridetemplate = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  console.log(req.body.fields)
  Fieldoption.findById(req.params.id, function (err, fieldoption) {
    if (err) {
      console.log(err) 
      return handleError(res, err); }
    if(!fieldoption) { return res.status(404).send('Not Found'); }
    var updated = _.merge(fieldoption, req.body);
    updated.updated_at = Date.now();
    updated.fields=[]
    updated.fields=req.body.fields
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(fieldoption);
    });
  });
};
// Deletes a fieldoption from the DB.
exports.destroy = function(req, res) {
  Fieldoption.findById(req.params.id, function (err, fieldoption) {
    if(err) { return handleError(res, err); }
    if(!fieldoption) { return res.status(404).send('Not Found'); }
    fieldoption.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}