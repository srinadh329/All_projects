/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';

var _ = require('lodash');
var client = require('../../../config/environment').client;
var moment = require('moment');

/**
 * @api {get} /goldcard ALL goldcards information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup goldcard
 *
 * @apiSuccess {array} ALL_Fields Lists of the goldcard.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of records
exports.index = function(req, res) {
  client.query("SELECT * FROM admin.gcmas order by crtdat desc,crttim desc", function (err, result) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /goldcard/:id Request goldcard information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName show
 * @apiGroup goldcard
 *
 * @apiParam {Sring/Number} gcmnumber Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular goldcard.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Get a single record
exports.show = function(req, res) {
  client.query("SELECT * FROM admin.gcmas  WHERE gcmnumber = $1", [req.params.id], function (err, result, fields) {
    if(err) {console.log(err,"goldcard");return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    return res.json(result.rows[0]);
  });
};
/**
 * @api {post} /To create or update gold card.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName goldCardMaintainance
 * @apiGroup goldcard
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created goldcard.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new gold card or update gold card details in the DB.
exports.goldCardMaintainance = function(req, res) {
  if(req.body.actiontype==='A') req.body.cardnumber='0';
  req.body.recdate=moment.utc().local().format('DD-MM-YYYY');
  req.body.rectime=moment.utc().local().format('hh:mm:ss');
  req.body.branchcode = Number(req.body.branchcode);
  req.body.countrycode = Number(req.body.countrycode);
  req.body.recuser = req.user.loginid;
  console.log(req.body)
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM admin.goldcardmaintainance('+fields+')',function(err, result) {
    if(err) {console.log(err); res.status(422).json({err:err.message}) }
    else res.status(201).json({res:result.rows[0].goldcardmaintainance});
  });
};
/**
 * @api {put} /goldcard/:id Update goldcard record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup goldcard
 *
 * @apiParam {Sring/Number} gcmnumber Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated goldcard.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.
exports.update = function(req, res) {
  client.query("SELECT * FROM gcmas  WHERE gcmnumber = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    var post = equalValues(_.merge(result.rows[0], req.body));
    client.query("UPDATE gcmas SET "+post+" WHERE gcmnumber = $1", [req.params.id], function(err, result) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(result);
    });
  });
};
/**
 * @api {delete} /goldcard/:id Delete goldcard record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName destroy
 * @apiGroup goldcard
 *
 * @apiParam {Sring/Number} gcmnumber Will send through the url parameter.
 * @apiSuccess {String} Deleted - NO Content.
 * @apiError 404-NoDataFound Not Found.
 *
 */
// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  client.query("SELECT * FROM gcmas  WHERE gcmnumber = $1", [req.params.id], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    client.query("DELETE FROM gcmas WHERE gcmnumber = $1", [req.params.id], function(err, result) {
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


