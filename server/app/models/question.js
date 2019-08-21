'use strict';

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'questions';

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
  models.Question.hasMany(models.QuestionOption, { foreignKey: {name: 'questionId', allowNull: false}, as: 'options' });
  models.Question.hasMany(models.Answer, { foreignKey: {name: 'questionId', allowNull: false}, as: 'answers' });
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

  var Question = sequelize.define('Question', {
    type: {
      type: DataTypes.INTEGER,
      field: 'type',
      allowNull: false,
      validate: {}
    },
    title: {
      type: DataTypes.STRING,
      field: 'title',
      allowNull: false,
      validate: {}
    },
    placeholder: {
      type: DataTypes.STRING,
      field: 'placeholder',
      allowNull: true,
      validate: {}
    },
    description: {
      type: DataTypes.STRING,
      field: 'description',
      allowNull: true,
      validate: {}
    },
    position: {
      type: DataTypes.INTEGER,
      field: 'position',
      allowNull: false,
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

  Question.publicFields = ['id', 'varType', 'content', 'placeHolder', 'description', 'value'];

  return Question;
};