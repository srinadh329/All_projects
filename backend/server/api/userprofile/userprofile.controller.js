'use strict';

var _ = require('lodash');
var Userprofile = require('./userprofile.model');
var User = require('../user/user.model');
var Admin = require('../admin/admin.model')
var media = require('../media/media.model')
var Friendslist = require('../friendslist/friendslist.model')
//var Notification = require('../notification/notification.model');

// Get list of userprofiles

exports.index = function(req, res) {
  Userprofile.find(function (err,userprofile) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(userprofile);
  });
};




// Get userprofile
exports.CurrentUserInfo = function (req, res) {
  console.log('req get userprofile', req.user._id);
  Userprofile.findOne({uid: req.user._id}).populate('userid').exec(function (err, userinfo) {
    if(err) {return handleError(res, err); }
    console.log("userinfo",userinfo);
    return res.status(200).json(userinfo);
  })
}

// Get a single userprofile
exports.show = function(req, res) {
  
  Userprofile.findOne({$or: [ {organization_id:req.params.id},{userid : req.params.id}]}).populate('photo').exec(function (err, userprofile) {
    console.log("org",userprofile);
    
    if(err) { return handleError(res, err); }
    // if(!userprofile) { return res.status(404).send('Not Found'); }
    if(userprofile != null)
    {
    return res.json(userprofile);
    }
  });
};


// Creates a new userprofile in the DB.
exports.create = function (req, res) {
  console.log("sssssssssssss",req.body._id)
   Userprofile.find({_id:req.user._id},function(err,updateprofres){
     console.log(updateprofres)
     if(updateprofres.length != 0){
      // Userprofile.findOne({uid:req.body._id},function(err,response){
        Userprofile.findOneAndUpdate({uid:req.body._id},{$set:{UserName:req.body.UserName,FullName:req.body.FullName,EmailId:req.body.EmailId,Bio:req.body.bio,mobileno:req.body.mobile}},{new:true},function(err,resp){     
          // Userprofile.findOne({_id:req.body._id},function(err,finalresp){
          //   media.find({_id:finalresp.photo},function(err,photo){  
          //     return res.status(200).json({data:photo});
          //   })
           
          // })
          return res.status(200).json(resp);
        }) 
      //  })
     }else{
      req.body.uid = req.user._id;
      req.body.userid = req.user._id;
      req.body.UserName=req.body.UserName;
      req.body.EmailId=req.body.EmailId
      req.body.Bio = req.body.bio;
      req.body.mobileno =req.body.mobile
      console.log("profilecreation",req.body);
      Userprofile.create(req.body, function (err, profile) {
      console.log("999999999",profile)
        if (err) return res.status(500).send(err);
        User.findById(req.user._id).populate('userid').exec(function (err, user) {
          console.log('userupdatedata', user);
          var update = _.merge(user)
          update.save();
          return res.status(200).json(user);
        })
      // media.findOne({_id:profile.photo},function(err,response){
      //   console.log(response)
      //   return res.status(200).json({result:response});
      // })
     
      });
     }
   })
	
}
// Updates an existing userprofile in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Userprofile.findById(req.params.id, function (err, userprofile) {
    if (err) { return handleError(res, err); }
    if(!userprofile) { return res.status(404).send('Not Found'); }
    var updated = _.merge(userprofile, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(userprofile);
    });
  });
};

// Deletes a userprofile from the DB.
exports.destroy = function(req, res) {
  Userprofile.findById(req.params.id, function (err, userprofile) {
    if(err) { return handleError(res, err); }
    if(!userprofile) { return res.status(404).send('Not Found'); }
    userprofile.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};



exports. updateprofile = function(req,res){
  console.log("name000",req.body.Name,req.params.id);
  
// Userprofile.findOne({uid:req.params.id},function(err,response){
  
  
  Userprofile.findOneAndUpdate({uid:req.params.id},{$set:{UserName:req.body.UserName,FullName:req.body.FullName,EmailId:req.body.EmailId,Bio:req.body.Bio,mobileno:req.body.mobileno}},{new:true},function(err,resp){
    console.log("response:",resp)
    res.status(200).json({res:"Success"}) 
  })

//  })
}

 // This is for show the contact list bio when user drag the mouse to contact
 exports.chatlistbioshow = function(req,res){
  Userprofile.findOne({EmailId:req.body.data},function(err,chatbiores){
  return res.status(200).json(chatbiores)
    })
  } 

    exports.OrgLogo = function (req, res) {
  
     Userprofile.find({EmailId:req.user.EmailId},function(err,updateprofres){
       console.log(updateprofres)
       if(updateprofres.length != 0){
        req.body.orgname? Userprofile.findOne({EmailId:req.user.EmailId},function(err,response){
                  
          Userprofile.update(response,{$set:{orgname:req.body.orgname}},{new:true},function(err,resp){  
            
            return res.status(200).json({resp:'Name Updated'});         
          })
      
        Admin.findOne({contact_person_email:req.user.EmailId},function(err,response1){
       
          Admin.update(response1,{$set:{organization_name:req.body.orgname}},{new:true},function(err,resp1){
            
        })
      })
         }): Userprofile.findOne({EmailId:req.user.EmailId},function(err,response){
          Userprofile.update(response,{$set:{photo:req.body.id}},{new:true},function(err,resp){     
            Userprofile.findOne({EmailId:req.user.EmailId},function(err,finalresp){
              media.findOne({_id:finalresp.photo},function(err,photo){  
    
                return res.status(200).json(photo);
              })
             
            })
           
          })
        })
         
       }else{
        
        console.log("profilecreation",req.body.orgname,req.body.id);
       
        req.body.orgname?
        Userprofile.find({$and:[{EmailId:req.user.EmailId},{orgname:null}]},function(err,response){
         
          
          if(response.length == 0)
          {
           
        Userprofile.create({EmailId:req.user.EmailId,orgname: req.body.orgname,userid:req.user._id,organization_id:req.user.organization_id,roleid:req.user.roleid}, function (err, profile) {
        
          if (err) return res.status(500).send(err);
          User.findById(req.user._id).exec(function (err, user) {
           
            var update = _.merge(user)
            update.save();
          })
        
        })
      }
    }): Userprofile.find({$and:[{EmailId:req.user.EmailId},{photo:null}]},function(err,response){
        
          if(response.length == 0)
          {
            
        Userprofile.create({EmailId:req.user.EmailId,photo:req.body.id,userid:req.user._id,organization_id:req.user.organization_id,roleid:req.user.roleid}, function (err, profile) {
                     if (err) return res.status(500).send(err);
            User.findById(req.user._id).exec(function (err, user) {
              var update = _.merge(user)
              update.save();
            })
          media.findOne({_id:profile.photo},function(err,response){
            console.log(response)
            return res.status(200).json(response);
          })
         
          })
        }
      })
       }
     })
    
  }
 


function handleError(res, err) {
  return res.status(500).send(err);
}