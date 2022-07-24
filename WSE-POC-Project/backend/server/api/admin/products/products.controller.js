/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';

var _ = require('lodash');
var client = require('../../../config/environment').client;
var moment = require('moment');

/**
 * @api {get} /products Get list of Wse products
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup products
 *
 * @apiSuccess {array} ALL_Fields Lists of the products.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of wse products
exports.listOfProducts = function(req, res) {
  client.query("select * from ADMIN.prdlst WHERE STATUS='A'", function (err, result) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /products ALL productss information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup products
 *
 * @apiSuccess {array} ALL_Fields Lists of the products.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of records
exports.index = function(req, res) {
  client.query("select DISTINCT ON(PRDID) * from ADMIN.PRDMAS WHERE STATUS='A'", function (err, result) {
    if(err) {console.log(err); return handleError(res, err); }
    return res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /products/:id Request products information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName show
 * @apiGroup products
 *
 * @apiParam {Sring/Number} prdid Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular products.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Get a single record
exports.show = function(req, res) {
  let query = `SELECT P.*,C.grpnam FROM ADMIN.PRDMAS P JOIN ADMIN.CCYGRP C ON C.CCYGID = P.CCYGRP
   WHERE P.prdgrp='${req.params.groupid}' order by p.crtdat desc,p.crttim desc`;
  client.query(query, function (err, result) {
    if(err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {post} /products create products record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName create
 * @apiGroup products 
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created products.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.addProduct = function(req, res) {
  req.body.recorddate=moment.utc().local().format('DD-MM-YYYY');
  req.body.recordtime=moment.utc().local().format('hh:mm:ss');
  req.body.userid = req.user.loginid;
  var { fields } = insertValues(req.body);
 client.query('SELECT * FROM admin.productmaintainance('+fields+')',function(err, result) {
    if(err) { res.status(422).json({err:err.message}) }
    else res.status(201).json({res:result.rows[0].productmaintainance});
  });
};
/**
 * @api {post} /Country product maintainance.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName countryProduct
 * @apiGroup products
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created products.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.countryProduct = function(req, res) {
  req.body.countryid=Number(req.body.countryid)
  req.body.recorddate=moment.utc().local().format('DD-MM-YYYY');
  req.body.recordtime=moment.utc().local().format('hh:mm:ss');
  req.body.userid = req.user.loginid;
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM admin.countryproductmaintainance('+fields+')',function(err, result) {
    if(err) {res.status(422).json({err:err.message}) }
    else res.status(201).json({res:result.rows[0].countryproductmaintainance});
  });
};

/**
 * @api {get} /list of country products
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup products
 *
 * @apiSuccess {array} ALL_Fields Lists of the products.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of records
exports.cntprdlist = function(req, res) {
  client.query(`SELECT c.cntnam,c.cntid,c.cntcod,p.prdid,p.prdlnm,p.prdsnm,cp.prdgrp,pg.grpnam,cp.status FROM admin.cntprd cp 
  join admin.cntmas c on c.cntid=cp.cntid 
  join admin.prdlst p on p.prdid = cp.prdid
  join admin.prdgrp pg on pg.grpcod = cp.prdgrp
  order by cp.crtdat desc,cp.crttim desc`, function (err, result, fields) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(result.rows);
  });
};
/**
 * @api {put} /products/:id Update products record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup products
 *
 * @apiParam {Sring/Number} prdid Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated products.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.
exports.update = function(req, res) {
  client.query("SELECT * FROM prdmas  WHERE prdid = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    var post = equalValues(_.merge(result.rows[0], req.body));
    client.query("UPDATE prdmas SET "+post+" WHERE prdid = $1", [req.params.id], function(err, result) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(result);
    });
  });
};
/**
 * @api {delete} /products/:id Delete products record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName destroy
 * @apiGroup products
 *
 * @apiParam {Sring/Number} prdid Will send through the url parameter.
 * @apiSuccess {String} Deleted - NO Content.
 * @apiError 404-NoDataFound Not Found.
 *
 */
// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  client.query("SELECT * FROM prdmas  WHERE prdid = $1", [req.params.id], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    client.query("DELETE FROM prdmas WHERE prdid = $1", [req.params.id], function(err, result) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
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


