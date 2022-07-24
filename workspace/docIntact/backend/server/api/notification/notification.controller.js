'use strict';

var _ = require('lodash');
var Notification = require('./notification.model');
var async = require('async');
var Token = require('../token/token.model');
var FCM = require('fcm-push');
var serverKey='AAAAz5oXr98:APA91bHGIkRl1EjZWXjdj38wSBFgOVYHm6opanRvdb23_mE7nbYO7jk4ssi3Ua-fAmM1CN9yNSmyXCdgcQnAkcr-0SeIf6rLC-DXWQblqz38G4CleBashXEcglSuCOnmgVfH9lzVgL_1';
var fcm = new FCM(serverKey);
// Get list of notifications
exports.index = function (req, res) {
  Notification.find({ $and: [{ $or: [{ toid: req.user._id }, { fromid: req.user._id }] }, { read: false }, { active: true }] }).populate('fromid').populate('toid').populate('sharingPeopleId').populate('documentid').exec(function (err, notifications) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(notifications);
  });
}

// Get list of notifications
exports.getOfflinenotification = function (req, res) {
  Notification.find({ $and: [{ $or: [{ toemail: req.user.email },{ toid : req.user._id}] }, { active: true }] }).sort({ created_at: 'desc' }).populate('fromid').populate('toid').populate('sharingPeopleId').populate('documentid').populate('folderid').exec(function (err, notifications) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(notifications);
  });
}

//get the count
exports.count = function (req, res) {

  Notification.count({ $and: [{$or: [{ toemail: req.user.email },{ toid: req.user._id }]}, { read: false }, { active: true }] }).populate('fromid').populate('toid').populate('sharingPeopleId').populate('documentid').exec(function (err, notifications) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(notifications);
  });
}

// Get a single notification
exports.show = function (req, res) {
  Notification.findById(req.params.id).populate('fromid').populate('toid').populate('sharingPeopleId').exec(function (err, notification) {
    if (err) { return handleError(res, err); }
    if (!notification) { return res.status(404).send('Not Found'); }
    return res.json(notification);
  });
};

// Creates a new notification in the DB.
exports.create = function (req, res) {
  Notification.create(req.body, function (err, notification) {

    /****************************Push notification for mobile***************************** */
    Notification.findById(notification._id).populate('fromid').populate('toid').populate('documentid').populate('sharingPeopleId').exec(function (err, notificationdetail) {
      var title = req.body.type;
     var name=notificationdetail.documentid?notificationdetail.documentid.name:'folder';
     var fromemail = notificationdetail.fromid ? notificationdetail.fromid.name : (notificationdetail.fromemail).split('@')[0];
      if(req.body.type=='Shared') var body = fromemail +' Shared a ' + name +' to you' 
      if(req.body.type=='submit') var body = fromemail +' Re-Submitted the document which you have Shared ' + name
      if(req.body.type=='closed') var body = fromemail +' Seen Your Document ' + name

        Token.find({ uid: notification.toid }, function (err, tokens) {
        if (tokens.length > 0) {
          async.forEachOf(tokens, (token, callback) => {
            // console.log("Tokens " + token.deviceid);
            var message = {
              to: token.deviceid,
              notification: { title: title, body: body, sound: "default", click_action: "FCM_PLUGIN_ACTIVITY" },
              // data: { pdfdata: notificationdetail.documentid, shareddata: notificationdetail.sharingPeopleId, type: req.body.type },
              priority: "high",
            };
            fcm.send(message, function (err, response) {
              // console.log(message)
              if (err) {
                console.log("error" + err)
              } else {
                // console.log("Successfully sent with response: ", response);
              }
            });
          })
        }
      })
    })
    /****************************Push notification for mobile ends***************************** */

    if (err) { return handleError(res, err); }
    return res.status(201).json(notification);
  });
};

// Updates an existing notification in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Notification.findById(req.params.id, function (err, notification) {
    if (err) { return handleError(res, err); }
    if (!notification) { return res.status(404).send('Not Found'); }
    var updated = _.merge(notification, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(notification);
    });
  });
};
//clear all notifications
exports.clearAllNotifications = function (req, res) {
  console.log("clear all notifications")
  Notification.update({$or:[{ toemail: req.user.email,active: true},{ toid: req.user._id ,active:true}]},{ active: false },{multi: true}, function (err, notification) {
    if (err) { return handleError(res, err); }
    if (!notification) { return res.status(404).send('Not Found'); }
    console.log("clear all notifications done")
    return res.status(204).json({ res: "Removed" });
  })
};
//clear badge
// exports.clearAllNotificationsactive = function (req, res) {
//   async.each(req.body, function (element, call) {
//     Notification.findById(element._id, function (err, notification) {
//       var updated = _.merge(notification, element);
//       updated.read = true;
//       updated.save(function (err) {
//         if (err) { return handleError(res, err); }
//         call();
//       });
//     });
//   },function(err)
//   {
//     return res.status(201).json({ res: "Success" });
//   })
// };

exports.clearAllNotificationsactive = function (req, res) {
  Notification.update({$or:[{ toemail: req.user.email,active: true, read: false },{toid: req.user._id, active: true, read: false }]}, { read: true }, { multi: true }, function (err, notification) {
    if (err) { return handleError(res, err); }
    return res.status(201).json({ res: "Success" });
  });
};
// Deletes a notification from the DB.
exports.destroy = function (req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if (err) { return handleError(res, err); }
    if (!notification) { return res.status(404).send('Not Found'); }
    notification.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}