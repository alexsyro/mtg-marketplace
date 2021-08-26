const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Card }) {
      Card.belongsToMany(User, { through: UserCard });
      User.belongsToMany(Card, { through: UserCard });
      // UserCard.belongsTo(User, { onUpdate: 'cascade', onDelete: 'cascade' });
      // UserCard.belongsTo(Card, { onUpdate: 'cascade', onDelete: 'cascade' });
    }
  }
  UserCard.init(
    {
      CardId: {
        field: 'card_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Card',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      UserLogin: {
        field: 'user_login',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'login',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      city: {
        type: DataTypes.TEXT,
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
    },
    {
      sequelize,
      modelName: 'UserCard',
    },
  );
  return UserCard;
};
