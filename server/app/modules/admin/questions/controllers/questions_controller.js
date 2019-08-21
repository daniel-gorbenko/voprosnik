'use strict';

var response = require('../../../../helpers/response');

var Question = require('../../../../repositories/question');
var Block = require('../../../../repositories/block');
//var UserRepo = require('../../../../repositories/user');

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
  let questions = yield Question.getQuestions({
    blockId: this.params.blockId
  });

  response.items(this, questions);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.delete = function *() {
  // add block id
  let question = yield Question.deleteQuestion({
    id: this.params.id,
    userId: this.state.user.id
  });

  response.success(this, question);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.get = function *() {
  let question = yield Question.getQuestion({
    id: this.params.id
  });

  response.success(this, question);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.updatePosition = function *() {
  let updated = yield Question.updatePosition({
    blockId: this.params.blockId,
    userId: this.state.user.id,
    questions: this.request.body.questions || []
  });

  response.items(this, updated);
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
    type: this.request.body.type,
    title: this.request.body.title,
    position: this.request.body.position,
    placeholder: this.request.body.placeholder,
    options: this.request.body.options,
    description: this.request.body.description,
    buttonText: this.request.body.buttonText
  };

  let updated = yield Question.update(data);

  if(updated[0] > 0) {
    Block.markAsUnCachedById(data.blockId);
  }

  response.success(this, updated);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.create = function *() {

  let data = {
    blockId: this.params.blockId,
    userId: this.state.user.id,
    type: this.request.body.type,
    title: this.request.body.title,
    position: this.request.body.position,
    placeholder: this.request.body.placeholder,
    options: this.request.body.options,
    description: this.request.body.description,
    buttonText: this.request.body.buttonText
  };

  let question = yield Question.create(data);

  if(question) {
    Block.markAsUnCachedById(data.blockId);
  }

  response.success(this, question);
};

module.exports = controller;