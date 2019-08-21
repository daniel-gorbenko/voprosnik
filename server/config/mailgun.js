
var config = require('../config');
var mailgun = require("mailgun-js");

var client = mailgun({apiKey: config.mail.api_key, domain: config.mail.domain});

module.exports = client;