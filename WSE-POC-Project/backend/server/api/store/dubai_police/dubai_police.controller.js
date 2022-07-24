/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';
var _ = require('lodash');
var client = require('../../../config/environment').client;
var moment = require('moment');

/**
 * @api {get} /western_union ALL western_union information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup western_union
 *
 * @apiSuccess {array} ALL_Fields Lists of the western_union.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of records
exports.index = function(req, res) {
  if (req.body.searchtype===1){
    var sql = `SELECT * FROM store.dp_sampledata where    licenseno = '${req.body.licensenumber}'  and  licensesource ='${req.body.licensesource}'  and paid=false`
  }
  if (req.body.searchtype===2){
    var sql = `SELECT * FROM store.dp_sampledata where    plateno = '${req.body.platenumber}'  and  platesource ='${req.body.platesource}' and  finesource ='${req.body.finesource}'  and paid=false`
  }
  if (req.body.searchtype===3){
    var sql = `SELECT * FROM store.dp_sampledata where    traficfineno ='${req.body.trafficfilenumber}'   and paid=false`
  }
  client.query(sql, function (err, result, fields) {
    if(err) {return handleError(res, err); }
    return res.status(200).json(result.rows);
  });
};

/**
 * @api {get} /western_union/:id Request western_union information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName show
 * @apiGroup western_union
 *
 * @apiParam {Sring/Number} ccyid Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular western_union.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Get a single record
exports.show = function(req, res) {
  client.query("SELECT * FROM store.prdtxn a inner join store.dp_sampledata b on a.appno=b.txn_id  where appno=$1", [req.params.id], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    return res.status(200).json(result.rows);
  });
};


/**
 * @api {put} /western_union/:id Update western_union record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup western_union
 * 
 * @apiParam {Sring/Number} ccyid Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated western_union.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.

exports.authorize = function(req, res) {
  delete req.body.nooffees
  delete req.body.fineamount
  delete req.body.total
  delete req.body.Penalty 
  req.body.recorddate = moment.utc().local().format('DD-MM-YYYY');
  req.body.recordtime=moment.utc().local().format('hh:mm:ss');
  req.body.userid = req.user.loginid;
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM store.dp_payfine('+fields+')',function(err, result) {    
      if (err) {  res.status(422).json({err:err.message}) }
      else     res.status(201).json({res:result.rows[0].dp_payfine});
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


