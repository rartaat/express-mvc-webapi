'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flat = sequelize.define('Flat', {
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    flootArea: DataTypes.INTEGER,
    country: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    city: DataTypes.STRING,
    street: DataTypes.STRING
  }, {});
  Flat.associate = function(models) {
    // associations can be defined here
  };
  return Flat;
};