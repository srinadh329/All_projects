'use strict';

var _ = require('lodash');
var Faqs = require('./faqs.model');

// Get list of faqss
exports.index = function(req, res) {
  Faqs.find(function (err, faqss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(faqss);
  });
};

// Get a single faqs
exports.show = function(req, res) {
  
  Faqs.findById(req.params.id, function (err, faqs) {
    if(err) { return handleError(res, err); }
    if(!faqs) { return res.status(404).send('Not Found'); }
    return res.json(faqs);
  });
};

// Creates a new faqs in the DB.
exports.create = function(req, res) {
  var obj = { question: req.body.question,answer:req.body.answer,status:req.body.status,created_by:req.body.created_by};
  Faqs.create(obj, function(err, faqs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json({ message: "Inserted successfully" });
    //return res.status(201).json(faqs);
  });
};

// Updates an existing faqs in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Faqs.findById(req.params.id, function (err, faqs) {
    if (err) { return handleError(res, err); }
    if(!faqs) { return res.status(404).send('Not Found'); }
    var updated = _.merge(faqs, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      // return res.status(200).json(faqs);
      return res.status(200).json({ message: "updated successfully" });
    });
  });
};

// Deletes a faqs from the DB.
exports.destroy = function(req, res) {
  Faqs.findById(req.params.id, function (err, faqs) {
    if(err) { return handleError(res, err); }
    if(!faqs) { return res.status(404).send('Not Found'); }
    faqs.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}