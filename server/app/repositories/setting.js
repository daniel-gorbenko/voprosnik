'use strict';

var sequelize = require('sequelize');
var mu2 = require('mu2');
var fs = require('fs');

var constants = require('../../../client/admin/constants');
var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

var Template = models.Template;
var Question = models.Question;
var Block = models.Block;
var EndPage = models.EndPage;
var StartPage = models.StartPage;
var QuestionOption = models.QuestionOption;

/**
 * Repo definition:
 */

var repo = {};

/**
 * Methods definitions:
 */

repo.getSettingsByWidgetId = function (widgetId) {
  return models.Block.find({
    where: {widgetId: widgetId, state: constants.blockStates.active, status: constants.status.active }
  })
    .then(_getSettings);
};

/**
 * Methods definitions:
 */

repo.getSettingsByBlockId = function (data) {
  return models.Block.find({
    where: {id: data.blockId}
  })
    .then(_getSettings);
};

/**
 * Methods definitions:
 */

function _getSettings(block) {
  if(!block) {
    return null;
  }

  var filter = {blockId: block.id};

  var questions = models.Question.findAll({
    where: filter,
    include: [{model: QuestionOption, as: 'options'}]
  });

  var endPage = models.EndPage.find({
    where: filter
  });

  var startPage = models.StartPage.find({
    where: filter
  });

  var template = models.Template.find({
    where: {id: block.templateId}
  });

  return Promise.all([startPage, questions, endPage, template])

    .then(function (promises) {
      var result = block.toJSON();

        result.startPage = promises[0];
        result.questions = promises[1];
        result.endPage = promises[2];
        result.template = promises[3];

      return result;
    });
}

/**
 * Exporting
 */

module.exports = repo;