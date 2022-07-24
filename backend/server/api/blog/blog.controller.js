'use strict';

var _ = require('lodash');
var Blog = require('./blog.model');

// Get list of blogs
exports.index = function(req, res) {
  Blog.find().populate('photo').populate('userId').exec(function (err, blogs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(blogs);
  });
};

// Get a single blog
exports.show = function(req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if(err) { return handleError(res, err); }
    if(!blog) { return res.status(404).send('Not Found'); }
    return res.json(blog);
  });
};
exports.gettingdata = function(req,res){
  
  var datetime = new Date();
  var date  = datetime.toISOString().slice(0,10);
  // console.log(datetime.toISOString().slice(0,10));
  // console.log(date);
  Blog.find( {$and:[ { "from_date": { $lte: date } },{ "to_date": { $gte: date } }]}).populate('photo').exec(function(err,blog){
  
    if(err) { return handleError(res, err); }
    if(!blog) { return res.status(404).send('Not Found'); }
    return res.json(blog);
  });
}

// Creates a new blog in the DB.
exports.create = function(req, res) {
  console.log("blog123",req.body);
  
  if(req.body.blogtitle != null && req.body.blogdescription != null && req.body.org_id != null  && req.body.userId != null  && req.body.from_date != null 
     && req.body.to_date != null ){
  var myobj = { title: req.body.blogtitle, description:req.body.blogdescription, content:req.body.blogcontent, photo:req.body.blogphoto,org_id:req.body.org_id,userId  :req.body.userId,from_date:req.body.from_date,to_date:req.body.to_date};
  
  Blog.create(myobj, function(err, blog) {
      if(err) { return handleError(res, err); }
      return res.status(200).json({ message: "Blog Added successfully" });
         
    });

  } else {
    return res.status(200).json({ message: "Fields Missing" }); 
  } 
};
//get blogs based on organization 
exports.getorgblogs = function(req,res,next){
  console.log("testinggggggggggg")
  var org_id = req.org_id;
  Blog.
      find({ org_id: req.params.org_id}).
      populate('org_id').
      exec(function (err, user) {
        if(err) return res.status(500).send(err);
        return res.status(200).json(user); 
        // prints "The author is Ian Fleming"
      });
}
exports.updateblogstatus = function(req,res,next){
  //console.log("77777",req.params);
  var id = req.params.id;
  var status = req.params.status;
// console.log(id);
// console.log(status);
  if (status == '0'){
    var status = 1;
  } else {
    var status = 0;
  }
  Blog.findOneAndUpdate({_id:req.params.id},
     {$set:{status:status}},
     {new:true}, function(err, blogstatus){
      return res.status(200).json(blogstatus); 
    if(err){
        console.log("Something wrong when updating data!");
    } 

});

}

// Updates an existing blog in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Blog.findById(req.params.id, function (err, blog) {
    if (err) { return handleError(res, err); }
    if(!blog) { return res.status(404).send('Not Found'); }
    var updated = _.merge(blog, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(blog);
    });
  });
};
//Delete Blog  
exports.deleteblog = (req, res)=>{
  console.log('555',req.body.id);
  var delstatus = 0;
  Blog.findByIdAndUpdate({_id:req.body.id}, {deletedStatus:delstatus}, {new:true},(err, result)=>{
    
    //require('../../app').socket.emit('gupdate:save', result);
    // return res.status(200).json(result);
    if(err) { return handleError(res, err); }
    return res.status(200).json({ message: "Blog Deleted successfully" });
    
  })
}
exports.getblog = function(req,res,next){
  var title = req.title;
  var id = req.id;
  var query = Blog.find({title:title,_id:req.id}).exec(function(err,result){
   
    if(err) return res.status(500).send(err);
   
    var data = result;
  });
  
}
//Blog Search
exports.blogsearch =  function(req, res) {
  var title = req.user.title;
  var regex = new RegExp(req.params["title"], 'i');
  var query = Blog.find({title:regex,deletedStatus:'1'}).exec(function(err,result){
   
    if(err) return res.status(500).send(err);
   
    var data = result;
  });

}
// Deletes a blog from the DB.
exports.destroy = function(req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if(err) { return handleError(res, err); }
    if(!blog) { return res.status(404).send('Not Found'); }
    blog.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}