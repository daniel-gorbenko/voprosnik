'use strict';

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'blocks';

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
  models.Block.hasMany(models.Question, { foreignKey: {name: 'blockId', allowNull: false}, as: 'questions' });
  models.Block.hasOne(models.EndPage, { foreignKey: {name: 'blockId', allowNull: false}, as: 'endPage' });
  models.Block.hasOne(models.StartPage, { foreignKey: {name: 'blockId', allowNull: false}, as: 'startPage' });
  models.Block.belongsTo(models.Template, { foreignKey: {name: 'templateId', allowNull: false}, as: 'template' });
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
  var Block = sequelize.define('Block', {
    format: {
      type: DataTypes.INTEGER,
      field: 'format',
      allowNull: false
    },
    colorMain: {
      type: DataTypes.STRING,
      field: 'colorMain',
      allowNull: false
    },
    colorAdditional: {
      type: DataTypes.STRING,
      field: 'colorAdditional',
      allowNull: false
    },
    showType: {
      type: DataTypes.INTEGER,
      field: 'showType',
      allowNull: false
    },
    showDelay: {
      type: DataTypes.INTEGER,
      field: 'showDelay',
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      field: 'status',
      allowNull: false
    },
    cached: {
      type: DataTypes.BOOLEAN,
      field: 'cached',
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      field: 'state',
      allowNull: false
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  Block.publicFields = ['id', 'url'];

  return Block;
};