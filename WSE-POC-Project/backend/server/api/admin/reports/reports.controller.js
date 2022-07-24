/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';

var _ = require('lodash');
var client = require('../../../config/environment').client;
var moment = require('moment');

/**
 * @api {post} /reports ALL online users reportss information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName onlineUsers
 * @apiGroup reports
 *
 * @apiSuccess {array} ALL_Fields Lists of the reports.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of online users records
exports.onlineUsers = function (req, res) {
  let query = 'select country,crtdate,email,isactive,usrname,phonenumber,usrid,crttime,currency from onlineuser.users';
  if (req.body.status === 'ACTIVE') query = query + ` where isactive = '1'`;
  else if (req.body.status === 'INACTIVE') query = query + ` where isactive <> '1'`;
  client.query(query, function (err, result, fields) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {post} /reports ALL Branch users reports information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName allBranchUsers
 * @apiGroup reports
 *
 * @apiSuccess {array} ALL_Fields Lists of the reports.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of online users records
exports.allBranchUsers = function (req, res) {
  let query = `SELECT u.status,u.loginid,u.usrnam,r.roltyp,r.roleid,u.crtdat FROM admin.usrmas U JOIN admin.roles r on u.usrole = r.roleid where r.roltyp <> 'ADMIN'`;
  if (req.body.status === 'ACTIVE') query = query + ` and u.status = 'A'`;
  else if (req.body.status === 'INACTIVE') query = query + ` and u.status <> 'A'`;
  client.query(query, function (err, result, fields) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {post} /reports ALL Branch users reports information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName branchWiseTransactions
 * @apiGroup reports
 *
 * @apiSuccess {array} ALL_Fields Lists of the reports.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of online users records
exports.branchWiseTransactions = function (req, res) {
  let query = `SELECT t.appno,t.brnid,t.appname,t.appmobno,t.prdid,t.amount,t.charges,b.brnnam,t.crtdat FROM store.prdtxn t join admin.brnmas b on b.brnid=t.brnid where t.brnid=${req.body.brnid}`;
  if (req.body.fromDate && req.body.toDate) query = query + ` and t.crtdat between '${moment(req.body.fromDate).format('DD-MM-YYYY')}' and '${moment(req.body.toDate).format('DD-MM-YYYY')}'`;
  else if (req.body.fromDate && !req.body.toDate) query = query + ` and t.crtdat >= '${moment(req.body.fromDate).format('DD-MM-YYYY')}'`;
  client.query(query, function (err, result) {
    if (err) { console.log(err); return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {post} /reports ALL Branch users reports information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName productWiseTransactions
 * @apiGroup reports
 *
 * @apiSuccess {array} ALL_Fields Lists of the reports.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of online users records
exports.productWiseTransactions = function (req, res) {
  let query = `SELECT t.appno,t.appname,t.appmobno,t.prdid,t.amount,t.charges,p.prdlnm,t.crtdat,t.brnid FROM store.prdtxn t join admin.prdlst p on p.prdid=t.prdid where t.prdid='${req.body.prdid}'`;
  if (req.body.fromDate && req.body.toDate) query = query + ` and t.crtdat between '${moment(req.body.fromDate).format('DD-MM-YYYY')}' and '${moment(req.body.toDate).format('DD-MM-YYYY')}'`;
  else if (req.body.fromDate && !req.body.toDate) query = query + ` and t.crtdat >= '${moment(req.body.fromDate).format('DD-MM-YYYY')}'`;
  client.query(query, function (err, result) {
    if (err) { console.log(err); return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {post} /reports ALL Branch users reports information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName branchUserWiseTransactionsReports
 * @apiGroup reports
 *
 * @apiSuccess {array} ALL_Fields Lists of the reports.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of online users records
exports.branchUserWiseTransactionsReports = function(req, res) {
  let query =`SELECT appno,appname,appmobno,prdid,amount,charges,crtdat,brnid FROM store.prdtxn where brnid=${req.body.brnid} and crtusr='${req.body.userid}'`;
  if(req.body.fromDate && req.body.toDate) query = query + ` and crtdat between '${moment(req.body.fromDate).format('DD-MM-YYYY')}' and '${moment(req.body.toDate).format('DD-MM-YYYY')}'`;
  else if(req.body.fromDate && !req.body.toDate) query = query + ` and crtdat >= '${moment(req.body.fromDate).format('DD-MM-YYYY')}'`;
  client.query(query, function (err, result) {
    if (err) { console.log(err); return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /dash board branch wise transaction count
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName branchTransDashBorad
 * @apiGroup reports
 *
 * @apiParam {Sring/Number} id Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular reports.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// To Get branch wise transaction count
exports.branchTransDashBoard = function (req, res) {
  let query = 'select count(*) as trans,t.brnid,b.brnnam from store.prdtxn t join admin.brnmas b on b.brnid = t.brnid  group by t.brnid,b.brnnam';
  client.query(query, function (err, result) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};

/**
 * @api {get} /dash board product wise transaction count
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName productTransDashBorad
 * @apiGroup reports
 *
 * @apiParam {Sring/Number} id Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular reports.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// To Get product wise transaction count
exports.productTransDashBoard = function (req, res) {
  let query = 'select count(*) as trans,t.prdid,p.prdlnm from store.prdtxn t join admin.prdmas p on p.prdid = t.prdid group by t.prdid,p.prdlnm';
  client.query(query, function (err, result) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /dash board goldcards count
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName goldCardsCount
 * @apiGroup reports
 *
 * @apiParam {Sring/Number} id Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular reports.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// To Get gold cards count
exports.goldCardsCount = function (req, res) {
  let query = 'select count(*) as goldcards from admin.gcmas';
  client.query(query, function (err, result) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /dash board online users count
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName onlineUsersCount
 * @apiGroup reports
 *
 * @apiParam {Sring/Number} id Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular reports.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// To Get online users count
exports.onlineUsersCount = function (req, res) {
  let query = 'select count(*) as onlineuserscount from onlineuser.users';
  client.query(query, function (err, result) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /dash board branch users count
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName branchUsersCount
 * @apiGroup reports
 *
 * @apiParam {Sring/Number} id Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular reports.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// To Get branch users count
exports.branchUsersCount = function (req, res) {
  let query = 'select count(*) as branchusers from admin.usrmas where brnid>0  ';
  client.query(query, function (err, result) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /dash board branches count
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName totalBranchesCount
 * @apiGroup reports
 *
 * @apiParam {Sring/Number} id Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular reports.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// To Get branches count
exports.totalBranchesCount = function (req, res) {
  let query = 'select count(*) as branches from admin.brnmas';
  client.query(query, function (err, result) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /dash board total transactions count
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName transactionsCount
 * @apiGroup reports
 *
 * @apiParam {Sring/Number} id Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular reports.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// To Get Transactions count
exports.transactionsCount = function (req, res) {
  client.query('select count(*) as brntrans from store.prdtxn', function (err, result) {
    if (err) { return handleError(res, err); }
    else {
      client.query('select count(*) as onlinetrans from onlineuser.transactions', (err, result1) => {
        if (err) { return handleError(res, err); }
        else {
          let response = [{ totalTransactions: Number(result.rows[0].brntrans) + Number(result1.rows[0].onlinetrans) }]
          res.status(200).json(response);
        }
      })
    }

  });
};
/**
 * @api {get} /dash board top 10 goldcard transactions count
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName topRatedCustomers
 * @apiGroup reports
 *
 * @apiParam {Sring/Number} id Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular reports.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// To Get top 10 goldcard transactions count
exports.topRatedCustomers = function (req, res) {
  let query = `select count(*) as transactions,t.gcmnumber as goldcard,g.gcmcname as cusname from store.prdtxn t join admin.gcmas g on g.gcmnumber=t.gcmnumber
  where t.gcmnumber <> '' group by t.gcmnumber,g.gcmcname order by transactions desc limit 10`;
  client.query(query, function (err, result) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /dash board To get branch userwise transactions count
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName branchUserWiseTransactions
 * @apiGroup reports
 *
 * @apiParam {Sring/Number} id Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular reports.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// To get branch userwise transactions count
exports.branchUserWiseTransactions = function (req, res) {
  let query = `select count(*) as trans,t.crtusr,u.usrnam,u.brnid from store.prdtxn t join admin.usrmas u on t.crtusr = u.loginid group by t.crtusr,u.usrnam,u.brnid`;
  client.query(query, function (err, result) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};

/**
 * @api {get} /reports/:id Request reports information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName show
 * @apiGroup reports
 *
 * @apiParam {Sring/Number} id Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular reports.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Get a single record
exports.show = function (req, res) {
  client.query("SELECT * FROM reports  WHERE id = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if (!result) { return res.status(404).send('Not Found'); }
    return res.json(result);
  });
};
/**
 * @api {post} /reports create reports record.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName create
 * @apiGroup reports
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created reports.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.create = function (req, res) {
  var { fields, values } = extratValues(req.body)
  client.query('INSERT INTO reports (' + fields + ') values (' + values + ') RETURNING *', function (err, result) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(result);
  });
};
/**
 * @api {put} /reports/:id Update reports record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup reports
 * 
 * @apiParam {Sring/Number} id Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated reports.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.
exports.update = function (req, res) {
  client.query("SELECT * FROM reports  WHERE id = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if (result.rowCount == 0) { return res.status(404).send('Not Found'); }
    var post = equalValues(_.merge(result.rows[0], req.body));
    client.query("UPDATE reports SET " + post + " WHERE id = $1", [req.params.id], function (err, result) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(result);
    });
  });
};
/**
 * @api {delete} /reports/:id Delete reports record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName destroy
 * @apiGroup reports
 *
 * @apiParam {Sring/Number} id Will send through the url parameter.
 * @apiSuccess {String} Deleted - NO Content.
 * @apiError 404-NoDataFound Not Found.
 * 
 */
// Deletes a thing from the DB.
exports.destroy = function (req, res) {
  client.query("SELECT * FROM reports  WHERE id = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if (result.rowCount == 0) { return res.status(404).send('Not Found'); }
    client.query("DELETE FROM reports WHERE id = $1", [req.params.id], function (err, result) {
      if (err) { return handleError(res, err); }
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
function extratValues(obj) {
  var fields = ' ';
  var values = ' ';
  Object.keys(obj).forEach(function (key) {
    fields += key + ',';
    if (typeof obj[key] == 'string') values += "'" + obj[key] + "',";
    else values += obj[key] + ',';
  });
  return { fields: fields.slice(0, -1), values: values.slice(0, -1) }
}

/*
Convert object to fields equal values to Update data
  obj: Objact To Convert 
  String :- Object with fields equal values
*/
function equalValues(obj) {
  var values = ' ';
  Object.keys(obj).forEach(function (key) {
    if (typeof obj[key] != 'object') {
      values += key + '=';
      if (['string'].indexOf(typeof obj[key]) > -1) values += "'" + obj[key] + "',";
      else values += obj[key] + ',';
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


