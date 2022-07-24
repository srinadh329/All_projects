/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';

var _ = require('lodash');
var client = require('../../../config/environment').client;
var moment = require('moment');


/**
 * @api {get} /fx/:searchValue/:perPage/:page ALL fx information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName getfxList
 * @apiGroup fx
 *
 * @apiParam {Sring/Number} Search Value Will send through the url parameter.
 * @apiParam {Number} perPage the number of records to be Fetched Will send through the url parameter.
 * @apiParam {Number} page Number Will send through the url parameter.
 * @apiSuccess {array} ALL_Fields Lists of the fx.
 * @apiError 404-Not Found.
 */

exports.getfxList = function (req, res) {
  var start = (req.params.page - 1) * req.params.perPage;
  var searchValue = req.params.searchValue.toUpperCase().trim();
  var search = "SELECT * FROM store.fxdtl WHERE trnno LIKE  $1 LIMIT $2 OFFSET $3";
  client.query(search, ['%'+searchValue + '%', req.params.perPage, start], function (err, result) {
    if (err) res.status(404).json('Not Found');
    else  res.status(200).send(result.rows);
  });
};


/**
 * @api {get} /fx ALL fxs information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup fx
 *
 * @apiSuccess {array} ALL_Fields Lists of the fx.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of records
exports.index = function(req, res) {
    client.query("SELECT distinct appno,bnfname,crtdat,crtusr,status FROM store.fxdtl where prdid=$1 and brnid=$2",
    [req.body.product,req.body.branchid], function (err, result) {
    if(err) { return handleError(res, err); }
     res.status(200).json(result.rows);
  });
};

/**
 * @api {get} /fx/:id Request fx information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName show
 * @apiGroup fx
 *
 * @apiParam {Sring/Number} trnno Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular fx.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Get a single record
exports.show = function(req, res) {
  client.query("SELECT * FROM store.fxdtl  WHERE appno = $1", [req.params.id], function (err, result) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
     res.status(200).json(result.rows);
  });
};
/**
 * @api {post} /fx create fx record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName create
 * @apiGroup fx
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created fx.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.create = function(req, res) {
  client.query('select * from store.fx_transaction($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)',
  [req.body.goldcardnumber,req.body.applicantname,req.body.applicantmobno,req.body.applicantadrress,req.body.country,
  req.body.accountno,req.body.bankname,req.body.benfname,req.body.benfmobileno,req.body.benfaddr,req.body.vat,
  req.body.charges,req.body.totalamount, req.body.fx,req.body.createdstatus,req.body.branchid,req.body.productid,
  req.body.createduser,req.body.createddate,req.body.createdtime],function(err, result) {
      if(err) {res.status(422).json({err:err.message}) }
      else res.status(201).json({res:result.rows[0].fx_transaction});
  });

};
/**
 * @api {post} /fx/authorreject Approve or Reject fx record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName approveTransaction
 * @apiGroup fx
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created fx.
 * @apiError  500-InternalServerError SERVER error.
 */

//Approve Transaction
exports.approveorrejectTransaction = function(req,res) {
  var { fields} =  insertValues(req.body);
  client.query('select * from store.fx_transaction_authorreject('+fields+')',function(err,result){
    if(err) {res.status(422).json({err:err.message}); }
    else res.status(201).json({res:result.rows[0].fx_transaction_authorreject});
  })
} 
/**
 * @api {put} /fx/:id Update fx record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup fx
 * 
 * @apiParam {Sring/Number} trnno Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated fx.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.
exports.update = function(req, res) {
  client.query("SELECT * FROM store.fxdtl  WHERE trnno = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    var post = equalValues(_.merge(result.rows[0], req.body));
    client.query("UPDATE store.fxdtl SET "+post+" WHERE trnno = $1", [req.params.id], function(err, result) {
      if (err) { return handleError(res, err); }
       res.status(200).json(result);
    });
  });
};
/**
 * @api {delete} /fx/:id Delete fx record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName destroy
 * @apiGroup fx
 *
 * @apiParam {Sring/Number} trnno Will send through the url parameter.
 * @apiSuccess {String} Deleted - NO Content.
 * @apiError 404-NoDataFound Not Found.
 * 
 */
// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  client.query("SELECT * FROM store.fxdtl  WHERE trnno = $1", [req.params.id], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    client.query("DELETE FROM store.fxdtl WHERE trnno = $1", [req.params.id], function(err, result) {
      if(err) { return handleError(res, err); }
       res.status(204).send('No Content');
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
    if(typeof obj[key] == 'string') values += "'"+obj[key].toUpperCase()+"',";
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
      if(['string'].indexOf(typeof obj[key]) > -1 ) values += "'"+obj[key].toUpperCase()+"',";
      else values += obj[key]+',';
    }
  });
  return values.slice(0, -1);
}

/*
Convert object to fields equal values to insert data
  obj: Object To Convert 
  String :- Object with fields equal values to insert data
*/

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


