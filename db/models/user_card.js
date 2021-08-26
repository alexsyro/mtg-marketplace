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
      UserCard.belongsTo(User, { onUpdate: 'cascade', onDelete: 'cascade' });
      UserCard.belongsTo(Card, { onUpdate: 'cascade', onDelete: 'cascade' });
    }
  }
  UserCard.init({
    cardCity: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'city',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Card',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    userNickname: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'nickname',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    status: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'UserCard',
  });
  return UserCard;
};
