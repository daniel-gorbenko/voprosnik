'use strict';

var config = require('../../../../config');
var jwt = require('koa-jwt');

var UserRepo = require('../../../repositories/user');

var service = {};

/**
 * Helper functions definitions:
 */



/**
 * Signs passed user and returns authentication token.
 * You can use this token to pass authentication in future.
 *
 * @param user User object to encode
 * @returns {String} Token
 */

service.serializeUser = function (user, done) {
    done(null, user.id);
};

/**
 * Signs passed user and returns authentication token.
 * You can use this token to pass authentication in future.
 *
 * @param user User object to encode
 * @returns {String} Token
 */

service.login = function (ctx, user) {
  return new Promise(function (resolve, reject) {
    ctx.req.login(user, function (err) {
      if(err) return reject(err);

      resolve(true);
    })
  });
};

/**
 * Signs passed user and returns authentication token.
 * You can use this token to pass authentication in future.
 *
 * @param user User object to encode
 * @returns {String} Token
 */

service.deserializeUser = function (id, done) {
  UserRepo.findById(id)
    .then(function(user) {
      if(!user) return done(null, false);

      done(null, user);
    });
};

module.exports = service;