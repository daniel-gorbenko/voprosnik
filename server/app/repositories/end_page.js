'use strict';

var _ = require('lodash');

var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

var EndPage = models.EndPage;

/**
 * Repo definition:
 */

var repo = {};

/**
 * Methods definitions:
 */


/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.get = function (data) {
  return EndPage.findById(data.id);
};

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.create = function (data) {
  return EndPage.create(data);
};

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.update = function (data) {
  return EndPage.update(data, {
    where: {id: data.id, userId: data.userId}
  });
};

/**
 * Exporting
 */

module.exports = repo;