'use strict';

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'answers_collection';

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
  models.AnswerCollection.belongsTo(models.Block, { foreignKey: {name: 'blockId', allowNull: false}, as: 'block' });
  models.AnswerCollection.hasMany(models.Answer, { foreignKey: {name: 'answersCollectionId', allowNull: false}, as: 'answers' });
  models.AnswerCollection.hasOne(models.Contact, { foreignKey: {name: 'answersCollectionId', allowNull: false}, as: 'contact' });
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

  var AnswerCollection = sequelize.define('AnswerCollection', {
    completed: {
      type: DataTypes.BOOLEAN,
      field: 'completed',
      allowNull: true
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  //Answer.publicFields = ['id', 'varType', 'content', 'placeHolder', 'description', 'value'];

  return AnswerCollection;
};