'use strict';

var config = require('../../config');

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'tariffs';

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

options.classMethods.associate = function () {

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
 * Model definition:
 */

module.exports = function (sequelize, DataTypes) {
  var Tariff = sequelize.define('Tariff', {
    name: {
      type: DataTypes.STRING,
      field: 'name',
      allowNull: false,
      validate: {}
    },
    responses: {
      type: DataTypes.INTEGER,
      field: 'responses',
      allowNull: false,
      validate: {}
    },
    days: {
      type: DataTypes.INTEGER,
      field: 'days',
      allowNull: false,
      validate: {}
    },
    price: {
      type: DataTypes.DECIMAL(10, 0),
      field: 'price',
      allowNull: false,
      validate: {}
    },
    position: {
      type: DataTypes.INTEGER,
      field: 'position',
      allowNull: false,
      validate: {}
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  Tariff.publicFields = ['id', 'name', 'createdAt', 'updatedAt'];

  return Tariff;
};