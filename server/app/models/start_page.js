'use strict';

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'start_pages';

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

  var StartPage = sequelize.define('StartPage', {
    title: {
      type: DataTypes.STRING,
      field: 'title',
      allowNull: false,
      validate: {}
    },
    description: {
      type: DataTypes.STRING,
      field: 'description',
      allowNull: true,
      validate: {}
    },
    buttonText: {
      type: DataTypes.STRING,
      field: 'button_text',
      allowNull: true,
      validate: {}
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  //EndPage.publicFields = ['id', 'varType', 'content', 'placeHolder', 'description', 'value'];

  return StartPage;
};