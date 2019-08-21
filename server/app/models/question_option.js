'use strict';

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'question_options';

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
 * Class methods definitions:
 */

/**
 * Model definition:
 */

module.exports = function (sequelize, DataTypes) {

  var QuestionOption = sequelize.define('QuestionOption', {
    value: {
      type: DataTypes.STRING,
      field: 'value',
      allowNull: false,
      validate: {}
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  QuestionOption.publicFields = ['id', 'value'];

  return QuestionOption;
};