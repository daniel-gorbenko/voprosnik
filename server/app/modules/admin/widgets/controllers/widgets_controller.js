'use strict';

var constants = require('../../../../../../client/admin/constants');
var response = require('../../../../helpers/response');
var errors = require('../../../errors/services/errors');

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

controller.index = function *() {
  let data = {
    userId: this.state.user.id
  };

  let items = yield Widget.getWidgets(data);

  response.items(this, items);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.get = function *() {
  let data = {
    userId: this.state.user.id,
    id: this.params.id
  };

  let item = yield Widget.getWidget(data);

  response.success(this, item);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.create = function *() {
  let data = {
    userId: this.state.user.id,
    url: this.request.body.url,
    blocks: this.request.body.blocks
  };

  addDefaultsToBlock(data.blocks, data.userId);

  let item = yield Widget.createWidget(data);

  response.items(this, item);
};

function addDefaultsToBlock(blocks, userId) {
  if(blocks && blocks.length) {
    blocks[0].userId = userId;
    blocks[0].cached = false;
    blocks[0].state = constants.blockStates.edit;
  }
}


module.exports = controller;