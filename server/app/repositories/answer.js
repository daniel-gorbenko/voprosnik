'use strict';

var _ = require('lodash');

var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

var Answer = models.Answer;
var Contact = models.Contact;
var AnswerCollection = models.AnswerCollection;
var AnswerOption = models.AnswerOption;

/**
 * Repo definition:
 */

var repo = {};

/**
 * Methods definitions:
 */

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.getAnswers = function (data) {
  return AnswerCollection.findAll({
    where: { blockId: data.blockId, completed: true },
    include: [
      {
        model: Answer,
        as: 'answers',
        include: [{model: AnswerOption, as: 'options'}]
      },
      {
        raw: true,
        model: Contact,
        as: 'contact'
      }
    ]
  });
};

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.getQuestions = function (data) {
  return models.Question.findAll({
    where: { blockId: data.blockId },
    order: [['position', 'ASC']],
    include: [{model: models.QuestionOption, as: 'options', raw: true}]
  });
};

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.getAnswersWithQuestions = function (data) {
  return Promise.all([this.getQuestions(data), this.getAnswers(data)])
    .then(function (response) {
      return {
        questions: response[0],
        answers: response[1]
      };
    });
};

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.createCollection = function (data) {
  return AnswerCollection.create(data);
};

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.createAnswer = function (data) {
  return Answer.create(data, {
    include: [{ model: AnswerOption, as: 'options' }]
  });
};

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.completeCollection = function (data) {
  return AnswerCollection.update({completed: true}, { where: {id: data.id} });
};

/**
 * Exporting
 */

module.exports = repo;