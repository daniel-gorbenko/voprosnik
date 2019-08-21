'use strict';

var expect = require('chai').expect;

var roomsHelperInit = require('./rooms_helper');
var authenticationHelperInit = require('../authentication_helper');

module.exports = function (request, config, share) {

  let usersFirstRoomField = 'usersFirstRoom';
  let usersFirstUserTokenField = 'usersFirstUserToken';

  let roomsHelper = roomsHelperInit(request, config, share);
  let authenticationHelper = authenticationHelperInit(request, config, share);

  share.users = {};
  
  describe('UsersController', function () {
    
    describe('#byRoom', function () {

      before(function (done) {
        authenticationHelper.createUser({
          user: config.tests.users.user,
          field: usersFirstUserTokenField
        }, done);
      });

      before(function (done) {
        roomsHelper.createRoom({
          roomName: config.tests.rooms.room.name,
          token: share.authentication.token,
          field: usersFirstRoomField
        }, done);
      });
      
      it('returns list of users in specified room (when user is in the room)', function (done) {
        let roomId = share.rooms.id;

        request
          .get(`/users/by_room/${roomId}`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.response).to.be.an('object');
            expect(res.body.response.items).to.be.an('array');
          })
          .expect(200, done);
      });

      it('returns 400 status and error (when user is not in the room)', function (done) {
        let roomId = share.rooms.id;

        request
          .get(`/users/by_room/${roomId}`)
          .set('Authorization', share.authentication[usersFirstUserTokenField])
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

      it('returns 400 status and error (when room is not exist)', function (done) {
        let roomId = 'incorrect_room_id';

        request
          .get(`/users/by_room/${roomId}`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      })

    });
    
  });
  
};