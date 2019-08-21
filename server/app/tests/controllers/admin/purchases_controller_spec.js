'use strict';

var expect = require('chai').expect;

var roomsHelperInit = require('./rooms_helper');
var authenticationHelperInit = require('../authentication_helper');

module.exports = function (request, config, share) {

  let purchasesFirstUserTokenField = 'purchasesFirstUserToken';
  let purchasesFirstRoomField = 'purchasesFirstRoom';

  let roomsHelper = roomsHelperInit(request, config, share);
  let authenticationHelper = authenticationHelperInit(request, config, share);

  share.purchases = {};

  describe('PurchasesController', function () {

    describe('#index', function () {

      before(function (done) {
        authenticationHelper.createUser({
          user: config.tests.purchases.user,
          field: purchasesFirstUserTokenField
        }, done);
      });

      before(function (done) {
        roomsHelper.createRoom({
          roomName: config.tests.rooms.room.name,
          token: share.authentication.token,
          field: purchasesFirstRoomField
        }, done);
      });

      it('returns list of room purchases', function (done) {
        let roomId = share.rooms.id;

        request
          .get(`/rooms/${roomId}/purchases`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.response).to.be.an('object');
            expect(res.body.response.items).to.be.an('array');
          })
          .expect(200, done);
      });

      it('returns 400 status and error (when user is not in the room)', function (done) {
        let roomId = share.rooms[purchasesFirstRoomField].id;

        request
          .get(`/rooms/${roomId}/purchases`)
          .set('Authorization', share.authentication[purchasesFirstUserTokenField])
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

      it('returns 400 status and error (when room is not exist)', function (done) {
        let roomId = 'incorrect_room_id';

        request
          .get(`/rooms/${roomId}/purchases`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

    });

    describe('#create', function () {

      it('returns purchase', function (done) {
        let roomId = share.rooms.id;
        let purchase = config.tests.purchases.purchase;

        request
          .post(`/rooms/${roomId}/purchases`)
          .send(purchase)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.response).to.be.an('object');
          })
          .expect(200, done);
      });

      it('returns 400 status and error (when user is not in that room)', function (done) {
        let roomId = share.rooms.id;
        let purchase = config.tests.purchases.purchase;

        request
          .post(`/rooms/${roomId}/purchases`)
          .send(purchase)
          .set('Authorization', share.authentication[purchasesFirstUserTokenField])
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

      it('returns 400 status and error (when room is not exist)', function (done) {
        let roomId = 'incorrect_room_id';
        let purchase = config.tests.purchases.purchase;

        request
          .post(`/rooms/${roomId}/purchases`)
          .send(purchase)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

      it('returns 400 status and error (with invalid data)', function (done) {
        let roomId = share.rooms.id;
        let purchase = {};

        request
          .post(`/rooms/${roomId}/purchases`)
          .send(purchase)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            console.log(res.body.error);

            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

    });
    
    describe('#debitsByRoom', function () {
      
      it('returns list of debits', function (done) {
        let roomId = share.rooms.id;

        request
          .get(`/rooms/${roomId}/purchases/debits`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.response).to.be.an('object');
            expect(res.body.response.items).to.be.an('array');

            // checking format of the debit. It's not requirement

            expect(res.body.response.items[0]).to.be.an('object');
            expect(res.body.response.items[0]).to.have.property('ownerId');
            expect(res.body.response.items[0]).to.have.property('debit');
          })
          .expect(200, done);
      });

      it('returns 404 status and error (when user is not in the room)', function (done) {
        let roomId = share.rooms.id;

        request
          .get(`/rooms/${roomId}/purchases/debits`)
          .set('Authorization', share.authentication[purchasesFirstUserTokenField])
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

      it('returns 404 status and error (when room is not exist)', function (done) {
        let roomId = 'incorrect_room_id';

        request
          .get(`/rooms/${roomId}/purchases/debits`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

    });

    describe('#creditsByRoom', function () {

      it('returns list of credits', function (done) {
        let roomId = share.rooms.id;

        request
          .get(`/rooms/${roomId}/purchases/credits`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.response).to.be.an('object');
            expect(res.body.response.items).to.be.an('array');

            // checking format of the debit. It's not requirement

            expect(res.body.response.items[0]).to.be.an('object');
            expect(res.body.response.items[0].purchase).to.be.an('object');
            expect(res.body.response.items[0].purchase).to.have.property('credit');
            expect(res.body.response.items[0]).to.have.property('userId');
          })
          .expect(200, done);
      });

      it('returns 404 status and error (when user is not in the room)', function (done) {
        let roomId = share.rooms.id;

        request
          .get(`/rooms/${roomId}/purchases/credits`)
          .set('Authorization', share.authentication[purchasesFirstUserTokenField])
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

      it('returns 404 status and error (when room is not exist)', function (done) {
        let roomId = 'incorrect_room_id';

        request
          .get(`/rooms/${roomId}/purchases/credits`)
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