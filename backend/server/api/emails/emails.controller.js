'use strict';

var _ = require('lodash');
var Emails = require('./emails.model');
var User = require('../user/user.model');
var Admin = require('../admin/admin.model');
// Get list of emailss
// exports.index = function(req, res) {
//   Emails.find(function (err, emailss) {
//     if(err) { return handleError(res, err); }
//     return res.status(200).json(emailss);
//   });
// };

exports.index = function(req, res) {
  
  Emails.
      find({}).
      populate('organization_id','organization_name').
      populate('created_by','Name EmailId').
      populate('updated_by','Name EmailId').
      exec(function (err, emailinfo) {
        if (err) return handleError(err);
        //console.log('The user is %s', user.roleid.role_name);
        return res.status(200).json(emailinfo);
        // prints "The author is Ian Fleming"
      });
};
exports.createorgemails = function(req,res,next){

if(req.body.email != null &&  req.body.organization_id != null &&  req.body.status != null &&  req.body.created_by != null){
  var obj = { email: req.body.email,organization_id:req.body.organization_id,status:req.body.status,created_by:req.body.created_by};
  Emails.find({'EmailId':req.body.email},function(err,response){
    if(err){return handleError(res, err); }
    // console.log(response.length);
    if(response.length !=0){
      return res.status(200).json({ message: "EmailID already exists" });
      } else {
        Emails.create(obj, function(err, emails) {
          if(err) { return handleError(res, err); }
          return res.status(200).json({ message: "Email Added successfully" });
        });
     }

  });
} else {
    return res.status(200).json({ message: "Post Parameters Required" }); 
} 
}
exports.getorgemails = function(req,res,next){
  var organization_id = req.org_id;
  Emails.
      findOne({ organization_id: req.params.org_id}).
      populate('organization_id').
      exec(function (err, user) {
        if (err) return handleError(err);
        //console.log('The user is %s', user.roleid.role_name);
        return res.status(200).json(user);
        // prints "The author is Ian Fleming"
      });

}

// Get a single emails
exports.show = function(req, res) {
  Emails.findById(req.params.id, function (err, emails) {
    if(err) { return handleError(res, err); }
    if(!emails) { return res.status(404).send('Not Found'); }
    return res.json(emails);
  });
};

// Creates a new emails in the DB.
exports.create = function(req, res) {
  if(req.body.email != null &&  req.body.organization_id != null &&  req.body.status != null &&  req.body.created_by != null){
  var obj = { email: req.body.email,organization_id:req.body.organization_id,status:req.body.status,created_by:req.body.created_by};
  Emails.find({'EmailId':req.body.email},function(err,response){
    if(err){return handleError(res, err); }
    // console.log(response.length);
    if(response.length !=0){
      return res.status(200).json({ message: "EmailID already exists" });
      } else {
        Emails.create(obj, function(err, emails) {
          if(err) { return handleError(res, err); }
          return res.status(200).json({ message: "Email Added successfully" });
        });
     }

  });
} else {
    return res.status(200).json({ message: "Post Parameters Required" }); 
} 
};

// Updates an existing emails in the DB.
exports.update = function(req, res) {
  // console.log(req.params.id);
  if(req.body._id) { delete req.body._id; }
  if( req.params.id !=null,req.body.email != null &&  req.body.organization_id != null &&  req.body.status != null &&  req.body.updated_by != null){
  Emails.findById(req.params.id, function (err, emails) {
    console.log(emails);
    console.log(emails.email);
    if (err) { return handleError(res, err); }
    if(!emails) { return res.status(404).send('Not Found'); }
   
    if(emails.email == req.body.email){
     
      //console.log('hello');
      if(emails._id == req.params.id){
        var updated = _.merge(emails, req.body);
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.status(200).json({ message: "Email updated successfully" });
         });
      } else {
        return res.status(200).json({ message: "Email Already Exists" });
      }
    } else {
      
      Emails.find({'email':req.body.email},function(err,response){
        
        if(response.length!=0){
          return res.status(200).json({ message: "Email Already Exists" });
        } else {
          var updated = _.merge(emails, req.body);
          updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(200).json({ message: "Email updated successfully" });
           });
        }
      });
      
      
    }

  });
 } else {
    return res.status(200).json({ message: "Post Parameters Required" }); 
  }
};

// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   if(req.body.email != null &&  req.body.organization_id != null &&  req.body.status != null &&  req.body.created_by != null){
//   Emails.findById(req.params.id, function (err, emails) {
//     if (err) { return handleError(res, err); }
//     if(!emails) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(emails, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(emails);
//     });
//   });
// } else {
//   return res.status(200).json({ message: "Post Parameters Required" }); 
// }
// };

// Deletes a emails from the DB.
exports.destroy = function(req, res) {
  Emails.findById(req.params.id, function (err, emails) {
    if(err) { return handleError(res, err); }
    if(!emails) { return res.status(404).send('Not Found'); }
    emails.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(200).json({ message: "Email deleted successfully" });
      // return res.status(204).send('No Content');
    });
  });
};
exports.changepassword = function (req, res, next) {
  if(req.body.id != null &&  req.body.oldpassword != null && req.body.newpassword !=null && req.body.confirmpassword !=null){
  var userId = req.body.id;
 // console.log(userId);
  var oldPass = String(req.body.oldpassword); 
  var newPass          = String(req.body.newpassword);
  var confirmPass  = String(req.body.confirmpassword);
  
  User.findById(userId, function (err, user) {
    //console.log(user);
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      if(newPass == confirmPass){
      //console.log('sucess');
      user.save(function (err) {
        if (err) return validationError(res, err);
        return res.status(200).json({ message: "Password Updated Successfully" });
        // res.json({res:"Success"})
      });
      } else {
        return res.status(200).json({ message: "Incorrect New Password AND Confirm Password" });  
      }
    } else {
      
      return res.status(200).json({ message: "Incorrect Old Password" }); 
      // res.status(403).send('Forbidden');
    }
  });
  } else {
    return res.status(200).json({ message: "Fields Missing" }); 
  }
};
function handleError(res, err) {
  return res.status(500).send(err);
}