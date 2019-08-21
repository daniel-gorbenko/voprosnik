'use strict';

var response = require('../../../../helpers/response');

var Setting = require('../../../../repositories/setting');

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
  let data = {
    id: this.params.id
  };

  let block = yield Setting.getSettings(data);

  response.success(this, block);
};

module.exports = controller;