'use strict';

var expect = require('chai').expect;

module.exports = function (request, config, share) {
  var helper = {};

  /**
   * Creates user and assigns response token to share object
   * in specified field.
   *
   * @param {Object} options
   * @param {Object} options.user User object to create
   * @param {String} options.field Name of field to assign to 'authentication' share object
   *
   * @param done Callback
   */

  helper.createUser = function (options, done) {
    request
      .post('/sign-up')
      .send(options.user)
      .expect(function (res) {


        expect(res.body.response).to.be.a('object');
        expect(res.body.response.user).to.be.a('object');
        expect(res.body.response.token).to.be.a('string');
      })
      .expect(function (res) {
        // TODO: move token definition to function
        share.authentication[options.field] = `Bearer ${res.body.response.token}`;
      })
      .expect(200, done);
    };

  return helper;
};