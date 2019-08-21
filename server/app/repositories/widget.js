'use strict';

var _ = require('lodash');

var config = require('../../config');
var constants = require('../../../client/admin/constants');
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
 * Get user rooms.
 */

repo.getWidgets = function (data) {
  return models.Widget.findAll({
    attributes: [
      'id',
      'url'
    ],
    where: {userId: data.userId},
    include: [{
      model: models.Block, as: 'blocks',
      where: {state: constants.blockStates.active},
      required: false
    }]
  });
};

/**
 * Get user rooms.
 */

repo.getWidget = function (data) {
  return models.Widget.find({
    group: 'state',
    where: {userId: data.userId, id: data.id},
    include: [{
      attributes: ['id', 'state'],
      model: models.Block, as: 'blocks'
    }]
  });
};

/**
 * Get user rooms.
 */

repo.getWidgetIdsByUserId = function (userId) {
  return models.Widget.findAll({
    attributes: ['id'],
    where: {userId: userId},
    raw: true
  })
    .then(function (widgets) {
      return widgets.map(function (widget) {
        return widget.id;
      })
    });
};

/**
 * Creates model and returns it.
 */

repo.markAsCachedById = function (id) {
  return models.Widget.update({cached: true}, {
    where: {id: id}
  });
};

/**
 * Get user rooms.
 */

repo.createWidget = function (data) {
  return models.Widget.create(data, {
    include: [{model: models.Block, as: 'blocks'}]
  });
};

/**
 * Helper functions
 */

module.exports = repo;