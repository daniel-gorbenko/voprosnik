'use strict';

var response = require('../../../../helpers/response');

var EndPage = require('../../../../repositories/end_page');
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
  let endPage = yield EndPage.get({
    id: this.params.id
  });

  response.success(this, endPage);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.update = function *() {
  let data = {
    id: this.params.id,
    blockId: this.params.blockId,
    userId: this.state.user.id,
    title: this.request.body.title,
    description: this.request.body.description,
    placeholder: this.request.body.placeholder,
    buttonText: this.request.body.buttonText
  };

  let updated = yield EndPage.update(data);

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
    description: this.request.body.description,
    placeholder: this.request.body.placeholder,
    buttonText: this.request.body.buttonText
  };

  let endPage = yield EndPage.create(data);

  if(endPage) {
    Block.markAsUnCachedById(data.blockId);
  }

  response.success(this, endPage);
};

module.exports = controller;