'use strict';

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'statistic';

/**
 * Methods of the model's class. Example:
 * ...
 * User.someIndependentMethod()
 */

options.classMethods = {};

/**
 * Method for sequelize to associate models
 *
 * @param models
 */

options.classMethods.associate = function (models) {

};

/**
 * Methods of the model's instance. Example:
 *
 * var user = User.create({});
 * ...
 * user.someModelsMethod();
 */

options.instanceMethods = {

};

/**
 * List of table indexes
 *
 */

options.indexes = [

];

/**
 * Class methods definitions:
 */

/**
 * Model definition:
 */

module.exports = function (sequelize, DataTypes) {

  var Statistic = sequelize.define('Statistic', {
    action: {
      type: DataTypes.INTEGER,
      field: 'action',
      allowNull: false,
      validate: {}
    },
    blockId: {
      type: DataTypes.INTEGER,
      field: 'blockId',
      allowNull: false,
      validate: {}
    },
    questionId: {
      type: DataTypes.INTEGER,
      field: 'questionId',
      allowNull: true,
      validate: {}
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  Statistic.publicFields = ['id', 'action', 'blockId', 'questionId'];

  return Statistic;
};