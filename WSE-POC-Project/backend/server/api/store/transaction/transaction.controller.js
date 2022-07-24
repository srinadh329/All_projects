/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';

var _ = require('lodash');
var client = require('../../../config/environment').client;
var moment = require('moment');


/**
 * @api {get} /transaction/:searchValue/:perPage/:page ALL transaction information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName gettransactionList
 * @apiGroup transaction
 *
 * @apiParam {Sring/Number} Search Value Will send through the url parameter.
 * @apiParam {Number} perPage the number of records to be Fetched Will send through the url parameter.
 * @apiParam {Number} page Number Will send through the url parameter.
 * @apiSuccess {array} ALL_Fields Lists of the transaction.
 * @apiError 404-Not Found.
 */

exports.gettransactionList = function (req, res) {
  var start = (req.params.page - 1) * req.params.perPage;
  var searchValue = req.params.searchValue.toUpperCase().trim();
  var search = "SELECT * FROM store.prdtxn WHERE appno LIKE  $1 LIMIT $2 OFFSET $3";
  client.query(search, ['%'+searchValue + '%', req.params.perPage, start], function (err, result) {
    if (err) res.status(404).json('Not Found');
    else  res.status(200).send(result.rows);
  });
};


/**
 * @api {get} /transaction ALL transactions information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup transaction
 *
 * @apiSuccess {array} ALL_Fields Lists of the transaction.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of records
exports.index = function(req, res) {
  client.query(`SELECT * FROM store.prdtxn where (prdid= 'ID' OR prdid = 'TT'
                OR prdid = 'IC') and brnid = $1   order by appno desc `,[req.params.branchid],
                function (err, result, fields) {
    if(err) { return handleError(res, err); }
     res.status(200).json(result.rows);
  });
};

/**
 * @api {get} /transaction/getBanks Get List of Banks
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName getBanks
 * @apiGroup transaction
 *
 * @apiSuccess {array} ALL_Fields List of the Banks.
 * @apiError 500-InternalServerError SERVER error.
 */
exports.getBanks = function(req,res) {
  client.query("select bnknam from admin.bank", function (err,result) {
    if(err) {
      return handleError (res,err);}
      res.status(200).json(result.rows);
  })
}



/**
 * @api {get} /transaction/:id Request transaction information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName show
 * @apiGroup transaction
 *
 * @apiParam {Sring/Number} appno Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular transaction.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Get a single record
exports.show = function(req, res) {
  client.query("SELECT * FROM store.prdtxn  WHERE appno = $1", [req.params.id], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
     res.json(result.rows[0]);
  });
};

exports.getCurrencyRatesBasedONProducts = function(req,res) {
  var { fields } = insertValues(req.params);
    client.query('select * from store.getcurrencyrates('+fields+')',function(err,result) {
    if(err)  {
      return res.status(422).json({err:err.message});}
    if(!result) {return res.status(404).send('Data not found'); }
       res.status(200).json(result.rows);
  })
}
/**
 * @api {get} /transaction/:ccyid/:cntid/:accno Request transaction Bank information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName getBankName
 * @apiGroup transaction
 *
 * @apiParam {Sring/Number} appno Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular transaction.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// exports.getBankName = function(req,res) {
//   console.log(req.params,"bank");
//   client.query(`select bnknam as bankname,accbal as Avlbalance from admin.bank a inner join admin.ccymas 
//                 b on a.ccygrp = b.ccygid where b.ccyid = $1 AND a.cntid = $2 AND a.accno = $3`,
//                     [req.params.ccyid,req.params.cntid,req.params.accno],
//                     function(err,result){
//                       if(err) {console.log(err,"error");return handleError(res,err);}
//                       if(!result) { return res.status(404).send('Not Found'); }
//                       res.json(result.rows);
//                     });
// s

exports.checkaccno = function (req, res) {
  client.query("SELECT * FROM admin.bank  WHERE accno ILIKE $1",[req.params.id], function (err, result, fields) {
    if (err) { 
      return handleError(res, err); }
    if (!result) { return res.status(404).send('Not Found'); }
    return res.json(result.rows[0]);
  });
};

/**
 * @api {post} /transaction create transaction record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName create
 * @apiGroup transaction
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created transaction.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.create = function(req, res) {
  delete req.body.lcamount;
  var { fields } = insertValues(req.body);
  client.query('select * from store.create_trans('+fields+')',function(err, result) {
    if(err) {res.status(422).json({err:err.message}); }
     else res.status(201).json({res:result.rows[0].create_trans});
  });
};

/**
 * @api {post} /approve_transaction update transaction record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName approvetransaction
 * @apiGroup transaction
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created transaction.
 * @apiError  500-InternalServerError SERVER error.
 */

// Approve the transaction
exports.approvetransaction = function(req,res) {
  var { fields }  = insertValues(req.body);
  client.query('select * from store.approve_transaction('+fields+')',function(err,result) {
    if(err) { return res.status(422).json({err:err.message}); }
    else res.status(201).json({res:result.rows[0].approve_transaction});
  });
}

/**
 * @api {post} /reject/transaction update transaction record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName rejecttransaction
 * @apiGroup transaction
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created transaction.
 * @apiError  500-InternalServerError SERVER error.
 */
//Reject the transaction
exports.rejecttransaction = function(req,res) {
  var { fields }  = insertValues(req.body);
  client.query('select * from store.reject_transaction('+fields+')',function(err,result) {
    if(err) {
      return res.status(422).json({err:err.message}); }
    else res.status(201).json({res:result.rows[0].reject_transaction});
  });
}

/**
 * @api {put} /transaction/:id Update transaction record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup transaction
 * 
 * @apiParam {Sring/Number} appno Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated transaction.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.
exports.update = function(req, res) {
  client.query("SELECT * FROM store.prdtxn  WHERE appno = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    var post = equalValues(_.merge(result.rows[0], req.body));
    client.query("UPDATE store.prdtxn SET "+post+" WHERE appno = $1", [req.params.id], function(err, result) {
      if (err) { return handleError(res, err); }
       res.status(200).json(result);
    });
  });
};
/**
 * @api {delete} /transaction/:id Delete transaction record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName destroy
 * @apiGroup transaction
 *
 * @apiParam {Sring/Number} appno Will send through the url parameter.
 * @apiSuccess {String} Deleted - NO Content.
 * @apiError 404-NoDataFound Not Found.
 * 
 */
// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  client.query("SELECT * FROM store.prdtxn  WHERE appno = $1", [req.params.id], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    if(result.rowCount == 0) { return res.status(404).send('Not Found'); }
    client.query("DELETE FROM store.prdtxn WHERE appno = $1", [req.params.id], function(err, result) {
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
    else if (typeof obj[key] == 'string') values += "'" + obj[key].toUpperCase()+"',";
    else values += + obj[key] + ",";
    fields += values;
  });
  return { fields: fields.slice(0, -1) };
}


