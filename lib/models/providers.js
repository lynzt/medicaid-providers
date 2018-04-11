'use strict';
const db = require('./../helpers/database');
const self = module.exports;
const snake = require('to-snake-case');


exports.getProvidersByQuery = function(params) {
  if (params.length == 0) return [];
  const where = [];
  const sql_params = [];

  params.forEach((param, i) => {
    where.push(`${param.key} ${param.match} $${i+1}`);
    sql_params.push(param.match == '=' ? param.value : param.value + '%')
    // param.value == '=' ?
    // sql_params.push(param.value + '%')
  });

  const where_cause = where.join(', and ');
  console.dir (sql_params);
  console.log (`where_cause:`, where_cause);
  const sql_stmt = `select *
      from addresses a
      inner join provider_addresses pa on a.id = pa.address_id
      inner join providers p on p.id = pa.provider_id
      where ${where_cause} ;`
  console.log (`sql_stmt:`, sql_stmt);
  console.dir (sql_params);

  return db.query(sql_stmt, sql_params, db.qrm('any'));
}
