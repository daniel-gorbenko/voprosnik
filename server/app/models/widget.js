'use strict';

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'widgets';

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
  models.Widget.hasMany(models.Block, { foreignKey: {name: 'widgetId', allowNull: false}, as: 'blocks' });
  models.Widget.hasMany(models.Review, { foreignKey: {name: 'widgetId', allowNull: false}, as: 'reviews' });
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
  var Widget = sequelize.define('Widget', {
    url: {
      type: DataTypes.STRING,
      field: 'url',
      allowNull: false,
      validate: {
        isURL: {
          protocols: ['http', 'https'],
          require_tld: true,
          require_protocol: false,
          require_host: true,
          require_valid_protocol: true,
          allow_underscores: false,
          host_whitelist: false,
          host_blacklist: false,
          allow_trailing_dot: false,
          allow_protocol_relative_urls: false
        }
      }
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  Widget.publicFields = ['id', 'url'];

  return Widget;
};