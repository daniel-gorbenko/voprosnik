'use strict';

var _ = require('lodash');

var config = require('../../config');
var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

var Template = models.Template;

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

repo.getTemplates = function () {
  return Template.findAll();
};

/**
 * Helper functions
 */

module.exports = repo;