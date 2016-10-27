'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    location: DataTypes.STRING,
    skill: DataTypes.INTEGER,
    eventDate: DataTypes.DATE,
    eventTime: DataTypes.TIME,
    description: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    SportId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User);
        Event.belongsTo(models.Sport);
        Event.hasMany(models.Request);
      }
    }
  });
  return Event;
};
