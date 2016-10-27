'use strict';
module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define('Request', {
    comment: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER,
    StatusId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Request.belongsTo(models.User);
        Request.belongsTo(models.Event);
        Request.belongsTo(models.Status);
      }
    }
  });
  return Request;
};
