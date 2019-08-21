'use strict';

var _ = require('lodash');
var sequelize = require('sequelize');

var constants = require('../../../client/admin/constants');

var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

var Statistic = models.Statistic;
var Block = models.Block;
var Question = models.Question;
var EndPage = models.EndPage;
var Contact = models.Contact;
var AnswerCollection = models.AnswerCollection;
var Answer = models.Answer;
var AnswerOption = models.AnswerOption;

/**
 * Repo definition:
 */

var repo = {};

/**
 * Methods definitions:
 */

repo.getStatistic = function (data) {
  let visitsCount = Statistic.count({ where: {blockId: data.blockId, action: constants.statistic.visit} });

  let answersToQuestionsCount = Question.findAll({
    where: { blockId: data.blockId },
    group: ['Question.id'],
    attributes: {include: [[sequelize.fn('COUNT', sequelize.col('answers.id')), 'quantity']]},
    include: [{
      model: Answer,
      as: 'answers',
      attributes: []
    }]
  });

  let contactsCount = Contact.count({
    include: [{
      model: EndPage,
      as: 'endPage',
      where: { blockId: data.blockId }
    }]
  });

  let opensCount = AnswerCollection.count({
    where: { blockId: data.blockId }
  });

  return Promise.all([visitsCount, answersToQuestionsCount, contactsCount, opensCount])
    .then(function (result) {
      return {
        visits: result[0],
        questions: result[1],
        contacts: result[2],
        opens: result[3]
      };
    });
};


/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.calc = function (data) {
  return Statistic.create(data);
};

/**
 * Exporting
 */

module.exports = repo;