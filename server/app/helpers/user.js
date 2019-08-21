var crypto = require('crypto');
var config = require('../../config');

var helper = {};

/**
 *
 */

helper.generateVerificationToken = function () {
  return crypto.createHmac('sha256', config.authentication.verificationTokenSalt)
    .update(Date.now().toString()).digest('hex');
};

/**
 *
 */

helper.setAccessDates = function (user, days) {
  user.accessFrom = new Date();
  user.accessTo = new Date();

  user.accessTo.setDate(user.accessTo.getDate() + days);

  return user;
};

module.exports = helper;