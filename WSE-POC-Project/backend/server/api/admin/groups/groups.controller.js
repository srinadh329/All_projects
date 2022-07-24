/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';

var _ = require('lodash');
var client = require('../../../config/environment').client;
var moment = require('moment');

/**
 * @api {get} /To get currency groups
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName getCcyGroups
 * @apiGroup groups
 *
 * @apiSuccess {array} ALL_Fields Lists of the currency groups.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of Currency group records
exports.getCcyGroups = function(req, res) {
  client.query("SELECT * FROM ADMIN.CCYGRP ORDER BY CRTDAT DESC,CRTTIM DESC", function (err, result) {
    if(err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};

/**
 * @api {get} /To get product groups
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName getPrdGroups
 * @apiGroup groups
 *
 * @apiSuccess {array} ALL_Fields Lists of the currency groups.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of Currency group records
exports.getPrdGroups = function(req, res) {
  client.query("SELECT * FROM ADMIN.PRDGRP ORDER BY CRTDAT DESC,CRTTIM DESC", function (err, result) {
    if(err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /groups/:id Request groups information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName show
 * @apiGroup groups
 *
 * @apiParam {Sring/Number} grpid Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular groups.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Get a single record
exports.show = function(req, res) {
  client.query("SELECT * FROM prdgrp  WHERE grpid = $1  ORDER BY CRTDAT DESC,CRTTIM DESC", [req.params.id], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    return res.json(result);
  });
};
/**
 * @api {post} /groups create currency groups record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName currencyGroup
 * @apiGroup groups
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created groups.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.currencyGroup = function(req, res) {
  req.body.recorddate=moment.utc().local().format('DD-MM-YYYY');
  req.body.recordtime=moment.utc().local().format('hh:mm:ss');
    req.body.userid = req.user.loginid;
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM ADMIN.currencygroupmaintainance ('+fields+')',function(err, result) {
    if(err) { res.status(422).json({err:err.message}) }
    else res.status(201).json({res:result.rows[0].currencygroupmaintainance});
  });
};

/**
 * @api {post} /groups create product groups record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName productGroup
 * @apiGroup groups
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created groups.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.productGroup = function(req, res) {
  req.body.recorddate=moment.utc().local().format('DD-MM-YYYY');
  req.body.recordtime=moment.utc().local().format('hh:mm:ss');
  req.body.userid = req.user.loginid;
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM ADMIN.productgroupmaintainance ('+fields+')',function(err, result) {
    if(err) { res.status(422).json({err:err.message}) }
    else res.status(201).json({res:result.rows[0].productgroupmaintainance});
  });
};
/**
 * @api {put} /groups/:id Update groups record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup groups
 *
 * @apiParam {Sring/Number} grpid Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated groups.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.
exports.update = function(req, res) {
  client.query("SELECT * FROM prdgrp  WHERE grpid = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    var post = equalValues(_.merge(result.rows[0], req.body));
    client.query("UPDATE prdgrp SET "+post+" WHERE grpid = $1", [req.params.id], function(err, result) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(result);
    });
  });
};
/**
 * @api {delete} /groups/:id Delete groups record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName destroy
 * @apiGroup groups
 *
 * @apiParam {Sring/Number} grpid Will send through the url parameter.
 * @apiSuccess {String} Deleted - NO Content.
 * @apiError 404-NoDataFound Not Found.
 *
 */
// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  client.query("SELECT * FROM prdgrp  WHERE grpid = $1", [req.params.id], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    client.query("DELETE FROM prdgrp WHERE grpid = $1", [req.params.id], function(err, result) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

//TO INSERT VALUES
function insertValues(obj) {
  var fields = ' ';
  var values = ' ';
  Object.keys(obj).forEach(function (key) {
    values = '';
    fields += key + '=>';
    if (obj[key] == '' && obj[key] != 0) values = "' ',";
    else if (typeof obj[key] == 'string') values += "'" + obj[key].toUpperCase() + "',";
    else values += + obj[key] + ",";
    fields += values;
  });
  return { fields: fields.slice(0, -1) };
}
/*
Convert object to fields and values to insert data
  obj: Objact To Convert
  OutPut :- Object with fields and values
*/
function extratValues(obj){
  var fields = ' ';
  var values = ' ';
  Object.keys(obj).forEach(function(key) {
    fields += key+',';
    if(typeof obj[key] == 'string') values += "'"+obj[key]+"',";
    else values += obj[key]+',';
  });
  return {fields:fields.slice(0, -1), values: values.slice(0, -1) }
}

/*
Convert object to fields equal values to Update data
  obj: Objact To Convert
  String :- Object with fields equal values
*/
function equalValues(obj){
  var values = ' ';
  Object.keys(obj).forEach(function(key) {
    if(typeof obj[key] != 'object'){
      values += key+'=';
      if(['string'].indexOf(typeof obj[key]) > -1 ) values += "'"+obj[key]+"',";
      else values += obj[key]+',';
    }
  });
  return values.slice(0, -1);
}

//TO INSERT VALUES
function insertValues(obj) {
  var fields = ' ';
  var values = ' ';
  Object.keys(obj).forEach(function (key) {
    values = '';
    fields += key + '=>';
    if (obj[key] == '' && obj[key] != 0) values = "' ',";
    else if (typeof obj[key] == 'string') values += "'" + obj[key].toUpperCase() + "',";
    else values += + obj[key] + ",";
    fields += values;
  });
  return { fields: fields.slice(0, -1) };
}


