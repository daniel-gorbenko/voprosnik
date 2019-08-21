'use strict';

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'contacts';

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
  models.Contact.belongsTo(models.EndPage, { foreignKey: {name: 'endPageId', allowNull: false}, as: 'endPage' });
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

  var Contact = sequelize.define('Contact', {
    value: {
      type: DataTypes.STRING,
      field: 'value',
      allowNull: true
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  //Answer.publicFields = ['id', 'varType', 'content', 'placeHolder', 'description', 'value'];

  return Contact;
};