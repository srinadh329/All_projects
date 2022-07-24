/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';

var _ = require('lodash');
var client = require('../../../config/environment').client;
var moment = require('moment')
const crypto = require('crypto');

/**
 * @api {get} /To get all roles
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup usrmas
 *
 * @apiSuccess {array} ALL_Fields Lists of the usrmas.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of user roles
exports.getAllRoles = function (req, res) {
  client.query("SELECT * FROM admin.roles where roltyp<>'ADMIN' order by roleid", function (err, result) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};

/**
 * @api {get} /To get Active roles
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup usrmas
 *
 * @apiSuccess {array} ALL_Fields Lists of the usrmas.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of user roles
exports.getActiveRoles = function (req, res) {
  client.query(`SELECT * FROM admin.roles where status = 'A' and roltyp !='ADMIN'`, function (err, result) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {get} /usrmas/:id Request usrmas information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName show
 * @apiGroup usrmas
 *
 * @apiParam {Sring/Number} userid Will send through the url parameter.
 * @apiSuccess {object} ALL_Fields Result of particular usrmas.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Get a single record
exports.show = function (req, res) {
  client.query("SELECT * FROM WSLIVEMAS.USRMAS  WHERE userid = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if (!result) { return res.status(404).send('Not Found'); }
    return res.json(result);
  });
};
/**
 * @api {post} /To add branch.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName addBranch
 * @apiGroup usrmas
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created usrmas.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.addBranch = function (req, res) {
  req.body.recorddate = moment.utc().local().format('DD-MM-YYYY');
  req.body.recordtime = moment.utc().local().format('hh:mm:ss');
  req.body.userid = req.user.loginid;
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM admin.addbranch(' + fields + ')', function (err, result) {
    if (err) {console.log("eeeee",err), res.status(422).json({ err: err.message }) }
    else res.status(201).json({ res: result.rows[0].addbranch });
  });
};

/**
 * @api {get} /To get branch.
 * @apiName getBranch
 * @apiGroup usrmas
 *
 * @apiSuccess usrmas.
 * @apiParam
 * @apiError
 * */
exports.getBranch = function (req, res) {
  let query = `select b.*,c.cntnam,c.cntid,p.grpnam from admin.brnmas b 
  join admin.cntmas c on c.cntcod=b.brncnt
  join admin.prdgrp p on p.grpcod =b.prdgrp ORDER BY b.brnid desc`;
  client.query(query, function (err, result) {
    if (err) {res.status(422).json({ err: err.message }) }
    else res.status(201).json( result.rows);
  })
}
/**
 * @api {post} /To update branch details.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName updateBranch
 * @apiGroup usrmas
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created usrmas.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.updateBranch = function (req, res) {
  req.body.recorddate = moment.utc().local().format('DD-MM-YYYY');
  req.body.recordtime = moment.utc().local().format('hh:mm:ss');
  req.body.userid = req.user.loginid;
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM admin.updatebranchdetails(' + fields + ')', function (err, result) {
    if (err) {res.status(422).json({ err: err.message }) }
    else res.status(201).json({ res: result.rows[0].updatebranchdetails });
  });
};

/**
 * @api {post} /To maintain user roles.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName userRoleMaintainance
 * @apiGroup usrmas
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created usrmas.
 * @apiError  500-InternalServerError SERVER error.
 */
exports.userRoleMaintainance = function (req, res) {
  if (req.body.actiontype === 'A'){ req.body.userroleid = 0;}
  req.body.recorddate = moment.utc().local().format('DD-MM-YYYY');
  req.body.recordtime = moment.utc().local().format('hh:mm:ss');
  req.body.userid = req.user.loginid;
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM admin.userrolemaintainance(' + fields + ')', function (err, result) {
    if (err) {res.status(422).json({ err: err.message })}
    else res.status(201).json({ res: result.rows[0].userrolemaintainance });
  });
};
/**
 * @api {post} /To Mainatain branch users.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName branchUserMaintainance
 * @apiGroup usrmas
 *
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created usrmas.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates a new thing in the DB.
exports.branchUserMaintainance = async function (req, res) {
  let pass='';
  if (req.body.actiontype != 'U') {
     pass = await crypto.pbkdf2Sync(req.body.userpassword, 'salt', 10000, 64, 'sha512').toString('base64');
  }
  let values=[req.body.username,Number(req.body.branchid),req.body.userid,pass,Number(req.body.userrole),
    req.body.recstatus,req.body.actiontype,moment.utc().local().format('DD-MM-YYYY'),moment.utc().local().format('hh:mm:ss'),
    req.user.loginid.toUpperCase()];
  client.query('SELECT * FROM admin.branchusermaintainance($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',values,function (err, result) {
    if (err) {res.status(422).json({ err: err.message }) }
    else res.status(201).json({ res: result.rows[0].branchusermaintainance });
  });
};
/**
 * @api {get} /To get all branch users
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup usrmas
 *
 * @apiSuccess {array} ALL_Fields Lists of the usrmas.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of all branch users
exports.getBranchUsers = function (req, res) {
  client.query(`SELECT u.status,u.loginid,u.usrnam,r.roltyp,r.roleid FROM admin.usrmas U JOIN admin.roles r on u.usrole = r.roleid  where u.brnid =${Number(req.params.brnid)} order by u.crtdat desc,u.crttim desc`, function (err, result) {
    if (err) { return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};

/**
 * @api {put} /usrmas/:id Update usrmas record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup usrmas
 *
 * @apiParam {Sring/Number} userid Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated usrmas.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.
exports.update = function (req, res) {
  client.query("SELECT * FROM WSLIVEMAS.USRMAS  WHERE userid = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if (result.rowCount == 0) { return res.status(404).send('Not Found'); }
    var post = equalValues(_.merge(result.rows[0], req.body));
    client.query("UPDATE WSLIVEMAS.USRMAS SET " + post + " WHERE userid = $1", [req.params.id], function (err, result) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(result);
    });
  });
};
/**
 * @api {delete} /usrmas/:id Delete usrmas record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName destroy
 * @apiGroup usrmas
 *
 * @apiParam {Sring/Number} userid Will send through the url parameter.
 * @apiSuccess {String} Deleted - NO Content.
 * @apiError 404-NoDataFound Not Found.
 *
 */
// Deletes a thing from the DB.
exports.destroy = function (req, res) {
  client.query("SELECT * FROM WSLIVEMAS.USRMAS  WHERE userid = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if (result.rowCount == 0) { return res.status(404).send('Not Found'); }
    client.query("DELETE FROM WSLIVEMAS.USRMAS WHERE userid = $1", [req.params.id], function (err, result) {
      if (err) { return handleError(res, err); }
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

