'use strict';

var expect = require('chai').expect;

module.exports = function (request, config, share) {

  share.authentication = {};

  describe('AuthenticationController', function () {

    describe('#signUp', function () {

      it('returns user and token to client (with valid data)', function (done) {
        const user = config.tests.authentication.user;

        request
          .post('/sign-up')
          .send(user)
          .expect(function (res) {
            expect(res.body.response).to.be.a('object');
            expect(res.body.response.user).to.be.a('object');
            expect(res.body.response.token).to.be.a('string');
          })
          .expect(function (res) {
            // TODO: move token definition to function
            share.authentication.token = `Bearer ${res.body.response.token}`;
          })
          .expect(200, done);
      });

      it('returns 400 status and error object (with invalid data)', function (done) {
        const user = {};

        request
          .post('/sign-up')
          .send(user)
          .expect(function (res) {
            expect(res.body.error).to.be.a('object');
          })
          .expect(400, done);
      });

      it('returns 403 status and error object (when user is logged in)', function (done) {
        const token = share.authentication.token;
        const user = {};

        request
          .post('/sign-up')
          .set('Authorization', token)
          .send(user)
          .expect(function (res) {
            expect(res.body.error).to.be.a('object');
          })
          .expect(403, done);
      });

    });

    describe('#signIn', function () {

      it('returns user and token to client (with valid credentials)', function (done) {
        const user = {
          username: config.tests.authentication.user.username,
          password: config.tests.authentication.user.password
        };

        request
          .post('/sign-in')
          .send(user)
          .expect(function (res) {
            expect(res.body.response).to.be.a('object');
            expect(res.body.response.user).to.be.a('object');
            expect(res.body.response.token).to.be.a('string');
          })
          .expect(function (res) {
            share.authentication.token = `Bearer ${res.body.response.token}`;
          })
          .expect(200, done);
      });

      it('returns 400 status and error object (with invalid credentials)', function (done) {
        const user = {};

        request
          .post('/sign-in')
          .send(user)
          .expect(function (res) {
            expect(res.body.error).to.be.a('object');
          })
          .expect(400, done);
      });

      it('returns 403 status and error object (when user is logged in)', function (done) {
        const token = share.authentication.token;
        const user = {};

        request
          .post('/sign-in')
          .set('Authorization', token)
          .send(user)
          .expect(function (res) {
            expect(res.body.error).to.be.a('object');
          })
          .expect(403, done);
      });

    });

    describe('#check', function () {

      it('returns user and token to client (with valid token)', function (done) {
        const token = share.authentication.token;

        request
          .get('/check')
          .set('Authorization', token)
          .expect(function (res) {
            expect(res.body.response).to.be.a('object');
            expect(res.body.response.user).to.be.a('object');
            expect(res.body.response.token).to.be.a('string');
          })
          .expect(200, done);
      });

      it('returns 401 status and error object (with invalid token)', function (done) {
        const token = 'incorrect_token';

        request
          .get('/check')
          .set('Authorization', token)
          .expect(function (res) {
            expect(res.body.error).to.be.a('object');
          })
          .expect(401, done);
      });

    });
  });

};