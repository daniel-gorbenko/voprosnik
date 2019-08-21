'use strict';

var supertest = require('supertest');

var app = require('../../../server');
var config = require('../../../config');
var models = require('../../models');

/**
 * Clear database before each test
 */

before(function () {
  return models.sequelize.sync({ force: config.db.force });
});

var request = supertest.agent(app.listen());

/**
 * This object is needed to share data between different tests.
 */

var shareObject = {};

/**
 * List of tests to run.
 *
 * ------>>>>>>>> DON'T CHANGE SEQUENCE OF THE TESTS RUNNING <<<<<<<<<---------
 */

var tests = [
  require('./authentication_controller_spec'),
  require('./admin/rooms_controller_spec'),
  require('./admin/users_controller_spec'),
  require('./admin/purchases_controller_spec')
];

/**
 * Run all tests
 */

tests.forEach(function (test) {
  test(request, config, shareObject);
});