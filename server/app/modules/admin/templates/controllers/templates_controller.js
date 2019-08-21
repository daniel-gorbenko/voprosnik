'use strict';

var response = require('../../../../helpers/response');

var Template = require('../../../../repositories/template');

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
  let templates = yield Template.getTemplates();

  response.items(this, templates);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

//controller.get = function *() {
//  let question = yield Question.getQuestion({
//    id: this.params.id
//  });
//
//  response.success(this, question);
//};

module.exports = controller;