'use strict';

var _ = require('lodash');
const moment = require('moment');
var Userstatus = require('./userstatus.model');
var Friendslist = require('../friendslist/friendslist.model');

// Get list of userstatuss
exports.index = function (req, res) {
  Userstatus.find(function (err, userstatuss) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(userstatuss);
  });
};

// Get a single userstatus
exports.show = function (req, res) {
  console.log("Fetched Status User: ", req.params.id)
  Userstatus.find({ $and: [{ userId: req.params.id }, { ExpiredAt: { $gte: new Date() } }] }).sort({ 'CreatedAt': -1 }).populate('userId').populate('SeenBy').populate('likedBy').populate('comments.userid').populate('media').exec(function (err, userstatus) {
    if (err) { return handleError(res, err); }
    console.log("ID: ", req.params.id, " User Status Response: ", userstatus);
    if (userstatus) {
      return res.status(200).json(userstatus);
    }
    else {
      return res.status(200).json(null);
    }
  })
};

exports.fetchsolostatus = function (req,res) {
  console.log("Refetch Status: ",req.params.id);
  Userstatus.find({ $and: [{ userId: req.params.id }, { ExpiredAt: { $gte: new Date() } }] }).sort({ 'CreatedAt': -1 }).populate('likedBy').populate('comments.userid').populate('media').exec(function (err, userstatus) {
    if (err) { return handleError(res, err); }
    console.log("ID: ", req.params.id, " User Status Response: ", userstatus);
    if (userstatus) {
      return res.status(200).json(userstatus);
    }
    else {
      return res.status(200).json(null);
    }
  })
}

exports.updateSeenStatus = async function (req,res) {
  console.log("updateSeenStatus: ",req.body);
  let userstatus = await Userstatus.findByIdAndUpdate(req.body.id,{$set: { SeenBy: req.body.SeenBy}},{returnOriginal: false});
  // console.log("UserStatus Seen 1: ",userstatus);
  if(userstatus) {
    console.log("UserStatus Seen 2: ",userstatus);
    userstatus = await userstatus.populate('userId').populate('SeenBy').populate('likedBy').populate('comments.userid').populate('media').execPopulate().then(() => {
      console.log("UserStatus Seen 3: ",userstatus);
      require('../../app').socket.emit('updateseen',userstatus);
      console.log("resp: ",userstatus)
      return res.status(200).json('success')
    })
  }
}


exports.updatecomments =async function(req,res) {
  console.log("UPDATE Comments REQ BODY: ",req.body);
  let userstatus = await Userstatus.findByIdAndUpdate(req.body.id,{$push: {"comments": {userid: req.body.comments.userid, text: req.body.comments.text, sendtime: Date.now()}}},{upsert: true,new: true,returnOriginal: false});
  if(userstatus) {
    userstatus = await userstatus.populate('userId').populate('SeenBy').populate('likedBy').populate('comments.userid').populate('media').execPopulate().then(() => {
      console.log("Update Comments: ",userstatus);
      require('../../app').socket.emit('statuscomment',userstatus);
      return res.status(200).json('success'); 
  })
  }
}

// Creates a new userstatus in the DB.
exports.create = async function (req, res) {
  let CreatedAt = moment().format();
  let ExpiredAt = moment().add(1, 'days').format();
  let count = 0;
  if (req.body.StatusType == 'text') {
    let userstatus = await Userstatus.create({ userId: req.body.userid, StatusType: req.body.StatusType, CreatedAt: CreatedAt, ExpiredAt: ExpiredAt, TextStatus: req.body.TextStatus, TextColor: req.body.TextColor, TextBackground: req.body.TextBackground, isBold: req.body.Bold, isItalic: req.body.Italic, isUnderlined: req.body.Underline, media: null, SeenBy: [req.body.userid] });
    if(userstatus) {
      userstatus= await userstatus.populate('userId').populate('SeenBy').populate('likedBy').populate('comments.userid').populate('media').execPopulate().then(()=> {
        console.log("text status",userstatus)
        require('../../app').socket.emit('userstatus',userstatus); 
        return res.status(201).json('success');
      })
    }
  }
  else if(req.body.StatusType == 'media') {
    for(let i=0;i<req.body.media.length;i++) {
      let userstatus = await Userstatus.create({userId: req.body.userid, StatusType: req.body.StatusType, CreatedAt: CreatedAt, ExpiredAt: ExpiredAt, media:req.body.media[i], caption:req.body.caption[i], SeenBy: [req.body.userid]})
      if(userstatus) {
        userstatus = await userstatus.populate('userId').populate('SeenBy').populate('likedBy').populate('comments.userid').populate('media').execPopulate().then(()=> {
          console.log("Media Status: ",userstatus);
          count++;
          require('../../app').socket.emit('userstatus',userstatus);
          if(count == req.body.media.length) {
            return(res.status(201).json('success'));
          }
        })
      }
    }
  }
};

// Updates an existing userstatus in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Userstatus.findById(req.params.id, function (err, userstatus) {
    if (err) { return handleError(res, err); }
    if (!userstatus) { return res.status(404).send('Not Found'); }
    var updated = _.merge(userstatus, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(userstatus);
    });
  });
};

exports.updatelikes =async function(req,res) {
  // console.log("UPDATE LIKES REQ BODY: ",req.body);
  let userstatus = await Userstatus.findByIdAndUpdate(req.body.statusid,{$set: {likedBy: req.body.likedBy}},{returnOriginal: false});
  if(userstatus) {
    userstatus = await userstatus.populate('userId').populate('SeenBy').populate('likedBy').populate('comments.userid').populate('media').execPopulate().then(() => {
      console.log("Update Likes: ",userstatus);
      require('../../app').socket.emit('statuslike',userstatus);
      return res.status(200).json('success'); 
  })
  }
}

// Deletes a userstatus from the DB.
exports.destroy = function (req, res) {
  Userstatus.findById(req.params.id, function (err, userstatus) {
    if (err) { return handleError(res, err); }
    if (!userstatus) { return res.status(404).send('Not Found'); }
    userstatus.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.fetchstatus = async function (req, res) {
  let StatusResponse = [], count = 0, flag = false, count2 = 0;
  for (let user of req.body) {

    let userstatus = await Userstatus.find({ $and: [{ userId: user.id }, { ExpiredAt: { $gte: new Date() } }] }).sort({ 'CreatedAt': -1 });
    count += 1;
    if (userstatus.length > 0) {

      // console.log("User Status fetch 1: ",userstatus)
      for (let status of userstatus) {
        await status.populate('userId').populate('SeenBy').populate('likedBy').populate('comments.userid').populate('media').execPopulate();
      }
      StatusResponse.push({ id: user.id,EmailId: user.EmailId, Name: user.Name, isMuted: user.isMuted, status: userstatus })
    }
    if (count == req.body.length && StatusResponse.length > 0) {
      console.log("StatusResponse: ", StatusResponse)
      return res.status(200).json(StatusResponse);
    }
    else if (count == req.body.length && StatusResponse.length == 0) {
      return res.status(200).json(null);
    }
  }

}

exports.mutestatus = function (req,res) {
  console.log("Mute Status Req Body: ",req.body);
  Friendslist.findOneAndUpdate({from: req.body.loginEmail, to: req.body.statusEmail},{$set:{ToUserStatusMute: true}},{returnOriginal: false}, function(err1,resp1){
    console.log("User Status Updated: ",resp1)
    if (resp1) {
     console.log("User Status Updated: ",resp1)
     return res.status(200).json("success");
   }
   else {
     Friendslist.findOneAndUpdate({from: req.body.statusEmail, to: req.body.loginEmail},{$set: {fromUserStatusMute: true}},{returnOriginal: false}, function(err2,resp2) {
      console.log("User Status Updated: ",resp2) 
      if(resp2) {
         console.log("User Status Updated: ",resp2);
         return res.status(200).json("success");
       }
     })
   } 
  })

}

exports.unmutestatus = function (req,res) {
  console.log("Mute Status Req Body: ",req.body);
  Friendslist.findOneAndUpdate({from: req.body.loginEmail, to: req.body.statusEmail},{$set:{ToUserStatusMute: false}},{returnOriginal: false}, function(err1,resp1){
   if (resp1) {
     console.log("User Status Updated: ",resp1)
     return res.status(200).json("success");
   }
   else {
     Friendslist.findOneAndUpdate({from: req.body.statusEmail, to: req.body.loginEmail},{$set: {fromUserStatusMute: false}},{returnOriginal: false}, function(err2,resp2) {
       if(resp2) {
         console.log("User Status Updated: ",resp2);
         return res.status(200).json("success");
       }
     })
   } 
  })

}  

function handleError(res, err) {
  return res.status(500).send(err);
}