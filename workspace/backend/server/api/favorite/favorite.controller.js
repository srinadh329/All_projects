'use strict';

var _ = require('lodash');
var Favorite = require('./favorite.model');
var Document=require('../document/document.model')
var async = require('async');

// Get list of favorites
exports.index = function(req, res) {

  Favorite.find({$and: [{ uid: req.user._id }, { active: true }] }).populate('fileid').populate('folderid').exec(function (err, favorites) {
    if(err) { return handleError(res, err); }

    var favoritedata = favorites
    favoritedata.forEach(element=>{
    if(element.fileid){
     if(element.fileid.active==false){

        element.fileid=null
      }

     }

     if(element.folderid){
      if(element.folderid.active==false){
         element.folderid=null
       }
 
      }
     })
    return res.status(200).json(favoritedata)

  });
};

// Get a single favorite
exports.show = function(req, res) {
  Favorite.find({$and: [{ fileid: req.params.id }, { active: true }] }).exec(function (err, favorite) {
    if(err) { return handleError(res, err); }
    if(!favorite) { return res.status(404).send('Not Found'); }
    return res.json(favorite);

  });
};



// Creates a new favorite in the DB.
exports.create = function(req, res) {
  req.body.uid= req.user.id
  Favorite.create(req.body, function(err, favorite) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(favorite);
  });
};

// Updates an existing favorite in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Favorite.findById(req.params.id, function (err, favorite) {
    if (err) { return handleError(res, err); }
    if(!favorite) { return res.status(404).send('Not Found'); }
    var updated = _.merge(favorite, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(favorite);
    });
  });
};

// Deletes a favorite from the DB.
exports.destroy = function(req, res) {
  Favorite.findById(req.params.id, function (err, favorite) {
    if(err) { return handleError(res, err); }
    if(!favorite) { return res.status(404).send('Not Found'); }
    favorite.active="false";
    favorite.updated_at = Date.now();
    favorite.save(function(err,unfavorite) {
      if(err) { return handleError(res, err); }
      return res.status(201).json({data:"success"});
    });
  });
};

// multi file make a favourite
exports.multifavorite = function(req, res) {
  var folders = req.body.folders
  var files = req.body.files
  var favorite=req.body.make_favorite
  async.each(files, function (element, callback) {
   if(!favorite)
   {
    Favorite.findById(element.favoriteid, function (err, favorite) {
      if (err) { return handleError(res, err); }
     if(favorite) {  favorite.active=false;
        favorite.updated_at = Date.now();
        favorite.save();
      }
        callback()
      });
    }
    else{
      Favorite.findOne({fileid: element._id  }).exec(function (err, favorite) {
       if(favorite){   favorite.active=true;
        favorite.updated_at = Date.now();
        favorite.save(function(err,favorite) { callback()})}
      else{
        var favdoc={
          fileid:element._id,
          isFile:true,
          uid:req.user._id,
        }
        Favorite.create(favdoc,function(favorite)
        {
          callback()
        })
      }
    });
    }
 
    }, function (err) {
    async.each(folders, function (element1, callback) {
      if(!favorite)
      {
       Favorite.findById(element1.favoriteid, function (err, favorite) {
         if (err) { return handleError(res, err); }
          favorite.active=false;
           favorite.updated_at = Date.now();
           favorite.save();
           callback()
         });
       }
       else
       {
        Favorite.findOne({folderid: element1._id }).exec(function (err, favorite) {
          if(favorite){ favorite.active=true;
            favorite.updated_at = Date.now();
            favorite.save(function(err,favorite) { callback()})}
            else{
              var favdoc={
                folderid:element1._id,
                isFolder:true,
                uid:req.user._id,
              }
              Favorite.create(favdoc,function(favorite)
              {
                callback()
              })
            }
        });
       }
  }, function (err) {
   return res.status(201).json({ message: 'success' });
})
})

};

function handleError(res, err) {
  return res.status(500).send(err);
}