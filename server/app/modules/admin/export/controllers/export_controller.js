'use strict';

var response = require('../../../../helpers/response');

var Answer = require('../../../../repositories/answer');
var Export = require('../../../../repositories/export');
var Redis = require('../../../../repositories/redis');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.exportType = function *() {
  let cacheKey = this.request.body.blockId.toString() + Date.now().toString();
  let cacheUserKey = this.state.user.id.toString() + cacheKey;

  let data = {
    cacheKey: cacheKey,
    type: this.params.type,
    blockId: this.request.body.blockId,
    userId: this.state.user.id
  };

  let collections = yield Answer.getAnswersWithQuestions(data);
  let exported = yield Export.stringify(collections, data.type, this.state.vocabulary);

  yield Redis.set(cacheUserKey, exported);

  response.success(this, cacheKey);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.getType = function *() {
  let data = {
    cacheKey: this.state.user.id.toString() + this.params.key,
    type: this.params.type,
    userId: this.state.user.id
  };

  let exported = yield Redis.get(data.cacheKey);

  response.file(this, {
    content: exported,
    type: 'text/:type'.replace(':type', data.type)
  });
};

module.exports = controller;