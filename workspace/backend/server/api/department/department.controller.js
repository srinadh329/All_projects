'use strict';

var _ = require('lodash');
var Department = require('./department.model');

// Get list of departments
exports.index = function(req, res) {
  Department.find({$and:[{$or:[{organizationid:req.user._id},{organizationid:req.user.organizationid}]},{active:true}]}).populate('organizationid').populate('parentdepartmentid').exec(function (err, department) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(department);
  });
};
// Get list of departments

exports.departmentslist = function(req, res) {
  Department.find({$and:[{organizationid:req.user.organizationid},{active:true}]}).populate('organizationid').populate('parentdepartmentid').exec(function (err, department) {
    if(err) { return handleError(res, err); }
    console.log(res.json(department))
    return res.status(200).json(department);
  });
};

exports.searchdepartment = function(req, res) {
  Department.find({$and:[{deptname: {$regex:req.body.search, $options: 'i'}},{organizationid:req.user._id},{active:true}]}).populate('organizationid').populate('parentdepartmentid').exec(function (err, department) {
    if(err) {  return handleError(res, err); }
    return res.status(200).json(department);
  });
};

// Get a single department
exports.show = function(req, res) {
  Department.findById(req.params.id, function (err, department) {
    if(err) { return handleError(res, err); }
    if(!department) { return res.status(404).send('Not Found'); }
    return res.json(department);
  });
};

// Creates a new department in the DB.
exports.create = function(req, res) {
  req.body.organizationid=req.user.id
  Department.create(req.body, function(err, department) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(department);
  });
};

// Updates an existing department in the DB.

exports.update = function(req, res) {
  console.log('hhhgg')
  if(req.body._id) { delete req.body._id; }
  Department.findById(req.params.id, function (err, department) {
    console.log(department)

    if (err) { return handleError(res, err); }
    if(!department) { return res.status(404).send('Not Found'); }
    var updated = _.merge(department, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }

      console.log(department)
      return res.status(200).json(department);
    });
  });
};


// Deletes a department from the DB.
exports.destroy = function(req, res) {
  Department.findById(req.params.id, function (err, department) {
    if(err) { return handleError(res, err); }
    if(!department) { return res.status(404).send('Not Found'); }
    department.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};



exports.checkdepartments = function (req, res) {

  if (req.body.type == 'department') var q = { deptname: req.body.value ,organizationid:req.user.id,active:true};
  console.log(q);
  Department.findOne(q, function (err, department) {
    console.log(req.body.value)
    console.log(department)
    if (err) return next(err);
    if (!department) return res.status(200).send({ "data": false });
    else return res.status(200).send({ "data": true });
  });

}



function handleError(res, err) {
  return res.status(500).send(err);
}