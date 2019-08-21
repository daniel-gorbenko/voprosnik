'use strict';

var response = require('../../../../helpers/response');

var Statistic = require('../../../../repositories/statistic');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.calc = function *() {
  let data = {
    action: this.request.body.action,
    blockId: this.request.body.blockId,
    questionId: this.request.body.questionId
  };

  let stat = yield Statistic.calc(data);

  response.success(this, stat);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.get = function *() {
  let data = {
    blockId: this.params.blockId
  };

  let stats = yield Statistic.getStatistic(data);

  response.success(this, stats);
};

module.exports = controller;