/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';
var _ = require('lodash');
var client = require('../../../config/environment').client;
var moment = require('moment');

/**
 * @api {get} /misc_applications ALL misc_applications information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup misc_applications
 *
 * @apiSuccess {array} ALL_Fields Lists of the misc_applications.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of records
exports.dailyreportsbybranch = function(req, res) {
  const today = moment();
  let query =`SELECT t.appname,t.trnno,t.prdid,t.amount,t.charges,t.vat FROM store.prdtxn t inner join admin.brnmas b on b.brnid=t.brnid where t.brnid=${req.body.branchid} and t.status='A'  and  t.crtdat = '${moment(today).format('DD-MM-YYYY')}'`;
  client.query(query, function (err, result, fields) {
    if(err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};


exports.reportsbyproduct = function(req, res) {
  let query =`SELECT t.appname,t.trnno,t.prdid,t.amount,t.charges,t.vat,t.crtdat FROM store.prdtxn t inner join admin.brnmas b on b.brnid=t.brnid where t.brnid=${req.body.branchid} and t.status='A' and  t.prdid = '${req.body.productid}'`;
  if(req.body.fromdate && req.body.todate) query = query + ` and t.crtdat between '${moment(req.body.fromdate).format('DD-MM-YYYY')}'  and '${moment(req.body.todate).format('DD-MM-YYYY')}' `;
  else if(req.body.fromdate && !req.body.todate) query = query + ` and t.crtdat >= '${moment(req.body.fromdate).format('DD-MM-YYYY')}' `;
  client.query(query, function (err, result, fields) {
    if(err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};

exports.reportsbyuser = function(req, res) {
  let query =`SELECT t.appname,t.trnno,t.prdid,t.amount,t.charges,t.vat,t.crtdat FROM store.prdtxn t inner join admin.brnmas b on b.brnid=t.brnid where t.brnid=${req.body.branchid} and t.status='A' and t.gcmnumber = '${req.body.gcnumber}'`;
  if(req.body.fromdate && req.body.todate) query = query + ` and t.crtdat between '${moment(req.body.fromdate).format('DD-MM-YYYY')}'  and '${moment(req.body.todate).format('DD-MM-YYYY')}' `;
  else if(req.body.fromdate && !req.body.todate) query = query + ` and t.crtdat >= '${moment(req.body.fromdate).format('DD-MM-YYYY')}' `;
  client.query(query, function (err, result, fields) {
    if(err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /misc_applications/:id Request misc_applications information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName show
 * @apiGroup misc_applications
 *
 * @apiParam {Sring/Number} ccyid Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular misc_applications.
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


exports.branchgraphs = function(req, res) {
//  req.body.recordtime=moment.utc().local().format('hh:mm:ss');
var { fields } = insertValues(req.body)
client.query('SELECT * FROM store.dashboard_graphs('+fields+')',function(err, result) { 
   if(err) {res.status(422).json({err:err.message}) }
   return res.status(200).json(result.rows);
  });
};




/**
 * @api {put} /misc_applications/:id Update misc_applications record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup misc_applications
 * 
 * @apiParam {Sring/Number} ccyid Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated misc_applications.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.
exports.branchstatus = function(req, res) {
  req.params.currentdate = moment().format('DD-MM-YYYY');
  var { fields } = insertValues(req.params)
  client.query('SELECT * FROM store.dashboard_stats('+fields+')',function(err, result) {
    if (err) { return handleError(res, err); }
      return res.status(200).json(result.rows);
    });
};


exports.authorize = function(req, res) {
    client.query("UPDATE store.prdtxn SET status=$2 WHERE appno = $1", [req.params.id,req.body.authstatus], function(err, result) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(result.rows);
    });
};
/**
 * @api {put} /misc_applications/:id Update misc_applications record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup misc_applications
 * 
 * @apiParam {Sring/Number} ccyid Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated misc_applications.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.
exports.update = function(req, res) {
  req.body.recorddate=moment.utc().local().format('DD-MM-YYYY');
  req.body.recordtime=moment.utc().local().format('hh:mm:ss');
  req.body.userid = req.user.loginid;
   delete req.body.total
   delete req.body.applicantname
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM store.misc_update('+fields+')',function(err, result) {
    if(err) {res.status(422).json({err:err.message}) }
    else     res.status(201).json({res:result.rows[0].misc_update});
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


