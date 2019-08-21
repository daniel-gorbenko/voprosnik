'use strict';

var response = require('../../../../helpers/response');

var StartPage = require('../../../../repositories/start_page');
var Block = require('../../../../repositories/block');

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
  let startPage = yield StartPage.get({
    id: this.params.id
  });

  response.success(this, startPage);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.update = function *() {
  let data = {
    id: this.params.id,
    userId: this.state.user.id,
    blockId: this.params.blockId,
    title: this.request.body.title,
    buttonText: this.request.body.buttonText
  };

  let updated = yield StartPage.update(data);

  //if(updated[0] > 0) {
  //  Block.markAsUnCachedById(data.blockId);
  //}

  response.success(this, updated);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.create = function *() {

  let data = {
    userId: this.state.user.id,
    blockId: this.params.blockId,
    title: this.request.body.title,
    buttonText: this.request.body.buttonText
  };

  let startPage = yield StartPage.create(data);

  if(startPage) {
    Block.markAsUnCachedById(data.blockId);
  }

  response.success(this, startPage);
};

module.exports = controller;