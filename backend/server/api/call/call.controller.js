'use strict';

var _ = require('lodash');
var Call = require('./call.model');
var User = require('../user/user.model');
var randomstring = require('randomstring');
var room = null

// Get list of calls
exports.index = function(req, res) {
  Call.find(function (err, calls) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(calls);
  });
};

// Get a single call
exports.show = function(req, res) {
  Call.findById(req.params.id, function (err, call) {
    if(err) { return handleError(res, err); }
    if(!call) { return res.status(404).send('Not Found'); }
    return res.json(call);
  });
};

// Creates a new call in the DB.
exports.create = function (req, res) {
  console.log("Create Calling Object: ",req.body);
  let roomid = null,room=null,receiver=[];
  // console.log("Call Body 1: ", req.body);
  if (req.body.type == 'VideoCall.caller') {
    // console.log("Type: ", req.body.type);
    User.findByIdAndUpdate(req.body.callerID, { $set: { onCall: true } }, { returnOriginal: false }, async function (err, resp) {
      console.log("OnCall true for caller: ", resp);
      User.findByIdAndUpdate(req.body.receiverID, { $set: { onCall: true } }, { returnOriginal: false }, async function (err, resp2) {
        console.log("OnCall true for receiver: ", resp2);
        do {
          roomid = randomstring.generate();
        } while (Call.count({ RoomID: roomid }) > 0);
        room = roomid;
        console.log("Generated Room ID: ", room)
        for (let i = 0; i < req.body.receiverID.length; i++) {
          receiver.push({id: req.body.receiverID[i],status:'Pending'})
        }
        let usercall = await Call.create({CallType: 'Video',SenderID: req.body.callerID, ReceiverID: receiver, CallStartedAt: Date.now(), CallEndedAt:null, RoomID: room, Status: 'Active'});
        console.log("USER CALL 1: ",usercall);
        if(usercall) {
          usercall = await usercall.populate('SenderID').populate('ReceiverID.id').execPopulate().then(()=> {
          console.log("USER CALL 2: ",usercall);
          require('../../app').socket.emit('video:call',usercall);
          return res.status(200).json(usercall);
          })
        }
      })
    })
  }
}

exports.solovideocallend = function(req, res) {
   User.findByIdAndUpdate(req.body.SenderID._id,{$set:{onCall: false}},{returnOriginal:false},function(err1,resp1) {
    User.findByIdAndUpdate(req.body.ReceiverID[0].id._id,{$set:{onCall: false}},{returnOriginal: false},function(err2,resp2) {
      Call.findByIdAndUpdate(req.body._id,{$set:{CallEndedAt: Date.now(), Status:'Inactive'}},{returnOriginal: false}).populate('SenderID').populate('ReceiverID.id').exec(async function(err3,resp3) {
        console.log("Err3: ",err3)
        let socketdata = JSON.parse(JSON.stringify(resp3));
        socketdata.usertype = req.body.usertype;
        console.log("Socket Data: ",socketdata);
       if(socketdata) {
          await require('../../app').socket.emit('solovideocallendAlert',socketdata);
          return res.status(200).json(socketdata);
       }
      })
    })
   })
}

exports.invalidCallRedirect = function(req,res) {
  console.log("invalidCallRedirect: ",req.body);
  return res.status(200).json(req.body);
}

exports.solovideocallAccept = function(req,res) {
  console.log("solovideocallAccept: ",req.body);
  Call.findByIdAndUpdate(req.body.id,{$set:{ReceiverID:req.body.receiver}}).populate('SenderID').populate('ReceiverID.id').exec(function(err,resp) {
    if(resp) {
      require('../../app').socket.emit('solovideocallaccept',resp);
      return res.status(200).json('Receiver updated.')
    }
  })
}

exports.solovideocallwaiting = function(req,res) {
  console.log("videocallwaiting: ",req.body);
  require('../../app').socket.emit('solovideocallwaiting',req.body);
  return res.status(200).json("done");
}

exports.solovideocallTimeout = async function(req,res) {
  let recID = [];
  recID.push({ id: req.body.ReceiverID[0].id._id, status: 'No Answer' });
  let user1 = await User.findByIdAndUpdate(req.body.SenderID._id, { $set: { onCall: false } });
  let user2 = await User.findByIdAndUpdate(req.body.ReceiverID[0].id._id, { $set: { onCall: false } });
  let call = await Call.findByIdAndUpdate(req.body._id, { $set: { ReceiverID: recID, CallEndedAt: Date.now(), status: 'Inactive' } }, { returnOriginal: false });
  if(user1 && user2 && call) {
    call = await call.populate('SenderID').populate('ReceiverID.id').execPopulate().then(() => {
      console.log("solovideocallTimeout: ", call)
      require('../../app').socket.emit('solovideocallTimeout', call);
      return res.status(200).json("done");
    })
  }
}

exports.solovideocallreceivererror = async function (req, res) {
  console.log("solovideocallreceivererror 1: ", req.body)
  let recID = [];
  recID.push({ id: req.body.ReceiverID[0].id._id, status: 'No Answer' });

  let user1 = await User.findByIdAndUpdate(req.body.SenderID._id, { $set: { onCall: false } });
  let user2 = await User.findByIdAndUpdate(req.body.ReceiverID[0].id._id, { $set: { onCall: false } });
  let call = await Call.findByIdAndUpdate(req.body._id, { $set: { ReceiverID: recID, CallEndedAt: Date.now(), status: 'Inactive' } }, { returnOriginal: false });

  if (user1 && user2 && call) {
    call = await call.populate('SenderID').populate('ReceiverID.id').execPopulate().then(() => {
      console.log("solovideocallreceivererror 2: ", call)
      require('../../app').socket.emit('solovideocallreceivererror', call);
      return res.status(200).json("done");
    })
  }
}

exports.solovideocallReject = async function(req,res) {
  
  let recID={id: req.body.ReceiverID[0].id._id, status:'Rejected'};
  console.log("Video Call Reject: ",recID);

  let user1 = await User.findByIdAndUpdate(req.body.SenderID._id, { $set: { onCall: false }},{returnOriginal:false});
  let user2 = await User.findByIdAndUpdate(req.body.ReceiverID[0].id._id, { $set: { onCall: false }},{returnOriginal:false});
  let call = await Call.findByIdAndUpdate(req.body._id, { $set: { ReceiverID: recID, CallEndedAt: Date.now(), status: 'Inactive'}},{returnOriginal:false});

  if (user1 && user2 && call) {
    call = await call.populate('SenderID').populate('ReceiverID.id').execPopulate().then(() => {
      console.log("solovideocallReject: ", call)
      require('../../app').socket.emit('solovideocallReject', call);
      return res.status(200).json(call);
    })
  }
}

//fetch Room ID
exports.fetchroomid = function(req,res) {
  console.log("FETCH ROOM REQ BODY: ",req.body);
  Call.findOne({$and:[{"SenderID.id":req.body.caller},{"ReceiverID.id":req.body.receiver},{Status:'Active'}]},function(err,room) {
    console.log("FETCH ROOM ROOMID: ",room.RoomID);

    User.findByIdAndUpdate(req.body.receiver, { $set: { onCall: true } }, { returnOriginal: false }, function (err, resp) {
      console.log("Update Receiver Status: ",resp)
      let receiverstat = ['Accepted'];
      Call.findOneAndUpdate({ RoomID: room.RoomID },{$set:{ReceiverStatus:receiverstat }},{returnOriginal:false},function(err,resp1) {
        console.log("Call Update: ",resp1);
      }) 
    })

    return res.status(200).json(room.RoomID);
  })
}

// Updates an existing call in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Call.findById(req.params.id, function (err, call) {
    if (err) { return handleError(res, err); }
    if(!call) { return res.status(404).send('Not Found'); }
    var updated = _.merge(call, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(call);
    });
  });
};

// Deletes a call from the DB.
exports.destroy = function(req, res) {
  Call.findById(req.params.id, function (err, call) {
    if(err) { return handleError(res, err); }
    if(!call) { return res.status(404).send('Not Found'); }
    call.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.fetchcalllogs = function(req, res) {
  Call.find({$or:[{"SenderID": req.params.id},{"ReceiverID.id": req.params.id}]}).sort({'CallStartedAt':-1}).populate('SenderID').populate('ReceiverID.id').limit(25).exec(function(err,resp) {
    // console.log("Call Log Response: ",resp);
    return res.status(200).json(resp);
  })
}

exports.solocallreject1 = function(req,res) {
  console.log("Callreject1: ",req.body);
  let obj=['Reject']
 Call.update({RoomID:req.body.id},{$set:{ReceiverStatus:obj}},{returnOriginal: false},function(err,resp) {
   return res.status(200).json(resp);
 })
}

function handleError(res, err) {
  return res.status(500).send(err);
}