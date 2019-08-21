'use strict';

var crypto = require('crypto');
var config = require('../../config');

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'users';

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
  models.User.hasMany(models.Widget, { foreignKey: {name: 'userId', allowNull: false}, as: 'widgets' });
  models.User.hasMany(models.Block, { foreignKey: {name: 'userId', allowNull: false}, as: 'blocks' });
  models.User.hasMany(models.Question, { foreignKey: {name: 'userId', allowNull: false}, as: 'questions' });
  models.User.hasMany(models.EndPage, { foreignKey: {name: 'userId', allowNull: false}, as: 'endPage' });
  models.User.hasMany(models.StartPage, { foreignKey: {name: 'userId', allowNull: false}, as: 'startPage' });
  models.User.belongsTo(models.Tariff, { foreignKey: {name: 'tariffId', allowNull: false}, as: 'tariff' });
};

/**
 * Returns hash of password and secret in md5 format.
 *
 * @param {String} password
 * @param {String} salt
 * @returns {String}
 */

options.classMethods.hashPassword = function hashPassword(password, salt) {
  return crypto.createHmac('sha256', salt)
    .update(password).digest('hex');
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
  { unique: true, fields: ['email'] }
];

/**
 * Model definition:
 */

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      field: 'email',
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'email'
        },
        isUnique: function (value, next) {
          User.find({where: {email: value}, attributes: ['id']})
            .done(function(user) {

              if (null !== user) {
                return next('unique.email');
              }

              next();
            });
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
      allowNull: false,
      validate: {
        len: {
          args: [2, 100],
          msg: 'len.name'
        }
      }
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      field: 'confirmed',
      allowNull: false,
      validate: {}
    },
    verificationToken: {
      type: DataTypes.STRING,
      field: 'verification_token',
      allowNull: true,
      validate: {}
    },
    lang: {
      type: DataTypes.STRING,
      field: 'lang',
      allowNull: false,
      validate: {}
    },
    active: {
      type: DataTypes.BOOLEAN,
      field: 'active',
      allowNull: false,
      validate: {}
    },
    accessFrom: {
      type: DataTypes.DATE,
      field: 'access_from',
      allowNull: false,
      validate: {}
    },
    accessTo: {
      type: DataTypes.DATE,
      field: 'access_to',
      allowNull: false,
      validate: {}
    },
    passwordHash: {
      type: DataTypes.STRING,
      field: 'password_hash',
      allowNull: false,
      validate: {}
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      set: function (val) {
        this.setDataValue('password', val);
        this.setDataValue('passwordHash', User.hashPassword(val, config.authentication.secrets.password));
      },
      validate: {
        len: {
          args: [6, 100],
          msg: 'len.password'
        }
      }
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  User.publicFields = ['id', 'name', 'email', 'active', 'accessTo', 'accessFrom', 'tariffId', 'lang', 'confirmed', 'createdAt', 'updatedAt'];

  return User;
};