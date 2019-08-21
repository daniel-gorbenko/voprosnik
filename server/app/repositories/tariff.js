'use strict';

var _ = require('lodash');

var config = require('../../config');
var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

/**
 * Repo definition:
 */

var repo = {};

/**
 * Methods definitions:
 */


/**
 * Get templates.
 *
 * @returns {Promise.<T>|*}
 */

repo.getTariffById = function (id) {
  return models.Tariff.findById(id);
};

/**
 * Get templates.
 *
 * @returns {Promise.<T>|*}
 */

repo.getSortedPublicTariffs = function () {
  let filter = {where: {name: {$not: config.defaultTariffName}}, order: [['position', 'ASC']]};

  return models.Tariff.findAll(filter);
};

/**
 * Helper functions
 */

module.exports = repo;