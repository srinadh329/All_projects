'use strict';

var _ = require('lodash');
var Token = require('./token.model');
var User = require('../user/user.model');
var auth = require('../../auth/auth.service');



exports.auth = function(req, res){
	Token.findOne({uid: req.body.uid, deviceid: req.body.deviceid}, function(error, token){
		if (error) return res.status(401).json(error);
   		else if (!token) return res.status(404).json({message: 'Something went wrong, please try again.'});
		else{
			User.findById(req.body.uid, function (err, user) {
				if (error) return res.status(401).json(error);
				else{
					var token = auth.signToken(user._id, user.role);

					res.json({token: token,'role':user.role});
				}
			});

		}

	});
}
// Get list of tokens
exports.index = function(req, res) {
  Token.find(function (err, tokens) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(tokens);
  });
};

// Get a single token
exports.show = function(req, res) {
  Token.findById(req.params.id, function (err, token) {
    if(err) { return handleError(res, err); }
    if(!token) { return res.status(404).send('Not Found'); }
    return res.json(token);
  });
};

// Creates a new token in the DB.
exports.create = function(req, res) {
  req.body.uid = req.user._id;
  Token.findOne({deviceid: req.body.deviceid }, function (err, token) {
    if(!token){
	Token.create(req.body, function(err, token) {
	    if(err) { return handleError(res, err); }
	    return res.status(201).json(token);
	});
     }else{
	var data = {uid: req.body.uid }
	var updated = _.merge(token, req.body);
	    updated.save(function (err) {
	      if (err) { return handleError(res, err); }
	      return res.status(200).json(token);
	    });
	}
   });

};

// Updates an existing token in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Token.findById(req.params.id, function (err, token) {
    if (err) { return handleError(res, err); }
    if(!token) { return res.status(404).send('Not Found'); }
    var updated = _.merge(token, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(token);
    });
  });
};

// Deletes a token from the DB.
exports.destroy = function(req, res) {
  Token.findById(req.params.id, function (err, token) {
    if(err) { return handleError(res, err); }
    if(!token) { return res.status(404).send('Not Found'); }
    token.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}