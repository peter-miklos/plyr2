'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        unique:true,
        notEmpty:true,
        isEmail:true
      }
    },
    password: {
      type:DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: true
       }
    },
    password_confirmation: {
      type:DataTypes.VIRTUAL
    },
    password_digest: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true
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

  var hasSecurePassword = function(user, options, callback) {
  	if (user.password != user.password_confirmation) {
  		throw new Error("Password confirmation doesn't match Password");
  	}
  	bcrypt.hash(user.get('password'), 10, function(err, hash) {
  		if (err) return callback(err);
  		user.set('password_digest', hash);
  		return callback(null, options);
  	});
  };

//may eventually need similar funciton for updating users
  User.beforeCreate(function(user, options, callback) {
  	if (user.password)
  		hasSecurePassword(user, options, callback);
  	else
  		return callback(null, options);
  });


  return User;
};
