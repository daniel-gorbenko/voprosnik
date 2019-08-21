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

repo.incReviewByWidgetId = function (widgetId) {
  return models.Review.create({
    widgetId: widgetId
  });
};

/**
 * Get templates.
 *
 * @returns {Promise.<T>|*}
 */

repo.getReviewsByUserId = function (widgetIds) {
  return models.Review.count({
    where: {widgetId: widgetIds}
  });
};

/**
 * Helper functions
 */

module.exports = repo;