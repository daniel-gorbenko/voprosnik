'use strict';

var _ = require('lodash');

var config = require('../../config');
var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

var Contact = models.Contact;

/**
 * Repo definition:
 */

var repo = {};

/**
 * Methods definitions:
 */

/**
 * Creates model and returns it.
 */

repo.createContact = function (data) {
  return Contact.create(data);
};

/**
 * Helper functions
 */

module.exports = repo;