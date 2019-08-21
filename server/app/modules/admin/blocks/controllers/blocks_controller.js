'use strict';

var response = require('../../../../helpers/response');
var constants = require('../../../../../../client/admin/constants');
var errors = require('../../../errors/services/errors');

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

controller.onlyOnwers = function *(next) {
  let data = {
    userId: this.state.user.id,
    id: this.request.body.blockId || this.params.blockId
  };

  if(data.id === null || data.id === undefined) {
    return yield next;
  }

  let block = yield Block.getBlockByUser(data);

  if(block) {
    return yield next;
  }

  throw new errors.ForbiddenError();
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.index = function *() {
  let data = {
    userId: this.state.user.id
  };

  let blocks = yield Block.getBlocks(data);

  response.items(this, blocks);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.getByState = function *() {
  let data = {
    userId: this.state.user.id,
    widgetId: this.params.widgetId,
    state: this.params.state,
    blockId: this.query.blockId
  };

  let item = yield Block.getByState(data);

  response.success(this, item);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.activate = function *() {
  let data = {
    userId: this.state.user.id,
    widgetId: this.params.widgetId
  };

  let editStateData = Object.assign({state: constants.blockStates.edit}, data);

  let existEditBlock = yield Block.getByState(editStateData);

  if(!existEditBlock) {
    throw new errors.IncorrectDataError('Edit block does not exist');
  }

  yield Block.currentActiveToVersion(data);

  let updated = yield Block.activate(data);

  response.success(this, updated);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.edit = function *() {
  let data = {
    userId: this.state.user.id,
    widgetId: this.params.widgetId
  };

  let editStateData = Object.assign({state: constants.blockStates.edit}, data);
  let activeStateData = Object.assign({state: constants.blockStates.active}, data);

  let alreadyExistEditBlock = yield Block.getByState(editStateData);

  if(alreadyExistEditBlock) {
    throw new errors.IncorrectDataError();
  }

  let block = yield Block.copyActiveBlock(activeStateData);

  block.cached = false;
  block.state = constants.blockStates.edit;

  if(!block) {
    throw new Error('Can not create copy. There is no active block');
  }

  let updated = yield Block.edit(block);

  response.success(this, updated);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.getVersions = function *() {
  let data = {
    userId: this.state.user.id,
    widgetId: this.params.widgetId
  };

  let items = yield Block.getVersions(data);

  response.items(this, items);
};


/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.get = function *() {
  var data = {
    id: this.params.blockId,
    userId: this.state.user.id
  };

  let block = yield Block.getBlock(data);

  response.success(this, block);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.getPages = function *() {
  var data = {
    widgetId: this.params.widgetId,
    userId: this.state.user.id,
    state: this.params.state,
    versionId: this.query.versionId
  };

  let pages = yield Block.getPages(data);

  response.success(this, pages);
};

/**
 * Creates new room by user and enters user in this room.
 *
 * @param next
 */

controller.create = function *() {
  let data = {
    url: this.request.body.url,
    userId: this.state.user.id,
    colorMain: this.request.body.colorAdditional,
    colorAdditional: this.request.body.colorAdditional,
    showType: this.request.body.showType,
    format: this.request.body.format,
    showDelay: this.request.body.showDelay,
    templateId: this.request.body.templateId,
    status: this.request.body.status,
    cached: false
  };

  let block = yield Block.create(data);

  response.success(this, block);
};

/**
 * Creates new room by user and enters user in this room.
 *
 * @param next
 */

controller.update = function *() {
  let data = {
    showType: this.request.body.showType,
    showDelay: this.request.body.showDelay,
    format: this.request.body.format,
    colorMain: this.request.body.colorMain,
    templateId: this.request.body.templateId,
    colorAdditional: this.request.body.colorAdditional,
    id: this.params.blockId,
    userId: this.state.user.id
  };

  let updated = yield Block.update(data);

  //if(updated[0] > 0) {
  //  Block.markAsUnCachedById(data.id);
  //}

  response.success(this, updated);
};

/**
 * Creates new room by user and enters user in this room.
 *
 * @param next
 */

controller.updateStatus = function *() {
  let data = {
    status: this.request.body.status,
    id: this.params.blockId,
    userId: this.state.user.id
  };

  let updated = yield Block.updateStatus(data);

  //if(updated[0] > 0) {
  //  Block.markAsUnCachedById(data.id);
  //}

  response.success(this, updated);
};

module.exports = controller;