'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.TEXT,
        set:  function(v) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(v, salt);

            this.setDataValue('password', hash);
        }
      }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Event);
        User.hasMany(models.Request);
      }
    }
  });
  return User;
};
