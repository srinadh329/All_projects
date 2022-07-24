'use strict';

var _ = require('lodash');
// var Document = require('./document.model');
var Folder = require('./folder.model');
var async = require('async');
var key = "secretkey";
var crypto = require("crypto")
var Document = require('../document/document.model')
var SharingPeople = require('../sharingpeople/sharingpeople.model')
var Favorite = require('../favorite/favorite.model')
var fs = require('fs');
const path = require('path');
var ObjectId = require('mongodb').ObjectID;
const AWS = require('aws-sdk');
var Docimage = require('../docimage/docimage.model');
function encrypt(key, data) {
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
// Get list of folders
exports.index = function (req, res) {
  Folder.find({ $and: [{ userid: req.user._id }, { active: true }] }).sort({ createdAt: 'desc' }).exec(function (err, folders) {
    if (err) { return handleError(res, err); }
    else {
      // var folders = JSON.parse(JSON.stringify(folders))
      folders.forEach(element => {
        element.encryptedId = encrypt(key, element._id.toString());
        if (element.parentid) {
          element.parentencryptedId = encrypt(key, element.parentid.toString());
        }
      })
      return res.status(200).json(folders);
    }
  });
};




// Get a single folder
exports.show = function (req, res) {
  Folder.find({ $and: [{ parentid: req.params.id }, { active: true }] }).sort({ created_at: 'desc' }).exec(function (err, folder) {
    if (err) { return handleError(res, err); }
    if (!folder) { return res.status(404).send('Not Found'); }
    return res.json(folder);
  });
};

// Get a single folder Info
exports.folderInfo = function (req, res) {
  Folder.findOne({ $and: [{ _id: req.params.id }, { active: true }] }).sort({ created_at: 'desc' }).exec(function (err, folder) {
    if (err) { return handleError(res, err); }
    if (!folder) { return res.status(404).send('Not Found'); }
    return res.json(folder);
  });
};

exports.getnavigationfolder = function (req, res) {
  Folder.findById(req.params.id, function (err, folder) {
    if (err) { return handleError(res, err); }
    if (!folder) { return res.status(404).send('Not Found'); }
    
      // var folders = JSON.parse(JSON.stringify(folder))
      //       console.log("folderssss")
      // console.log(folders)
      //   folders.encryptedId = encrypt(key, folders._id.toString());

      //   if (folders.parentid) {
      //     folders.parentencryptedId = encrypt(key, folders.parentid.toString());
      //   }

    return res.json(folder);
  });
};




exports.getparentfolders = function (req, res) {
  Folder.find({ $and: [{ active: true }, { $or: [{ fromid: req.user.id }, { toid: req.user.id }, { parentid: req.params.id }] }] }).sort({ created_at: 'desc' }).populate('toid').populate('fromid')
    .populate('fileid').populate('folderid').exec(function (err, folders) {
      if (err) { return handleError(res, err); }
      if (!folders) { return res.status(404).send('Not Found'); }

      Document.find({ $and: [{ active: true }, { $or: [{ fromid: req.user.id }, { toid: req.user.id }, { folderid: req.params.id }] }] }).populate('toid').populate('fromid')
        .populate('fileid').exec(function (err, files) {
          if (err) { return handleError(res, err); }
          if (!files) { return res.status(404).send('Not Found'); }
          return res.json({ "folders": folders, "files": files });
          //  res.json(files);
        });

    });

}


// Creates a new folder in the DB.
exports.create = function (req, res) {
  req.body.userid = req.user._id;
  if (!req.body.parentid) delete req.body.parentid
  Folder.create(req.body, function (err, folder) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(folder);
  });
};

// Updates an existing folder in the DB.
exports.FolderUpdate = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Folder.findById(req.params.id, function (err, folder) {
    if (err) { return handleError(res, err); }
    if (!folder) { return res.status(404).send('Not Found'); }
    if (folder.parentid) folder.parentid = null
    var updated = _.merge(folder, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (req.body.delete) {
        folder.first = true;
        Document.update({ folderid: folder._id }, { active: true }, { multi: true }).exec(function (err, document) { });
        updateall(folder, req.user.id, true)
      }
      if (err) { return handleError(res, err); }
      return res.status(200).json(folder);
    });
  });
};
// Updates an existing folder in the DB on move folder.
exports.MoveOnupdate = function (req, res) {
  if (req.body.element._id) { delete req.body.element_id; }
  Folder.findById(req.params.id, function (err, folder) {
    if (err) { return handleError(res, err); }
    if (!folder) { return res.status(404).send('Not Found'); }
    if (folder.parentid) folder.parentid = null
    var updated = _.merge(folder, req.body.element);
    if(req.body.MoveTo=='root') updated.parentid=undefined;
    updated.updated_at = Date.now();
    updated.save(function (err) {
      if (req.body.delete) {
        folder.first = true;
        Document.update({ folderid: folder._id }, { active: true }, { multi: true }).exec(function (err, document) { });
        updateall(folder, req.user.id, true)
      }
      if (err) { return handleError(res, err); }
      return res.status(200).json(folder);
    });
  });
};
exports.restore = function (req, res) {
  var foldersarr=req.body.folderarray
  async.each(foldersarr, function (element, callback) { 

    Folder.findById(element._id, function (err, folder) {
      if (err) { return handleError(res, err); }
      if (!folder) { return res.status(404).send('Not Found'); }
      if (folder.parentid) folder.parentid = null
      var updated = _.merge(folder, element);
      updated.updated_at = Date.now();
      updated.save(function (err) {
        if (req.body.delete) {
          folder.first = true;
          Document.update({ folderid: folder._id }, { active: true }, { multi: true }).exec(function (err, document) { });
          updateall(folder, req.user.id, true)
          callback()
        }
        // if (err) { return handleError(res, err); }
        // return res.status(200).json(folder);
      });
    });
  },function (err) {
    return res.status(201).json({ message: 'success' });

  })

};

// Deletes a folder from the DB.
exports.destroy = function (req, res) {
  Folder.findById(req.params.id, function (err, folder) {
    if (err) { return handleError(res, err); }
    if (!folder) { return res.status(404).send('Not Found'); }
    Document.find({ folderid: folder._id }).exec(function (err, document) {
      if (document) {
        async.each(document, function (element, callback) {
          fs.unlink(element.path, function (err) {
            callback();

          });
        })
      }
      folder.remove(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    });

    Folder.find({ folderid: req.params.id }).sort({ created_at: 'desc' }).exec(function (err, folderdetails) {
    });
  });
}

function handleError(res, err) {
  return res.status(500).send(err);
}

//isFolder exits 
exports.isFolderIsExist = function (req, res) {
  let query
  if (req.body.parentid != 0) query = { $and: [{ userid: req.user._id }, { active: true }, { name: req.body.name }, { parentid: req.body.parentid }] };
  else query = { $and: [{ userid: req.user._id }, { active: true }, { name: req.body.name }, { parentid: { $exists: false } }] };
  Folder.findOne(query).exec(function (err, folders) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(folders);
  });
};

//get folders for moveto
exports.getallfolders = function (req, res) {
  var folder;
  Folder.find({ $and: [{ userid: req.user._id }, { active: true }, { parentid: { $exists: false } }] }).exec(function (err, folders) {
    if (err) { return handleError(res, err); }
    else {
      // getchildrens(folders)
      return res.status(200).json(folders);
    }
  });
}

function getchildrens(folders) {
  var childerdata = [];
  folders = JSON.parse(JSON.stringify(folders))
  async.each(folders, function (element, callback) {
    // childerdata.push(element);
    // childerdata[childerdata.length - 1].children = []
    element.children = []
    Folder.find({ $and: [{ active: true }, { parentid: element._id }] }).exec(function (err, childfolders) {
      if (err) { return handleError(res, err); }
      else {
        childfolders.forEach(child => {
          // childerdata[childerdata.length - 1].children.push(child)
          element.children.push(child);
          if (childfolders.length - 1 == childfolders.indexOf(child)) {
            getchildrens(childfolders);
          }
        });
        callback();
        // getchildrens(folders)
      }
    });
  }, function (err) {
  })
}

// ============================Deletes a Folder from the DB=============================================
exports.destroyfolder = function (req, res) {
  if (req.body.value.isFile) {
    Document.findById(req.body.id, function (err, document) {
      if (err) { return handleError(res, err); }
      if (!document) { return res.status(404).send('Not Found'); }
      removeS3folder('convertimages/'+document.encryptedid+'/',function(resp){console.log(resp)})
      removeS3(document.path,'uploads')
      Docimage.remove({ $and: [{ documentid: document._id }, { active: true }] }).exec(function (err) {console.log(err)});
      document.remove(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    });
  }
  if (req.body.value.isFolder) {
    Folder.findById(req.body.id, function (err, folder) {
      if (err) { return handleError(res, err); }
      if (!folder) { return res.status(404).send('Not Found'); }
      console.log("id", req.body.id, folder._id);
      folder.first = true;
      
      Document.find({ folderid: folder._id, active: false }).exec(function (err, documents) { 
        documents.forEach(element=>{
          removeS3folder('convertimages/' + element.encryptedid + '/', function (resp) { console.log(resp) })
          removeS3(element.path, 'uploads')
          Docimage.remove({ $and: [{ documentid: element._id }, { active: true }] }).exec(function (err) {console.log(err)});
          element.remove(function (err) {
            if (err) { return handleError(res, err); }
          })
        })
      });
      deleteall(folder);
      folder.remove(function (err) {
          if (err) { return handleError(res, err); }
          return res.status(204).send('No Content');
      });
    });
  }
};

function deleteall(folder) {
  console.log("mainfolder", folder._id)
  Folder.find({ parentid: folder._id }).exec(function (err, folders) {
    if (folders.length > 0) {  ////////for inside folder ,documents (DESTROY)
      Folder.remove({ parentid: folder._id, active: false }).exec(function (err, folder) { });
      Document.find({ folderid: folder._id, active: false }).exec(function (err, documents) { 
        documents.forEach(element=>{
          removeS3folder('convertimages/' + element.encryptedid + '/', function (resp) { console.log(resp) })
          removeS3(element.path, 'uploads')
          Docimage.remove({ $and: [{ documentid: element._id }, { active: true }] }).exec(function (err) {console.log(err)});
          element.remove(function (err) {
            if (err) { return handleError(res, err); }
          })
        })
      });
      folders.forEach(element => {
        deleteall(element);
      });
    }
    else {
      Document.find({ folderid: folder._id, active: false }).exec(function (err, documents) {
        documents.forEach(element=>{
          removeS3folder('convertimages/' + element.encryptedid + '/', function (resp) { console.log(resp) })
          removeS3(element.path, 'uploads')
          Docimage.remove({ $and: [{ documentid: element._id }, { active: true }] }).exec(function (err) {console.log(err)});
          element.remove(function (err) {
            if (err) { return handleError(res, err); }
          })
        })
       });
    }
  });
}
// ============Delete from S3===================
async function removeS3(filePath,folderName){
  //configuring the AWS environment
  AWS.config.update({
    accessKeyId: "AKIAYLZVQDQMJIGVCQUM",
    secretAccessKey: "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"
    });
  var s3 = new AWS.S3();
  //configuring parameters
  var params = {
    Bucket: 'docintact',
    Key : folderName+'/'+path.basename(filePath)
  };
  try{
    // await s3.deleteObject(params).promise()
    // console.log("file deleted Successfully")
    s3.deleteObject(params, function(err, deldata) {
      if (err) console.log(err, err.stack);  // error
      else     console.log(filePath+'- file Deleted');                 // deleted
    });
  }
  catch (err) {
    console.log("File not Found ERROR : " + err.code)
  }
}
// ===========Delete from S3 End================

// ===========Delete folder from S3 ================
function removeS3folder(awspath,callback){
  console.log('Folder Remove deleteObjects',awspath)
  AWS.config.update({
    accessKeyId: "AKIAYLZVQDQMJIGVCQUM",
    secretAccessKey: "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"
    });
  var s3 = new AWS.S3();
  var params = {
    Bucket: 'docintact',
    Prefix: awspath
  };

  s3.listObjects(params, function(err, data) {
    if (err) return callback(err);
    if (data.Contents.length == 0) return callback(awspath+'- Empty Folder');
    params = {Bucket: 'docintact'};
    params.Delete = {Objects:[]};
    data.Contents.forEach(function(content) {
      params.Delete.Objects.push({Key: content.Key});
    });
    s3.deleteObjects(params, function(err, deldata) {
      if (err) return callback(err);
      if(data.Contents.length > 1000) removeS3folder(awspath,callback);
      else return callback(awspath+'- Folder Deleted');
    });
  });
}
// ===========Delete folder from S3 End================
//==============================delete folder(changes the status)========================================
exports.deletefolder = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Folder.findById(req.params.id, function (err, folder) {
    if (err) { return handleError(res, err); }
    if (!folder) { return res.status(404).send('Not Found'); }

    //Change status for selected folder
    SharingPeople.update({ $and: [{ fromid: req.user._id }, { folderid: req.params.id }] }, { active: false }, { multi: true }).exec(function (err, sharingpeople) {
      Favorite.update({ $and: [{ uid: req.user._id }, { folderid: req.params.id }] }, { $set: { active: false } }).exec(function (err, favorite) {
        Document.update({ folderid: req.params.id }, { active: false }, { multi: true }).exec(function (err, document) {
          Document.find({ folderid: req.params.id }).exec(function (err, documents) {
            documents.forEach(filedata => {
              SharingPeople.update({ $and: [{ fromid: req.user._id }, { fileid: filedata._id }] }, { active: false }, { multi: true }).exec(function (err, sharingpeople) {
              })
              Favorite.update({ $and: [{ uid: req.user._id }, { fileid: filedata._id }] }, { $set: { active: false } }).exec(function (err, sharingpeople) {
              })
            })
          })
        });
      })
    })

    var updated = _.merge(folder, req.body);
    updated.updated_at = Date.now();
    updated.save(function (err) {
      updateall(updated, req.user.id, false)
      if (err) { return handleError(res, err); }
      return res.status(200).json(updated);
    });
  });
};

//=======================update Folder documents status==================================================
function updateall(folder, userid, activeStatus) {
  Folder.find({ parentid: folder._id }).exec(function (err, folders) {
    if (folders.length > 0) {  ////////for inside folder ,documents (RESTORE/DELETE);
      Folder.update({ parentid: folder._id, active: !activeStatus }, { active: activeStatus }, { multi: true }).exec(function (err, fol) { });
      folders.forEach(element => {
        // element.active = activeStatus;
        // element.save();
        if (!activeStatus) {   //change status for folder childerns (DELETE)
          SharingPeople.update({ $and: [{ fromid: userid }, { folderid: element._id }] }, { $set: { active: false } }).exec(function (err, sharingpeople) {
            Favorite.update({ $and: [{ uid: userid }, { folderid: element._id }] }, { $set: { active: false } }).exec(function (err, sharingpeople) {
              Document.update({ folderid: element._id }, { $set: { active: false } }, { multi: true }).exec(function (err, document) {
                Document.find({ folderid: element._id }).exec(function (err, documents) {
                  if (documents && documents.length > 0) {
                    documents.forEach(filedata => {
                      SharingPeople.update({ $and: [{ fromid: userid }, { fileid: filedata._id }] }, { $set: { active: false } }).exec(function (err, sharingpeople) {
                      })
                      Favorite.update({ $and: [{ uid: userid }, { fileid: filedata._id }] }, { $set: { active: false } }).exec(function (err, sharingpeople) {
                      })
                      if ((documents.length - 1) == documents.indexOf(filedata)) updateall(element, userid, false);
                    })
                  }
                  else {
                    updateall(element, userid, false);
                  }
                })
              })
            })
          })
        }
        else   //changes the status (RESTORE)
        {
          console.log("name", element.name)
          Document.update({ folderid: element._id }, { active: true }, { multi: true }).exec(function (err, document) { });
          updateall(element, userid, true);
        }
      });
    }
    else {
      if (activeStatus && folder.first) // RESTORE documents in Parent Folder.
      {
        Document.update({ folderid: folder._id }, { active: true }, { multi: true }).exec(function (err, document) { });
        folder.first = false;
        updateall(folder, userid, true);
      }
    }
  });
}

// ====================search folder & files if it is deleted=============================================
exports.searchdeletedfiles = function (req, res) {
  Folder.find({ $and: [req.body.where, { $and: [{ userid: req.user._id }, { active: false }] }] }).populate('uid').exec(function (err, folders) {
    Document.find({ $and: [req.body.where, { $and: [{ uid: req.user._id }, { active: false }] }] }).populate('uid').exec(function (err, documents) {
      if (err) { return handleError(res, err); }
      else {
        documents = JSON.parse(JSON.stringify(documents));
        folders = JSON.parse(JSON.stringify(folders));
        // gets all deleted documents
        documents.forEach(element => {
          element.show = true;
          if (element.folderid)
            if (folders.some(x => x._id == element.folderid)) element.show = false;
          if (documents.length - 1 == documents.indexOf(element)) documents = documents.filter(x => x.show);
        })
        // gets all deleted folders
        folders.forEach(element => {
          element.show = true;
          element.child = folders.filter(x => x.parentid && x.parentid == element._id)
          if (element.parentid) if (folders.some(x => x._id == element.parentid)) element.show = false;
          if (folders.length - 1 == folders.indexOf(element)) folders = folders.filter(x => x.show);
        })
        return res.status(200).json({ 'documents': documents, 'folders': folders });
      }
    });
  });
};

//==================get Trash Bin folders and files=======================================================
exports.trashfolders = function (req, res) {
  Folder.find({ $and: [{ userid: req.user._id }, { active: false }] }).sort({ created_at: 'desc' }).exec(function (err, folders) {
    Document.find({ $and: [{ uid: req.user._id }, { active: false }] }).sort({ created_at: 'desc' }).exec(function (err, documents) {
      if (err) { return handleError(res, err); }
      else {
        documents = JSON.parse(JSON.stringify(documents));
        folders = JSON.parse(JSON.stringify(folders));
        // gets all deleted documents
        documents.forEach(element => {
          element.show = true;
          if (element.folderid)
            if (folders.some(x => x._id == element.folderid)) element.show = false;
          if (documents.length - 1 == documents.indexOf(element)) documents = documents.filter(x => x.show);
        })
        // gets all deleted folders
        folders.forEach(element => {
          element.show = true;
          element.child = folders.filter(x => x.parentid && x.parentid == element._id)
          if (element.parentid)
            if (folders.some(x => x._id == element.parentid)) element.show = false;
          if (folders.length - 1 == folders.indexOf(element)) folders = folders.filter(x => x.show);
        })
        return res.status(200).json({ 'documents': documents, 'folders': folders });
      }
    });
  });
};

// =======================================================================================================
exports.user_folders_files = function (req, res) {
  Folder.find({ $and: [{ userid: req.params.id }, { active: true }, { parentid: { $exists: false } }] }).exec(function (err, folders) {
    if (err) { return handleError(res, err); }
    else {
      Document.find({ $and: [{ uid: req.params.id }, { active: true }, { folderid: { $exists: false } }] }).exec(function (err, documents) {
        if (documents && documents.length > 0) {
          for (let document of documents) {
            folders.push(document)
            if (documents.length - 1 == documents.indexOf(document)) return res.status(200).json(folders);
          }
        }
        else {
          return res.status(200).json(folders);
        }
      });
    }
  });
}


exports.adminfolderdetails = function (req, res) {
  Folder.find({ $and: [{ active: true }, { parentid: req.params.id }] }).exec(function (err, folders) {
    if (err) { return handleError(res, err); }
    else {
      Document.find({ $and: [{ active: true }, { folderid: req.params.id }] }).exec(function (err, documents) {
        if (documents && documents.length > 0) {
          for (let document of documents) {
            folders.push(document)
            if (documents.length - 1 == documents.indexOf(document)) return res.status(200).json(folders);
          }
        }
        else {
          return res.status(200).json(folders);
        }
      });
    }
  })
}
//==========update folder status isSent File=false========================================
exports.removesentfolder = function (req, res) {
  Folder.findById(req.params.id).exec(function (err, folder) {
    if (err) { return handleError(res, err); }
    if (!folder) { return res.status(404).send('Not Found'); }
    folder.isSent = false
    folder.updated_at = Date.now();
    var updated = _.merge(folder, folder)
    updated.save(function (err, res1) {
      if (err) { return handleError(res, err); }
      else {
        return res.status(200).json(res1);
      }
    })
  })
}
//===================================================================================
exports.getSentDoc = function (req, res) {
  var arr = [];
  Folder.find({ $and: [{ active: true }, { isSent: true }, { userid: req.user._id }] }).sort({ createdAt: 'desc' }).exec(function (err, folders) {
    async.each(folders, function (element, callback) {
      arr.push(element);
      callback();
    }, function (err) {
      Document.find({ $and: [{ active: true }, { isSent: true }, { uid: req.user._id }] }).sort({ createdAt: 'desc' }).exec(function (err, documents) {
        if (err) { return handleError(res, err); }
        if (documents.length > 0) {
          async.each(documents, function (element, callback) {
            arr.push(element);
            callback();

          }, function (err) {
            return res.status(200).json(arr);
          });
        }
        else
          return res.status(200).json(arr);
      });
    });
  })
};


exports.deleteAllFolderFile = function (req, res) {
  Folder.remove({ userid: req.user._id, active: false }).exec(function (err, result) {
    Document.remove({ uid: req.user._id, active: false }).exec(function (err, resultFile) {
      return res.json({ message: 'Success' });
    })
  })
}


//multi select folder delete
exports.multiFolderDelete = function (req, res) {
  var folders = req.body
  async.each(folders, function (element, callback) {
    Folder.update({ _id: element._id, }, { active: false }).exec(function (err, fol) {
      //Change status for selected folder
      SharingPeople.update({ $and: [{ fromid: req.user._id }, { folderid: element._id }] }, { active: false }, { multi: true }).exec(function (err, sharingpeople) {
        Favorite.update({ $and: [{ uid: req.user._id }, { folderid: element._id }] }, { $set: { active: false } }).exec(function (err, favorite) {
          Document.update({ folderid: element._id }, { active: false }, { multi: true }).exec(function (err, document) {
            Document.find({ folderid: element._id }).exec(function (err, documents) {
              documents.forEach(filedata => {
                SharingPeople.update({ $and: [{ fromid: req.user._id }, { fileid: filedata._id }] }, { active: false }, { multi: true }).exec(function (err, sharingpeople) {
                })
                Favorite.update({ $and: [{ uid: req.user._id }, { fileid: filedata._id }] }, { $set: { active: false } }).exec(function (err, sharingpeople) {
                })
              })
            })
          });
        })
      })
      updateall(element, req.user.id, false)
      callback()
      // if (err) { return handleError(res, err); }

    })
    }, function (err) {
      return res.status(201).json({ message: 'success' });
  });
};

//multi select folder and file move

exports.multiselectmove = function (req, res) {
  var folders = req.body.folders
  var files = req.body.files
  var moveto = req.body.moveto
  console.log(moveto)
  if(moveto=='root') var parentid=undefined
  else var parentid=moveto._id
  async.each(folders, function (element, callback) {
    Folder.update({ _id: element._id, }, { parentid: parentid }).exec(function (err, fol) {
      callback()
    })
  }, function (err) {
    async.each(files, function (element1, callback) {
      Document.update({ _id: element1._id, }, { folderid: parentid }).exec(function (err, fol) {
        callback()
      })
    }, function (err) {
        return res.status(201).json({ message: 'success' });

      })
  })
}
exports.multiselect_Permenant_Delete = function (req, res) {
  var folders = req.body.folders
  var files = req.body.files
  async.each(files, function (element, callback) {
    Document.findById(element._id, function (err, document) {
      if (err) { return handleError(res, err); }
      if (!document) { return res.status(404).send('Not Found'); }
      console.log(document)
      removeS3folder('convertimages/'+document.encryptedid+'/',function(resp){console.log(resp)})
      removeS3(document.path,'uploads')
      Docimage.remove({ $and: [{ documentid: document._id }, { active: true }] }).exec(function (err) {console.log(err)});
      document.remove(function (err) {
        if (err) { return handleError(res, err); }
        callback()
      });
    });
  }, function (err) {
    async.each(folders, function (element1, callback) {
      Folder.findById(element1, function (err, folder) {
        if (err) { return handleError(res, err); }
        if (!folder) { return res.status(404).send('Not Found'); }
        console.log("id", folder._id);
        folder.first = true;
         Document.find({ folderid: folder._id, active: false }).exec(function (err, documents) { 
          console.log(documents)
          documents.forEach(element=>{
            removeS3folder('convertimages/' + element.encryptedid + '/', function (resp) { console.log(resp) })
            removeS3(element.path, 'uploads')
            Docimage.remove({ $and: [{ documentid: element._id }, { active: true }] }).exec(function (err) {console.log(err)});
            element.remove(function (err) {
              if (err) { return handleError(res, err); }
            })
          })
        });
        deleteall(folder);
        folder.remove(function (err) {
            if (err) { return handleError(res, err); }
            // return res.status(204).send('No Content');
            callback()
        });
      })
  }, function (err) {
   

    return res.status(201).json({ message: 'success' });

  })
})

}
// Updates an existing folder Active status to false
// exports.updatestatus = function (req, res) {
//    req.body.active=false
//   var updated = _.merge(folder, req.body);
//   updated.save(function (err) {
//    updateall(updated)
//   });

// };



