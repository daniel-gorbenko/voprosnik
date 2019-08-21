'use strict';

var response = require('../../../../helpers/response');

var Tariff = require('../../../../repositories/tariff');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.index = function *() {
  let tariffs = yield Tariff.getSortedPublicTariffs();

  response.items(this, tariffs);
};

module.exports = controller;