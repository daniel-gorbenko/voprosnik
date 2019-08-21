'use strict';

var response = require('../../../../helpers/response');

var Billing = require('../../../../repositories/billing');
var Review = require('../../../../repositories/review');
var Tariff = require('../../../../repositories/tariff');
var Widget = require('../../../../repositories/widget');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.purchase = function *() {
  let data = {
    tariffId: this.request.body.tariffId
  };

  let tariff = yield Tariff.getTariffById(data.tariffId);

  let success = yield Billing.purchase({tariff: tariff, user: this.state.user});

  response.success(this, success);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.getReviews = function *() {
  let ids = yield Widget.getWidgetIdsByUserId(this.state.user.id);

  let count = yield Review.getReviewsByUserId(ids);

  response.success(this, count);
};

module.exports = controller;