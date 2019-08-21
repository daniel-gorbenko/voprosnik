'use strict';

var _ = require('lodash');

var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

var Question = models.Question;
var QuestionOption = models.QuestionOption;

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

repo.getQuestions = function (data) {
  return Question.findAll({
    where: { blockId: data.blockId },
    include: [{model: QuestionOption, as: 'options'}]
  });
};

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.deleteQuestion = function (data) {
  return Question.destroy({
    where: { id: data.id, userId: data.userId }
  });
};

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.getQuestion = function (data) {
  return Question.findById(data.id, {
    include: [{model: QuestionOption, as: 'options'}]
  });
};

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.updatePosition = function (data) {
  let promises = [];

  data.questions.forEach(function (question) {
    promises.push(models.Question.update({position: question.position}, {where: {userId: data.userId, id: question.id}}));
  });

  return Promise.all(promises);
};

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.create = function (data) {

  return Question.create(data, {
    include: [{model: QuestionOption, as: 'options'}]
  })
    .then(function (question) {
      return question;
    });

};

/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.update = function (data) {

  return Question.update(data, {
    where: {id: data.id, blockId: data.blockId, userId: data.userId}
  })

    .then(function (updates) {
      if(updates > 0) {
        let promises = [];

        data.options.forEach(function (option) {
          let searchQuery = {where: {id: option.id, questionId: data.id}};

          if(option.isUpdated) {
            return promises.push(QuestionOption.update({value: option.value}, searchQuery));
          }

          if(option.isDeleted) {
            return promises.push(QuestionOption.destroy(searchQuery));
          }

          if(option.isNew) {
            return promises.push(QuestionOption.create(option));
          }

        });

        return Promise.all(promises);
      }
    });

};

/**
 * Exporting
 */

module.exports = repo;