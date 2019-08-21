'use strict';

var _ = require('lodash');

var config = require('../../config');
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

/**
 * Creates model and returns it.
 */

repo.getByState = function (data) {
  let filter = {widgetId: data.widgetId, userId: data.userId, state: data.state};

  if(data.state == constants.blockStates.version) {
    filter.id = data.blockId;
  }

  return Block.find({
    where: filter
  });
};

/**
 * Creates model and returns it.
 */

repo.getVersions = function (data) {
  return Block.findAll({
    where: {widgetId: data.widgetId, userId: data.userId, state: constants.blockStates.version}
  });
};

/**
 * Get user rooms.
 */

repo.currentActiveToVersion = function (data) {
  return models.Block.update({state: constants.blockStates.version}, {
    where: {userId: data.userId, widgetId: data.widgetId, state: constants.blockStates.active}
  });
};

/**
 * Get user rooms.
 */

repo.makeVersion = function (data) {
  return models.Block.update({state: constants.blockStates.version}, {
    where: {userId: data.userId, id: data.id}
  });
};

/**
 * Get user rooms.
 */

repo.activate = function (data) {
  return models.Block.update({state: constants.blockStates.active}, {
    where: {userId: data.userId, widgetId: data.widgetId, state: constants.blockStates.edit}
  });
};

/**
 * Get user rooms.
 */

repo.edit = function (data) {
  return models.Block.create(data, {
    include: [
      {
        model: models.StartPage,
        as: 'startPage'
      },
      {
        model: models.EndPage,
        as: 'endPage'
      },
      {
        model: models.Question,
        as: 'questions',
        include: [{model: models.QuestionOption, as: 'options'}]
      }
    ]
  });
};

/**
 * Creates model and returns it.
 */

repo.create = function (data) {
  return Block.create(data);
};

/**
 * Creates model and returns it.
 */

repo.update = function (data) {
  return Block.update(data, {
    where: {id: data.id, userId: data.userId}
  });
};

/**
 * Creates model and returns it.
 */

repo.updateStatus = function (data) {
  return Block.update({status: data.status}, {
    where: {id: data.id, userId: data.userId}
  });
};

/**
 * Creates model and returns it.
 */

repo.getBlock = function (data) {
  return Block.find({
    where: {id: data.id, userId: data.userId},
    include: [{
      model: Template,
      as: 'template',
      attributes: ['id', 'name']
    }]
  });
};

/**
 * Creates model and returns it.
 */

repo.getBlockByUser = function (data) {
  return Block.find({
    where: {id: data.id, userId: data.userId},
    include: [{
      model: Template,
      as: 'template',
      attributes: ['id', 'name']
    }]
  });
};

/**
 * Creates model and returns it.
 */

repo.getCached = function (data) {
  return Block.find({
    where: {id: data.id, cached: true},
    attributes: ['id', 'cached']
  });
};

/**
 * Creates model and returns it.
 */

repo.markAsCachedById = function (id) {
  return Block.update({cached: true}, {
    where: {id: id}
  });
};

/**
 * Creates model and returns it.
 */

repo.markAsUnCachedById = function (id) {
  return Block.update({cached: false}, {
    where: {id: id}
  });
};

/**
 * Creates model and returns it.
 */

repo.getPages = function (data) {
  let filter = { userId: data.userId, widgetId: data.widgetId, state: data.state };

  if(data.state == constants.blockStates.version) {
    filter.id = data.versionId;
  }

  return Block.find({
    where: filter,
    raw: true
  })
    .then(_getPagesByBlock);
};

/**
 * Creates model and returns it.
 */

repo.copyActiveBlock = function (data) {
  let filter = { userId: data.userId, widgetId: data.widgetId, state: data.state };

  if(data.state == constants.blockStates.version) {
    filter.id = data.versionId;
  }

  return Block.find({
    where: filter,
    raw: true
  })
    .then(_getActiveBlockData);
};

/**
 * Creates model and returns it.
 */

function _getPagesByBlock(block) {
  if(!block) {
    return null;
  }

  var filter = {blockId: block.id};

  var questions = models.Question.findAll({
    where: filter,
    raw: true
  });

  var endPage = models.EndPage.find({
    where: filter,
    raw: true
  });

  var startPage = models.StartPage.find({
    where: filter,
    raw: true
  });

  return Promise.all([startPage, questions, endPage])
    .then(function (promises) {
      block.startPage = promises[0];
      block.questions = promises[1];
      block.endPage = promises[2];

      return block;
    });
};

/**
 * Creates model and returns it.
 */

function _getActiveBlockData(block) {
  if(!block) {
    return null;
  }

  var filter = {blockId: block.id};

  var questions = models.Question.findAll({
    where: filter,
    attributes: { exclude: ['id', 'blockId'] },
    include: [{
      model: models.QuestionOption,
      as: 'options',
      attributes: { exclude: ['id', 'questionId'] },
      raw: true
    }]
  });

  var endPage = models.EndPage.find({
    where: filter,
    attributes: { exclude: ['id', 'blockId'] },
    raw: true
  });

  var startPage = models.StartPage.find({
    where: filter,
    attributes: { exclude: ['id', 'blockId'] },
    raw: true
  });

  return Promise.all([startPage, questions, endPage])
    .then(function (promises) {
      delete block.id;

      block.startPage = promises[0];
      block.questions = promises[1];
      block.endPage = promises[2];

      return block;
    });
};

/**
 * Get user rooms.
 *
 * @param userId ID of user
 * @returns {Promise.<T>|*}
 */

repo.getBlocks = function (data) {
  return Block.findAll({
    where: {userId: data.userId}
  });
};

/**
 * Helper functions
 */

module.exports = repo;