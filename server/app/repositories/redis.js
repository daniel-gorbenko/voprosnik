'use strict';

var _ = require('lodash');

var config = require('../../config');
var constants = require('../../../client/admin/constants');
var redis = require('../../config/redis');
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
 * Creates model and returns it.
 */

repo.getCacheForBlock = function (data) {
  let cachedBlock = models.Block.find({
    where: {widgetId: data.widgetId, state: constants.blockStates.active, cached: true},
    attributes: ['id', 'cached']
  });

  let cache = this.get(data.key);

  return Promise.all([cachedBlock, cache])
    .then(function (promises) {
      if(promises[0] === null || promises[1] === null) {
        return null;
      }

      return promises[1];
    });
};

/**
 * Creates model and returns it.
 */

repo.get = function (key) {
  return new Promise(function (resolve, reject) {
    redis.get(key, function (err, data) {
      if(err) {
        return reject(err);
      }

      resolve(data);
    });
  });
};

/**
 * Creates model and returns it.
 */

repo.set = function (key, data) {
  return new Promise(function (resolve, reject) {
    redis.set(key, data, function (err, data) {
      if(err) {
        return reject(err);
      }

      resolve(data);
    });
  });
};

/**
 * Helper functions
 */

module.exports = repo;