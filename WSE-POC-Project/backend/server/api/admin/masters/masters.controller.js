/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';

var _ = require('lodash');
var client = require('../../../config/environment').client;
var moment = require('moment');

/**
 * @api {get} /masters ALL masterss information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup masters
 *
 * @apiSuccess {array} ALL_Fields Lists of the masters.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of countries
exports.index = function(req, res) {
  let query ='';
  if(req.user.roltyp==='ADMIN') query = `SELECT * FROM admin.cntmas order by crtdat desc,crttim desc`;
  else query = `SELECT * FROM admin.cntmas where status ='A' order by crtdat desc,crttim desc`;
  client.query(query, function (err, result) {
    if(err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /masters/:id Request masters information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName show
 * @apiGroup masters
 *
 * @apiParam {Sring/Number} cntid Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular masters.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Get a single record
exports.show = function(req, res) {
  client.query("SELECT * FROM cntmas  WHERE cntid = $1", [req.params.id], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    return res.json(result);
  });
};
/**
 * @api {post} /masters create masters record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName create
 * @apiGroup masters
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created masters.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.countryMaintainance = function(req, res) {
  req.body.recorddate=moment.utc().local().format('DD-MM-YYYY');
  req.body.recordtime=moment.utc().local().format('hh:mm:ss');
  req.body.userid = req.user.loginid;
  // req.body.actiontype="A"
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM admin.countrymaintainance('+fields+')',function(err, result) {
    if(err) { res.status(422).json({err:err.message}) }
    else res.status(201).json({res:result.rows[0].countrymaintainance});
  });
};
/**
 * @api {put} /masters/:id Update masters record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup masters
 *
 * @apiParam {Sring/Number} cntid Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated masters.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.
exports.update = function(req, res) {
  client.query("SELECT * FROM cntmas  WHERE cntid = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    var post = equalValues(_.merge(result.rows[0], req.body));
    client.query("UPDATE cntmas SET "+post+" WHERE cntid = $1", [req.params.id], function(err, result) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(result);
    });
  });
};
/**
 * @api {delete} /masters/:id Delete masters record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName destroy
 * @apiGroup masters
 *
 * @apiParam {Sring/Number} cntid Will send through the url parameter.
 * @apiSuccess {String} Deleted - NO Content.
 * @apiError 404-NoDataFound Not Found.
 *
 */
// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  client.query("SELECT * FROM cntmas  WHERE cntid = $1", [req.params.id], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    client.query("DELETE FROM cntmas WHERE cntid = $1", [req.params.id], function(err, result) {
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


