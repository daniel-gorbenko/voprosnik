'use strict';

var _ = require('lodash');

var config = require('../../config');
var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var userHelper = require('../helpers/user');
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

repo.purchase = function (data) {
  let updateData = {active: true, tariffId: data.tariff.id};

  userHelper.setAccessDates(updateData, data.tariff.days);

  return models.User.update(updateData, {
    where: {id: data.user.id}
  })
    .then(function (updated) {
      if(updated < 1) {
        throw new Error('Unknown error');
      }

      return true;
    });
};

/**
 * Helper functions
 */

module.exports = repo;