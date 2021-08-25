'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    nickname: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.INTEGER,
    city: DataTypes.TEXT,
    phone: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};