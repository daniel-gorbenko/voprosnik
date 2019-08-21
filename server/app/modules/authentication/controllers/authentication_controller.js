'use strict';

var jwt = require('koa-jwt');
var passport = require('koa-passport');
var path = require('path');

var config = require('../../../../config');

var response = require('../../../helpers/response');
var userHelper = require('../../../helpers/user');
var UserRepo = require('../../../repositories/user');
var FileRepo = require('../../../repositories/file');
var fileHelper = require('../../../helpers/file');
var MailRepo = require('../../../repositories/mail');
var errors = require('../../errors/services/errors');
var languageHelper = require('../../../helpers/language');

var authService = require('../services/authentication_service');

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

controller.onlyAuthenticated = function *(next) {
  if(this.isUnauthenticated()) {
    throw new errors.UnauthorizedError();
  }

  this.state.user = this.req.user;
  this.state.vocabulary = languageHelper.getVocabulary(this.state.user.lang);

  yield next;
};

/**
 * Checks user NOT authorization. If user is not authorized calls next middleware
 * else throws 'ForbiddenError' error.
 * @param next
 */

controller.onlyNotAuthenticated = function *(next) {
  if(this.isAuthenticated()) {
    return this.redirect(config.authentication.adminRedirectUrl);
  }

  yield next;
};

/**
 * Checks user authorization. If user is authorized calls next middleware and writes current user model instance
 * to the this.state.user property otherwise throws UnauthorizedError.
 *
 * @param next
 */

controller.getAdminPage = function *() {
  if(this.isUnauthenticated()) {
    return this.redirect(config.authentication.loginRedirectUrl);
  }

  let data = {lang: this.req.user.lang, user: JSON.stringify(this.req.user)};

  let content = yield fileHelper.render(config.views.admin, data);

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

controller.getSignUp = function *() {
  let data = {voc: this.state.vocabulary, lang: this.state.lang};

  let content = yield fileHelper.render(config.views.auth.signup, data);

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

controller.getLogin = function *() {
  let data = {voc: this.state.vocabulary, lang: this.state.lang};

  let content = yield fileHelper.render(config.views.auth.login, data);

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

controller.getVerify = function *() {
  let data = {voc: this.state.vocabulary, lang: this.state.lang, email: this.request.query.email};

  let content = yield fileHelper.render(config.views.auth.verify, data);

  response.file(this, {
    content: content,
    type: 'text/html'
  });
};

/**
 * Authorizes user using passed data.
 * If success, then sends user and token to client
 * else throws 'IncorrectDataError' error.
 *
 * @param next Next middlware function or empty function
 */

controller.login = function *(next) {
  let ctx = this;

  yield passport.authenticate('local', function *(err, user) {
    if(!user) {
      let data = {data: ctx.request.body, error: true, voc: ctx.state.vocabulary, lang: ctx.state.lang};

      let content = yield fileHelper.render(config.views.auth.login, data);

      response.file(ctx, {
        content: content,
        type: 'text/html'
      });

      return ;
    }

    let successLogin = yield authService.login(ctx, user);

    if(!successLogin) { return yield next; }

    ctx.redirect('/');
  })
};


/**
 * Authorizes user using passed data.
 * If success, then sends user and token to client
 * else throws 'IncorrectDataError' error.
 *
 * @param next Next middlware function or empty function
 */

controller.logout = function *() {
  this.logout();
  this.redirect(config.authentication.homeRedirectUrl);
};

/**
 * Creates user using passed data and authorizes it.
 * If success, then sends user and token to client
 * else throws 'SequelizeValidationError' or 'SequelizeUniqueConstraintError' error.
 *
 * @param next Next middlware function or empty function
 */

controller.signUp = function *() {
  var verificationToken = userHelper.generateVerificationToken().toString();

  var data = {
    email: this.request.body.email,
    name: this.request.body.name,
    active: true,
    password: this.request.body.password,
    lang: this.state.lang,
    confirmed: false,
    tariffId: config.defaultTariffId,
    verificationToken: verificationToken
  };

  // TODO: use days field from trial tariff from db
  // instead of hardcoded "7" number

  userHelper.setAccessDates(data, 7);

  let result = yield UserRepo.create(data);

  // If we got an error, render signup page with errors

  if(result.errors) {
    let renderData = {
      errors: errors.parseErrors(result.errors, this.state.vocabulary),
      voc: this.state.vocabulary,
      data: data,
      lang: this.state.lang
    };

    let content = yield fileHelper.render(config.views.auth.signup, renderData);

    response.file(this, {
      content: content,
      type: 'text/html'
    });

    return ;
  }

  MailRepo.sendVerification({
    token: verificationToken,
    user: result
  });

  let url = config.authentication.verifyRedirectUrl + '?lang=:lang&email=:email'
      .replace(':lang', result.lang)
      .replace(':email', result.email);

  this.redirect(url);
};

/**
 * Creates user using passed data and authorizes it.
 * If success, then sends user and token to client
 * else throws 'SequelizeValidationError' or 'SequelizeUniqueConstraintError' error.
 *
 * @param next Next middlware function or empty function
 */

controller.verify = function *(next) {
  var data = {
    token: this.params.token
  };

  let user = yield UserRepo.getByToken(data);

  if(!user) {
    return yield next;
  }

  let savedUser = yield UserRepo.confirm(user);

  // It can be deleted. Instead of login, redirect to login page

  let successLogin = yield authService.login(this, savedUser);

  if(successLogin) {
    return this.redirect(config.authentication.adminRedirectUrl);
  }
};

module.exports = controller;