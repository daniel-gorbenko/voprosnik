'use strict';

var response = require('../../../../helpers/response');

var User = require('../../../../repositories/user');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.get = function *() {
  response.success(this, this.state.user);
};

module.exports = controller;