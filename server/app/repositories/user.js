'use strict';

var config = require('../../config');

var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

var User = models.User;

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

repo.create = function (data) {
  return User.create(data)
    .catch(function (error) {
      return error;
    });
};

/**
 * Finds user by id.
 */

repo.findById = function (id) {
  return User.findById(id, { attributes: User.publicFields });
};

/**
 * Finds user by id.
 */

repo.getByToken = function (data) {
  return User.find({
    where: {confirmed: false, verificationToken: data.token},
    attributes: ['id']
  });
};

/**
 * Finds user by id.
 */

repo.confirm = function (user) {
  user.confirmed = true;

  return user.save();
};

/**
 * Check user credentials. If credentials are correct then resolves current user from db
 * otherwise resolves a null value.
 *
 * @param {Object} options Object which consists of username and password fields
 * @returns {Promise}
 */

repo.checkCredentials = function (options) {
  options = options || {};

  return User.find({
    where: {
      email: options.email,
      passwordHash: User.hashPassword(options.password, config.authentication.secrets.password)
    },
    attributes: User.publicFields
  });
};

/**
 * Helper functions
 */


module.exports = repo;