'use strict';

var response = require('../response');
var expect = require('chai').expect;

describe('Response', function () {

  let ctx;

  beforeEach(function () {
    ctx = {};
  });

  describe('#success', function () {

    it('sets 200 status and body with response object on passed context', function () {
      let data = 'data';

      response.success(ctx, data);

      expect(ctx.body).to.be.an('object');
      expect(ctx.body).to.have.property('response');
      expect(ctx.body.response).to.equal(data);
      expect(ctx.status).to.equal(200);
    });

    it('sets specified status and body with response object on passed context', function () {
      let data = 'data';
      let status = 403;

      response.success(ctx, data, status);

      expect(ctx.body).to.be.an('object');
      expect(ctx.body).to.have.property('response');
      expect(ctx.body.response).to.equal(data);
      expect(ctx.status).to.equal(status);
    });

  });

  describe('#items', function () {

    it('sets 200 status and body with "items" property in response object on passed context', function () {
      let data = [1, 2, 3, 4];

      response.items(ctx, data);

      expect(ctx.body).to.be.an('object');
      expect(ctx.body).to.have.property('response');
      expect(ctx.body.response).to.be.an('object');
      expect(ctx.body.response.items).to.equal(data);
      expect(ctx.status).to.equal(200);
    });

    it('sets 200 status and body with empty array "items" property in response object on passed context', function () {
      response.items(ctx);

      expect(ctx.body).to.be.an('object');
      expect(ctx.body).to.have.property('response');
      expect(ctx.body.response).to.be.an('object');
      expect(ctx.body.response.items).to.be.an('array').with.length(0);
      expect(ctx.status).to.equal(200);
    });

    it('sets specified status and body with "items" property in response object on passed context', function () {
      let data = [1, 2, 3, 4];
      let status = 403;

      response.items(ctx, data, status);

      expect(ctx.body).to.be.an('object');
      expect(ctx.body).to.have.property('response');
      expect(ctx.body.response).to.be.an('object');
      expect(ctx.body.response.items).to.equal(data);
      expect(ctx.status).to.equal(status);
    });

  });

  describe('#error', function () {

    it('sets 500 status and body with "error" property in response object on passed context', function () {
      let data = "My error";

      response.error(ctx, data);

      expect(ctx.body).to.be.an('object');
      expect(ctx.body).to.have.property('error');
      expect(ctx.body.error).to.equal(data);
      expect(ctx.status).to.equal(500);
    });

    it('sets specified status and body with "error" property in response object on passed context', function () {
      let data = "My error";
      let status = 505;

      response.error(ctx, data, status);

      expect(ctx.body).to.be.an('object');
      expect(ctx.body).to.have.property('error');
      expect(ctx.body.error).to.equal(data);
      expect(ctx.status).to.equal(status);
    });

  });

});