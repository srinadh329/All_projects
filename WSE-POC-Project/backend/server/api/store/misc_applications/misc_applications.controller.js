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
exports.index = function(req, res) {
  client.query("SELECT appno,appname,status,crtdat,crtusr,appdtl2 FROM store.prdtxn where prdid=$1 and brnid=$2",[req.body.product,req.body.branchid], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(result.rows);
  });
};


exports.pendingapplications = function(req, res) {
  client.query("SELECT appno,appname,status,crtdat,crtusr,appdtl2 FROM store.prdtxn where prdid=$1 and status='C'",[req.body.product], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(result.rows);
  });
};



exports.getproducts = function(req, res) {
  client.query("select p.prdid,p.prdlnm from admin.prdmas p inner join admin.brnmas b on b.prdgrp= p.prdgrp  where brnid = $1",[req.params.branchid], function (err, result, fields) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(result.rows);
  });
};


exports.getchargesbyproducts = function(req, res) {
  client.query("select chgamt from admin.chgmas c  inner join admin.brnmas b on c.prdgrp= b.prdgrp where  b.brnid =$2::numeric and c.prdid =$1 AND c.status='A'  ",[req.body.product,req.body.branchid], function (err, result) {
    if(err) { 
    return handleError(res, err); }
    if(result.rows[0]==undefined){
      return res.status(200).json(0);
    }else{
      return res.status(200).json(result.rows[0].chgamt);
    }
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

/**
 * @api {post} /misc_applications create misc_applications record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName create
 * @apiGroup misc_applications
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created misc_applications.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.create = function(req, res) {
 req.body.recorddate = moment.utc().local().format('DD-MM-YYYY');
 req.body.recordtime=moment.utc().local().format('hh:mm:ss');
 req.body.userid = req.user.loginid;
  delete req.body.total
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM store.misc_insert('+fields+')',function(err, result) {
    if(err) {res.status(422).json({err:err.message}) }
    else     res.status(201).json({res:result.rows[0].misc_insert});
  });
};

exports.getremitancestatus = function(req, res) {
  if (req.body.productid==='rem'){
    var q =`SELECT * FROM store.prdtxn where (prdid= 'ID' OR prdid = 'TT'
    OR prdid = 'IC') and brnid =${req.body.branchid} order by ${req.body.order}  ${req.body.ordertype} `;
  }
  else if (req.body.productid==='FX') {
   var q = `SELECT distinct appno,bnfname,crtdat,crtusr,status FROM store.fxdtl where prdid='${req.body.productid}' and brnid=${req.body.branchid} order by ${req.body.order}  ${req.body.ordertype}`    
  }
  else  var q =`SELECT * FROM store.prdtxn where prdid='${req.body.productid}' and brnid =${req.body.branchid} order by ${req.body.order}  ${req.body.ordertype} `;
  client.query(q,  function (err, result, fields) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(result.rows);
  });
};

exports.getactiveproducts = function(req, res) {
  client.query("select p.status from admin.prdmas p inner join admin.brnmas b on b.prdgrp= p.prdgrp  where brnid =$1 and prdid=$2 and P.status='A' ", [req.body.branchid,req.body.product], function (err, result, fields) {
    if(err) { return handleError(res, err); }
  //  if(!result) { return res.status(200).send('Not Found'); }
    return res.status(200).json(result.rows[0]);
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
exports.authorize = function(req, res) {
  var vouchetype;
	if(req.body.productid=='NB')  vouchetype = '#NB';
	if(req.body.productid=='AA')  vouchetype  = '#AA';
	
  var obj={
    applicationno:req.body.applicationno,
    authstatus:req.body.authstatus,
    productid:req.body.productid,
    vouchernumber:vouchetype,
   authdate: req.body.recorddate = moment.utc().local().format('DD-MM-YYYY'),
   authtime: req.body.recordtime=moment.utc().local().format('hh:mm:ss'),
    authuser:req.body.userid = req.user.loginid
  }
  var { fields } = insertValues(obj)
  client.query('SELECT * FROM store.misc_auth('+fields+')',function(err, result) {
    if(err) {res.status(422).json({err:err.message}) }
    else     res.status(201).json({res:result.rows[0].misc_auth});
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


