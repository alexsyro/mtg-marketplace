const { Model } = require('sequelize');
const UserModel = require('./user');
const CardModel = require('./card');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Card }) {
      Order.belongsTo(Card);
      Order.belongsTo(User);
    }
  }
  Order.init(
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
      UserId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      isFoil: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      quality: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      number: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
      modelName: 'Order',
    }
  );
  return Order;
};
