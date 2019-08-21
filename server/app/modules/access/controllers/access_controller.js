'use strict';

var path = require('path');

var config = require('../../../../config');

var response = require('../../../helpers/response');
var errors = require('../../errors/services/errors');
var languageHelper = require('../../../helpers/language');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Checks user NOT authorization. If user is not authorized calls next middleware
 * else throws 'ForbiddenError' error.
 * @param next
 */

controller.onlyActive = function *(next) {
  if(!this.state.user || !this.state.user.active) {
    throw new errors.NotActiveError();
  }

  yield next;
};


module.exports = controller;