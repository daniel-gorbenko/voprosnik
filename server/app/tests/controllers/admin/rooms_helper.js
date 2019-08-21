'use strict';

var expect = require('chai').expect;

module.exports = function (request, config, share) {
  var helper = {};

  /**
   * Creates room by specified data and assigns response to 'rooms' share object
   * in specified field.
   *
   * @param {Object} options
   * @param {String} options.roomName Name of the room to create
   * @param {String} options.token User authorization token
   * @param {String} options.field Name of field to assign to share object
   *
   * @param done Callback
   */

  helper.createRoom = function (options, done) {
    let data = {name: options.roomName};

    request
      .post('/rooms')
      .send(data)
      .set('Authorization', options.token)
      .expect(function (res) {
        expect(res.body).to.be.an('object');
        expect(res.body.response).to.be.an('object');
        expect(res.body.response.name).to.equal(options.roomName);
      })
      .expect(function (res) {
        share.rooms[options.field] = res.body.response;
      })
      .expect(200, done);
  };

  /**
   * Generates approve token and assigns response to 'rooms' share object
   * in specified field.
   *
   * @param {Object} options
   * @param {String|Number} options.roomId ID of the room to get link for.
   * @param {String} options.token User authorization token
   * @param {String} options.field Name of field to assign to share object

   * @param done Callback
   */

  helper.generateApproveToken = function (options, done) {
    let roomId = options.roomId;

    request
      .get(`/rooms/${roomId}/approve`)
      .set('Authorization', options.token)
      .expect(function (res) {
        expect(res.body).to.be.an('object');
        expect(res.body.response).to.be.an('string');
      })
      .expect(function (res) {
        share.rooms[options.field] = res.body.response;
      })
      .expect(200, done);
    };

  return helper;
};