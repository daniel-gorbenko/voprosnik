'use strict';

var response = require('../../../../helpers/response');

var Answer = require('../../../../repositories/answer');

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
  let answers = yield Answer.getAnswers({
    blockId: this.params.blockId
  });

  response.items(this, answers);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.createCollection = function *() {

  let data = {
    blockId: this.request.body.blockId
  };

  let answersCollection = yield Answer.createCollection(data);

  response.success(this, answersCollection);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.createAnswer = function *() {

  let data = {
    answersCollectionId: this.request.body.answersCollectionId,
    questionId: this.request.body.questionId,
    options: this.request.body.options,
    value: this.request.body.value
  };

  let answer = yield Answer.createAnswer(data);

  response.success(this, answer);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.getAnswers = function *() {

  let data = {
    blockId: this.params.blockId
  };

  let answers = yield Answer.getAnswers(data);

  response.items(this, answers);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.completeCollection = function *() {

  let data = {
    id: this.request.body.answersCollectionId
  };

  let answer = yield Answer.completeCollection(data);

  response.success(this, answer);
};

module.exports = controller;