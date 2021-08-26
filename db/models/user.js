const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserCard }) {
      User.hasMany(UserCard, { onUpdate: 'cascade', onDelete: 'cascade' });
    }
  }
  User.init({
    nickname: {
      type: DataTypes.TEXT,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
