var self = module.exports;

var promise = require('bluebird');
var options = {
    promiseLib: promise
};
var pgp = require('pg-promise')(options);

pgp.pg.defaults.ssl = true;

var db = pgp(process.env.DATABASE_URL);

exports.query = function(sql_str, params, qrm) {
  if (qrm) {
    return db.query(sql_str, params, qrm);
  } else {
    return db.query(sql_str, params);
  }
}

exports.queryTransaction = function(options) {
  var queries = [];
  return db.tx(function (t) {
    for (var value of options) {
      if (value.qrm) {
        queries.push(t.query(value.sql_str, value.params, value.qrm));
      } else {
        queries.push(t.query(value.sql_str, value.params));
      }
    }
    return t.batch(queries);
  });
}

exports.qrm = function(expected) {
  queryResult = {
    /** Single row is expected. */
    one: 1,
    /** One or more rows expected. */
    many: 2,
    /** Expecting no rows. */
    none: 4,
    /** many|none - any result is expected. */
    any: 6
  };
  return queryResult[expected];
}
