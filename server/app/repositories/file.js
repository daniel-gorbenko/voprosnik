
var fs = require('fs');

var config = require('../../config');
var constants = require('../../../client/admin/constants');

/**
 * Repo definition:
 */

var repo = {};

/**
 * Methods definitions:
 */

repo.readFile = function (path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, function (err, data) {
      if(err) return reject(err);

      resolve(data);
    })
  });
};

/**
 * Creates model and returns it.
 */


/**
 * Helper functions
 */

module.exports = repo;