const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCard.init({
    cardId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'UserCard',
  });
  return UserCard;
};
