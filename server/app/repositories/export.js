'use strict';

var _ = require('lodash');
var csv = require('csv');

var config = require('../../config');
var constants = require('../../../client/admin/constants');
var redis = require('../../config/redis');
var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

/**
 * Repo definition:
 */

var repo = {};

/**
 * Methods definitions:
 */

/**
 * Creates model and returns it.
 */

repo.stringify = function (collections, type, vocabulary) {
  if(type !== 'csv') {
    throw new errors.IncorrectDataError();
  }

  let parsedCollections = _parseCollections(collections, vocabulary);

  return _stringifyCSV(parsedCollections);
};

/**
 * Creates model and returns it.
 */

function _parseCollections(collections, vocabulary) {
  let result = [];

  let questions = collections.questions.map(question => question.title);
  questions.push(vocabulary.contacts);

  let answersCollections = collections.answers.map(function (collection) {
    let answers = collections.questions.map(function (question) {
      let answerObject = getAnswerToQuestion(question, collection.answers);

      return _getAnswerBasedOnType(question, answerObject);
    });

    answers.push(collection.contact.value);

    return answers;
  });

  result.push(questions);
  result.push.apply(result, answersCollections);

  return result;
}

function getAnswerToQuestion(question, answers) {
  return answers.find(answer => answer.questionId === question.id);
}

function _getAnswerBasedOnType(question, answer) {
  if(question.type === constants.questionTypes.one) {
    return _getOptionValue(question.options, answer.options[0]);
  }

  if(question.type === constants.questionTypes.many) {
    return _getOptionsValues(question.options, answer.options).join(', ');
  }

  if(question.type === constants.questionTypes.text) {
    return answer.value;
  }
}

function _getOptionValue(questionOptions, answerOption) {
  return questionOptions.find(function (option) {
    return option.id === answerOption.questionOptionId;
  }).value;
}

function _getOptionsValues(questionOptions, answerOptions) {
  return answerOptions.map(function (answerOption) {
    return _getOptionValue(questionOptions, answerOption);
  });
}

/**
 * Creates model and returns it.
 */

function _stringifyCSV(data) {
  return new Promise(function (resolve, reject) {
    csv.stringify(data, function (err, response) {
      if(err) {
        return reject(err);
      }

      resolve(response);
    });
  });
}

/**
 * Helper functions
 */

module.exports = repo;