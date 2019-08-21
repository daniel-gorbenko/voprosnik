'use strict';

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'templates';

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
 * Model definition:
 */

module.exports = function (sequelize, DataTypes) {
  var Template = sequelize.define('Template', {
    name: {
      type: DataTypes.STRING,
      field: 'name',
      allowNull: false
    },
    container: {
      type: DataTypes.TEXT,
      field: 'container',
      allowNull: false
    },
    startPage: {
      type: DataTypes.TEXT,
      field: 'startPage',
      allowNull: false
    },
    endPage: {
      type: DataTypes.TEXT,
      field: 'endPage',
      allowNull: false
    },
    question: {
      type: DataTypes.TEXT,
      field: 'question',
      allowNull: false
    },
    questionText: {
      type: DataTypes.TEXT,
      field: 'questionText',
      allowNull: false
    },
    questionOne: {
      type: DataTypes.TEXT,
      field: 'questionOne',
      allowNull: false
    },
    questionMany: {
      type: DataTypes.TEXT,
      field: 'questionMany',
      allowNull: false
    },
    formatLeft: {
      type: DataTypes.TEXT,
      field: 'formatLeft',
      allowNull: false
    },
    formatRight: {
      type: DataTypes.TEXT,
      field: 'formatRight',
      allowNull: false
    },
    formatTop: {
      type: DataTypes.TEXT,
      field: 'formatTop',
      allowNull: false
    },
    formatBottom: {
      type: DataTypes.TEXT,
      field: 'formatBottom',
      allowNull: false
    },
    css: {
      type: DataTypes.TEXT,
      field: 'css',
      allowNull: false
    },
    successPage: {
      type: DataTypes.TEXT,
      field: 'successPage',
      allowNull: false
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  //Template.publicFields = ['id', 'url'];

  return Template;
};