'use strict';

var response = require('../../../../helpers/response');

var Contact = require('../../../../repositories/contact');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.createContact = function *() {
  let data = {
    endPageId: this.request.body.endPageId,
    answersCollectionId: this.request.body.answersCollectionId,
    value: this.request.body.value
  };

  let contact = yield Contact.createContact(data);

  response.success(this, contact);
};

module.exports = controller;