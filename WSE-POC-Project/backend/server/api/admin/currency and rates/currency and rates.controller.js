/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';

var _ = require('lodash');
var client = require('../../../config/environment').client;
var moment = require('moment');

/**
 * @api {get} /currency and rates ALL currency and ratess information
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName index
 * @apiGroup currency and rates
 *
 * @apiSuccess {array} ALL_Fields Lists of the currency and rates.
 * @apiError 500-InternalServerError SERVER error.
 */
// Get list of records
exports.getCurrenciesInGroup = function (req, res) {
  client.query(`SELECT * FROM ADMIN.CCYMAS WHERE CCYGID ='${req.params.groupid}'  ORDER BY CRTDAT DESC,CRTTIM DESC`, function (err, result, fields) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(result.rows);
  });
};
/**
 * @api {get} currencies for country adding
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName getCurrencies
 * @apiGroup currency and rates
 *
 * @apiSuccess {object} ALL_Fields Result of particular currencie.
 * @apiError  500-InternalServerError SERVER error.
 */
// Get a currencies for country add
exports.currenciesGetting = function (req, res) {
  client.query(`select DISTINCT ON(CCYID) * from ADMIN.CCYMAS WHERE STATUS='A'`, function (err, result) {
    if (err) {console.log(err); return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};
/**
 * @api {post} / create currency in the group.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName currencyMaintainance
 * @apiGroup currency and rates
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created currency and rates.
 * @apiError  500-InternalServerError SERVER error.
 */
// Creates new currency in the group.
exports.currencyMaintainance = function (req, res) {
  req.body.recorddate = moment.utc().local().format('DD-MM-YYYY');
  req.body.recordtime = moment.utc().local().format('hh:mm:ss');
  req.body.userid = req.user.loginid;
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM admin.currencymaintainance(' + fields + ')', function (err, result) {
    if (err) { res.status(422).json({ err: err.message }) }
    else res.status(201).json({ res: result.rows[0].currencymaintainance });
  });
};

/**
 * @api {post} / maintain rates.
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName ratesMaintainance
 * @apiGroup currency and rates
 * @apiParam {object} ALL_Fields ALL fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of created currency and rates.
 * @apiError  500-InternalServerError SERVER error.
 */
// To maintain rates.
exports.ratesMaintainance = function (req, res) {
  req.body.recorddate = moment.utc().local().format('DD-MM-YYYY');
  req.body.recordtime = moment.utc().local().format('hh:mm:ss');
  req.body.recuser = req.user.loginid;
  var { fields } = insertValues(req.body)
  client.query('SELECT * FROM admin.ratemaintainance(' + fields + ')', function (err, result) {
    if (err) {
      res.status(422).json({ err: err.message })
    }
    else res.status(201).json({ res: result.rows[0].ratemaintainance });
  });
};
/**
 * @api {get} currency rates list
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName getRates
 * @apiGroup currency and rates
 *
 * @apiSuccess {object} ALL_Fields Result of particular currencie.
 * @apiError  500-InternalServerError SERVER error.
 */
// Get a currencies rates
exports.getRates = function (req, res) {
  client.query(`select r.ccygrp,r.ccyid,r.status,cg.grpnam,cm.ccylnm,r.lowrat,r.higrat,r.ccyrat from admin.ratmas r
                join admin.ccygrp cg on r.ccygrp=cg.ccygid
                join admin.ccymas cm on cm.ccygid = r.ccygrp and cm.ccyid = r.ccyid
                ORDER BY r.CRTDAT DESC,r.CRTTIM DESC`, function (err, result) {
    if (err) {console.log(err); return handleError(res, err); }
    else res.status(200).json(result.rows);
  });
};

/**
 * @api {put} /currency and rates/:id Update currency and rates record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName update
 * @apiGroup currency and rates
 *
 * @apiParam {Sring/Number} ccyid Will send through the url parameter.
 * @apiParam {object} ALL_Fields Need to Update fields will send through the client server (update in future).
 * @apiSuccess {object} ALL_Fields Result of updated currency and rates.
 * @apiError 404-NoDataFound Not Found.
 * @apiError  500-InternalServerError SERVER error.
 */
// Updates an existing thing in the DB.
exports.update = function (req, res) {
  client.query("SELECT * FROM ccymas  WHERE ccyid = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if (result.rowCount == 0) { return res.status(404).send('Not Found'); }
    var post = equalValues(_.merge(result.rows[0], req.body));
    client.query("UPDATE ccymas SET " + post + " WHERE ccyid = $1", [req.params.id], function (err, result) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(result);
    });
  });
};
/**
 * @api {delete} /currency and rates/:id Delete currency and rates record
 * @apiHeader (Authorization) {String} authorization Bearer Authorization value will sent through headers.
 * @apiName destroy
 * @apiGroup currency and rates
 *
 * @apiParam {Sring/Number} ccyid Will send through the url parameter.
 * @apiSuccess {String} Deleted - NO Content.
 * @apiError 404-NoDataFound Not Found.
 *
 */
// Deletes a thing from the DB.
exports.destroy = function (req, res) {
  client.query("SELECT * FROM ccymas  WHERE ccyid = $1", [req.params.id], function (err, result, fields) {
    if (err) { return handleError(res, err); }
    if (result.rowCount == 0) { return res.status(404).send('Not Found'); }
    client.query("DELETE FROM ccymas WHERE ccyid = $1", [req.params.id], function (err, result) {
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


