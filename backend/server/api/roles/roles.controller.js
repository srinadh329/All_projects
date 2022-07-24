'use strict';

var _ = require('lodash');
var Roles = require('./roles.model');

// Get list of roless
exports.index = function(req, res) {
  Roles.find(function (err, roless) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(roless);
  });
};

exports.getroles = function(req,res){

}

exports.getroles = function(req,res,next){
  // console.log('1111',req.type_id);
  var type = req.type_id;


  Roles.find({ role_type: req.params.type_id}).exec(function (err, user) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(roless);
  });
 
}

// Get a single roles
exports.show = function(req, res) {
  Roles.findById(req.params.id, function (err, roles) {
    if(err) { return handleError(res, err); }
    if(!roles) { return res.status(404).send('Not Found'); }
    return res.json(roles);
  });
};



// Creates a new roles in the DB.
exports.create = function(req, res) {
    if(req.body.role_name != null &&  req.body.role_status != null && req.body.role_type != null && req.body.role_type != null){
    Roles.find({}).sort({_id:-1}).limit(1).exec(function(err,result){
      if(err) { return handleError(res, err); }
      if(!result){
        var rid = 0;
      } else{
        var rid = result[0].role_id ;
      }
    var role_id = parseInt(rid)+1;
    Roles.find({ 'role_name': req.body.role_name }, function(err, response) {
      if(err) { return handleError(res, err); }
      

      //if user found.
      if (response.length!=0) {
        if(response[0].role_name){
        return res.status(200).json({ message: "Role Name already exists" });
         
        }                                    

      } else {
    
    var myobj = { role_name: req.body.role_name, role_status: req.body.role_status,role_id:role_id};
    Roles.create(myobj, function(err, admin) {
      if(err) { return handleError(res, err); }
      return res.status(200).json({ message: "Role Added successfully" });
         
    });
      }
    });
  });
  } else {
    return res.status(200).json({ message: "Fields Missing" }); 
  } 
};


// exports.create = function(req, res) {
//   if(req.body.role_name != null &&  req.body.role_status != null && req.body.role_type != null && req.body.role_id != null){
  
  
//   var myobj = { role_name: req.body.role_name, role_status: req.body.role_status,role_id:req.body.role_id,role_type:req.body.role_type};
//   Roles.create(myobj, function(err, admin) {
//     if(err) { return handleError(res, err); }
//     return res.status(200).json({ message: "Role Added successfully" });
       
//   });
   
// } else {
//   return res.status(200).json({ message: "Fields Missing" }); 
// } 
// };


// Updates an existing roles in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Roles.findById(req.params.id, function (err, roles) {
    if (err) { return handleError(res, err); }
    if(!roles) { return res.status(404).send('Not Found'); }
    var updated = _.merge(roles, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(roles);
    });
  });
};

// Deletes a roles from the DB.
// exports.destroy = function(req, res) {
//   Roles.findById(req.params.id, function (err, roles) {
//     if(err) { return handleError(res, err); }
//     if(!roles) { return res.status(404).send('Not Found'); }
//     roles.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.status(204).send('No Content');
//     });
//   });
// };

exports.destroy = function(req,res){    
  Roles.findOne({_id:req.body._id},function(err,response){
  
  if(response.role_deleted_status == 1){
  Roles.findOneAndUpdate({_id:req.body._id},{$set:{role_deleted_status:0}},{new:true},function(err,response){
   
  
  return res.status(200).json({ message: "Role Deleted successfully" });
      })
    }else return res.status(200).json("you already deleted");
  })
}



function handleError(res, err) {
  return res.status(500).send(err);
}