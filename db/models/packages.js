'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class packages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  packages.init({
    name: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'packages',
  });
  return packages;
};