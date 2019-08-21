'use strict';

var path = require('path');

var config = require('../../../../config');

var response = require('../../../helpers/response');
var fileHelper = require('../../../helpers/file');
var errors = require('../../errors/services/errors');

var languageHelper = require('../../../helpers/language');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Checks user authorization. If user is authorized calls next middleware and writes current user model instance
 * to the this.state.user property otherwise throws UnauthorizedError.
 *
 * @param next
 */

controller.setLanguage = function *(next) {
  this.state.lang = this.params.lang || this.request.query.lang;

  // If language is not allowed, ie. there is no such language
  // we redirect it to default language
  if(!languageHelper.isAllowedLanguage(this.state.lang)) {
    this.state.lang = config.defaultLanguage;
  }

  this.state.vocabulary = languageHelper.getVocabulary(this.state.lang);

  yield next;
};

/**
 * Checks user authorization. If user is authorized calls next middleware and writes current user model instance
 * to the this.state.user property otherwise throws UnauthorizedError.
 *
 * @param next
 */

controller.getIndex = function *() {
  let data = {voc: this.state.vocabulary, lang: this.state.lang};

  let content = yield fileHelper.render(config.views.landing.index, data);

  response.file(this, {
    content: content,
    type: 'text/html'
  });
};

/**
 * Checks user authorization. If user is authorized calls next middleware and writes current user model instance
 * to the this.state.user property otherwise throws UnauthorizedError.
 *
 * @param next
 */

controller.getFeatures = function *() {
  let data = {voc: this.state.vocabulary, lang: this.state.lang};

  let content = yield fileHelper.render(config.views.landing.features, data);

  response.file(this, {
    content: content,
    type: 'text/html'
  });
};

/**
 * Checks user authorization. If user is authorized calls next middleware and writes current user model instance
 * to the this.state.user property otherwise throws UnauthorizedError.
 *
 * @param next
 */

controller.getPricing = function *() {
  let data = {voc: this.state.vocabulary, lang: this.state.lang};

  let content = yield fileHelper.render(config.views.landing.pricing, data);

  response.file(this, {
    content: content,
    type: 'text/html'
  });
};


module.exports = controller;