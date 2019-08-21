'use strict';

var expect = require('chai').expect;

var roomsHelperInit = require('./rooms_helper');
var authenticationHelperInit = require('../authentication_helper');

module.exports = function (request, config, share) {

  let secondUserTokenField = 'secondUserToken';
  let notUserRoomField = 'notUserRoom';
  let newAproveTokenField = 'newApproveToken';

  let roomsHelper = roomsHelperInit(request, config, share);
  let authenticationHelper = authenticationHelperInit(request, config, share);

  share.rooms = {};

  describe('RoomsController', function () {

    describe('#index', function () {

      it('returns list of user rooms', function (done) {
        request
          .get('/rooms')
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.response).to.be.an('object');
            expect(res.body.response.items).to.be.an('array');
          })
          .expect(200, done);
      });

    });

    describe('#create', function () {

      it('creates room by user and returns newly created room (with passed name of room)', function (done) {
        let data = config.tests.rooms.room;

        request
          .post('/rooms')
          .send(data)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.response).to.be.an('object');
            expect(res.body.response.name).to.equal(data.name);
          })
          .expect(function (res) {
            share.rooms.id = res.body.response.id;
          })
          .expect(200, done);
      });

      it('returns 400 status with error object (when name of room is not passed)', function (done) {
        let data = {name: null};

        request
          .post('/rooms')
          .send(data)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

    });

    describe('#show', function () {

      before(function (done) {
        authenticationHelper.createUser({
          user: config.tests.rooms.user,
          field: secondUserTokenField
        }, done);
      });

      before(function (done) {
        roomsHelper.createRoom({
          roomName: config.tests.rooms.room.name,
          field: notUserRoomField,
          token: share.authentication[secondUserTokenField]
        }, done);
      });

      it('returns room by specified id (when room is exist and user is in that room)', function (done) {
        let roomId = share.rooms.id;

        request
          .get(`/rooms/${roomId}`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.response).to.be.an('object');
            expect(res.body.response.name).to.equal(config.tests.rooms.room.name);
          })
          .expect(200, done);
      });

      it('returns 400 error (when room with specified id is not exist)', function (done) {
        let roomId = 'incorrect_room_id';

        request
          .get(`/rooms/${roomId}`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

      it('returns 400 error (when user is not in that room)', function (done) {
        let notUserRoomId = share.rooms[notUserRoomField].id;

        request
          .get(`/rooms/${notUserRoomId}`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

    });

    describe('#generateApprove', function () {

      it('returns token (when room is exist and user is in that room)', function (done) {
        let roomId = share.rooms.id;

        request
          .get(`/rooms/${roomId}/approve`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.response).to.be.an('string');
          })
          .expect(function (res) {
            share.rooms.approveToken = res.body.response;
          })
          .expect(200, done);
      });

      it('returns 400 error (when room is not exist)', function (done) {
        let roomId = 'incorrect_room_id';

        request
          .get(`/rooms/${roomId}/approve`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

      it('returns 400 error (when user is not in that room)', function (done) {
        let roomId = share.rooms[notUserRoomField];

        request
          .get(`/rooms/${roomId}/approve`)
          .set('Authorization', share.authentication[secondUserTokenField])
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

    });

    describe('#approve', function () {

       before(function (done) {
         roomsHelper.generateApproveToken({
           roomId: share.rooms.id,
           token: share.authentication.token,
           field: newAproveTokenField
         }, done);
       });

      it('returns room (when user is not there yet and token is correct)', function (done) {
        let token = share.rooms.approveToken;

        request
          .post(`/rooms/approve/${token}`)
          .set('Authorization', share.authentication[secondUserTokenField])
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.response).to.be.an('object');
          })
          .expect(200, done);
      });

      it('returns 400 status and error (when token is incorrect)', function (done) {
        let token = 'invalid_token';

        request
          .post(`/rooms/approve/${token}`)
          .set('Authorization', share.authentication[secondUserTokenField])
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

      it('returns 400 status and error (when token is already used by somebody)', function (done) {
        let token = share.rooms.approveToken;

        request
          .post(`/rooms/approve/${token}`)
          .set('Authorization', share.authentication[secondUserTokenField])
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

      it('returns 400 status and error (when user is already there)', function (done) {
        let token = share.rooms[newAproveTokenField];

        request
          .post(`/rooms/approve/${token}`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

    });
  });

};