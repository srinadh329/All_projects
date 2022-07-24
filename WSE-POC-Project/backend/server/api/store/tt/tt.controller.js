/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';

var _ = require('lodash');
var client = require('../../../config/environment').client;
var moment = require('moment');


/**
 * @api {get} /tt/:searchValue/:perPage/:page ALL tt information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName getttList
 * @apiGroup tt
 *
 * @apiParam {Sring/Number} Search Value Will send through the url parameter.
 * @apiParam {Number} perPage the number of records to be Fetched Will send through the url parameter.
 * @apiParam {Number} page Number Will send through the url parameter.
 * @apiSuccess {array} ALL_Fields Lists of the tt.
 * @apiError 404-Not Found.
 */

exports.getttList = function (req, res) {
  var start = (req.params.page - 1) * req.params.perPage;
  var searchValue = req.params.searchValue.toUpperCase().trim();
  var search = "SELECT * FROM store.prdtxn WHERE trnno LIKE  $1 LIMIT $2 OFFSET $3";
  client.query(search, ['%'+searchValue + '%', req.params.perPage, start], function (err, result) {
    if (err) res.status(404).json('Not Found');
    else  res.status(200).send(result.rows);
  });
};


/**
 * @api {get} /tt ALL tts information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup tt
 *
 * @apiSuccess {array} ALL_Fields Lists of the tt.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of records
exports.index = function(req, res) {
  client.query("SELECT * FROM store.prdtxn where prdid=$1",[req.body.productid], function (err, result, fields) {
    if(err) { return handleError(res, err); }
     res.status(200).json(result.rows);
  });
};


// Get list of created records
exports.createdapplications = function(req, res) {
  client.query("SELECT * FROM store.prdtxn where prdid=$1 and status='C'",[req.body.productid], function (err, result, fields) {
    if(err) { return handleError(res, err); }
     res.status(200).json(result.rows);
  });
};

/**
 * @api {get} /tt/creditbanks ALL Banks information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName getCreditBanks
 * @apiGroup tt
 *
 * @apiSuccess {array} ALL_Fields Lists of the tt.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get all credit banks
exports.getCreditBanks = function(req,res) {
  client.query("select bnknam as bankname from admin.bank where crddbt = 'C' ",function(err,result) {
    if(err) {
      return handleError(res,err); }
    res.status(200).json(result.rows);
  })
}
/**
 * @api {get} /tt/:id Request tt information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName show
 * @apiGroup tt
 *
 * @apiParam {Sring/Number} trnno Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular tt.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Get a single record
exports.show = function(req, res) {
  client.query("SELECT * FROM store.prdtxn where appno=$1", [req.params.id], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    return res.status(200).json(result.rows[0]);
  });
};

/**
 * @api {post} /tt/:countryid/:currencyid Request product based on currency & country
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName getProductBasedonCountry
 * @apiGroup tt
 *
 * @apiParam {Sring/Number} currency & country Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular Products.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */

// Get Product Based on Country and Currency
exports.getProductBasedonCountry = function(req,res) {
  var { fields } = insertValues(req.body);
  client.query('select * from store.chooseproduct('+fields+')',function(err,result){
    if(err) { 
      return res.status(422).json({err:err.message}); }
    // if(!result) { return res.status(401).send('Data Not Found'); }
    return res.status(200).json(result.rows[0]);
  });
}
/**
 * @api {post} /tt create tt record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName create
 * @apiGroup tt
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created tt.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.create = function(req, res) {
  delete req.body.lcamount
  var { fields } = insertValues(req.body);
  client.query('select * from store.create_tt_transaction('+fields+')',function(err, result) {
     if(err) {return res.status(422).json({err:err.message}); }
     return res.status(201).json({res:result.rows[0].create_tt_transaction});
  });
};

/**
 * @api {post} /authorize authorize tt record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName authorizeTT
 * @apiGroup tt
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of Authorize tt.
 * @apiError  500-InternalServerError SERVER error.
 */
// Authorize TT record
 exports.authorizeTT = function(req,res) {
   var { fields } = insertValues(req.body);
   client.query('select * from store.authorize_tt ('+fields+')',function(err,result){
    if(err) {res.status(422).json({err:err.message}); }
     else   res.status(201).json({res:result.rows[0].authorize_tt });
   })
 }

/**
 * @api {put} /tt/:id Update tt record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup tt
 * 
 * @apiParam {Sring/Number} trnno Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated tt.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.
exports.update = function(req, res) {
  client.query("SELECT * FROM store.prdtxn  WHERE trnno = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    var post = equalValues(_.merge(result.rows[0], req.body));
    client.query("UPDATE store.prdtxn SET "+post+" WHERE trnno = $1", [req.params.id], function(err, result) {
      if (err) { return handleError(res, err); }
       res.status(200).json(result);
    });
  });
};
/**
 * @api {delete} /tt/:id Delete tt record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName destroy
 * @apiGroup tt
 *
 * @apiParam {Sring/Number} trnno Will send through the url parameter.
 * @apiSuccess {String} Deleted - NO Content.
 * @apiError 404-NoDataFound Not Found.
 * 
 */
// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  client.query("SELECT * FROM store.prdtxn  WHERE trnno = $1", [req.params.id], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    client.query("DELETE FROM store.prdtxn WHERE trnno = $1", [req.params.id], function(err, result) {
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


