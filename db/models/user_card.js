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
    static associate({ User, Card }) {
      UserCard.belongsTo(User);
      UserCard.belongsTo(Card);
    }
  }
  UserCard.init({
    cardId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Card',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
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
