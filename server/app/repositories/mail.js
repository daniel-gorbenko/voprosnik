
var config = require('../../config');
var mailgun = require('../../config/mailgun');
var languageHelper = require('../helpers/language');
var constants = require('../../../client/admin/constants');

/**
 * Repo definition:
 */

var repo = {};

/**
 * Methods definitions:
 */

repo.sendVerification = function (data) {
  let voc = languageHelper.getVocabulary(data.user.lang);

  return this.sendMail({
    from: config.mail.from,
    to: data.user.email,
    subject: voc.mail.verification.subject,
    text: generateVerificationText(voc.mail.verification.message, data),
    html: generateVerificationText(voc.mail.verification.message, data)
  });
};

/**
 * Methods definitions:
 */

repo.sendMail = function (data) {
  return new Promise(function (resolve, reject) {
    mailgun.messages().send({
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.text
    }, function (err, body) {
      if(err) return reject(err);

      resolve(body);
    });
  });
};

/**
 * Creates model and returns it.
 */

function generateVerificationText(text, data) {
  let link = config.mail.verifyUrl
    .replace(':token', data.token);

  return text
    .replace(':link', link);

}

/**
 * Helper functions
 */

module.exports = repo;