'use strict';

var _ = require('lodash');
var Group = require('./group.model');
var shortid = require('shortid');
var Groupmember = require('../groupmember/groupmember.model')
// Get list of groups
exports.index = function (req, res) {
  Group.find().populate('GroupIcon').exec(function (err, groups) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(groups);
  });
};

exports.groupprofilepic = function(req,res) {
  console.log("req params: ",req.params.id);
  Group.findById(req.params.id).populate('GroupIcon').exec(function(err,pic) {
    console.log("PIC: ",pic);
    return(res.status(200).json(pic));
  })
}

// Get a single group
exports.show = function (req, res) {
  Group.findById(req.params.id, function (err, group) {
    if (err) {
      return handleError(res, err);
    }
    if (!group) {
      return res.status(404).send('Not Found');
    }
    return res.json(group);
  });
};
// Checking group exist or not
exports.checkingGroupExist = function(req, res) {
  Group.find({_id:req.params.gid}, function(err, group){
    if(err) throw err;
    return res.status(200).json(group)
  })
}

// Creates a new group in the DB.
exports.create = function (req, res) {
  console.log("req.body group", req.body);
  var groupdata = req.body;
  console.log("user data", req.user._id)
  Group.find({$and: [{GroupName: req.body.GroupName}, {creatorId: req.user._id}]}).exec(function (err, groupfound) {
    if (err) throw err;
    console.log("groupfound", groupfound);
    if (groupfound !== null && groupfound.length > 0) {
      return res.json({
        response: 'You already created this group'
      });
    } else {
      groupdata.GuniqueId = groupdata.GroupName + shortid.generate(groupdata.GroupName);
      console.log('groupdata', groupdata);

      Group.create(groupdata, function (err, groupresult) {
        if (err) throw err;
        console.log('lllllllllllllppppppppppppppppp', groupresult);
        require('../../app').socket.emit('groupsGetting:save', groupresult);
        Groupmember.create({
          GroupId: groupresult._id,
          Grname :  groupresult.GroupName,
          creatorId: groupresult.creatorId,
          isJoin: 'Accepted',
          memberId: groupresult.creatorId,
          memberEmailId: groupresult.creatorEmailId,
          messageNotification : false
        }, function (err, results) {
          if (err) throw err;
          console.log(results);
        });
        return res.status(201).json({
          response: 'Group Created Successfully',
          groupresult
        })
      });
    }
  })

};
// Rename the group
exports.renameGroup = (req, res) => {
  Group.findByIdAndUpdate({
    _id: req.body.id
  }, {
    $set: {
      GroupName: req.body.rename
    }
  }, {
    new: true
  }, (err, change) => {
    if (err) throw err;
    console.log('kkkkkkkkkkk',change);
    Groupmember.find({GroupId:change._id},(error,count)=>{
      if(error) throw error;
      console.log('llllll',count);
      count.forEach(element=>{
        Groupmember.update({_id:element._id},{$set:{Grname:change.GroupName}},{new:true},(erro, response)=>{
          if(erro) throw error;
          console.log(response);
          
        })
      })
      
    })
    require('../../app').socket.emit('grename:save', change);
    return res.status(200).json(change)

  })

}

// Updates an existing group in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Group.findById(req.params.id, function (err, group) {
    if (err) {
      return handleError(res, err);
    }
    if (!group) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(group, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(group);
    });
  });
};

// Deletes a group from the DB.
exports.destroy = function (req, res) {
  Group.findById(req.params.id, function (err, group) {
    if (err) {
      return handleError(res, err);
    }
    if (!group) {
      return res.status(404).send('Not Found');
    }
    group.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};



exports.groupsMail = function (req, res) {
  console.log('lllllllllllllllll', req.body);

  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 25,
      secure: false,
      auth: {
        user: 'rahul.pentakota@cognitiveinnovations.in',
        pass: 'anna@COGNITIVE'
      }
    });
    req.body.mail.forEach(Email => {


      // setup email data with unicode symbols
      let mailOptions = {
        from: '"CHATINTACT 👻" <rahul.pentakota@cognitiveinnovations.in>',
        to: Email,
        subject: 'INVITATION ✔',
        text: 'Hello',
        html: "Click here to join the chat Group: " + req.body.url + Email
        // html: 'http://localhost:4200/?'+  req.body.slug + '/' + req.body.EmailId 
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {}
      })
    })
  })
}

function handleError(res, err) {
  return res.status(500).send(err);
}