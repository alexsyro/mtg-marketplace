const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, UserCard }) {
      Card.hasMany(User, { through: UserCard });

      // Card.hasMany(UserCard, { onUpdate: "cascade", onDelete: "cascade" });
    }
  }
  Card.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      allowNull: false,
      quality: {
        type: DataTypes.TEXT,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      img: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      isFoil: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Card',
    },
  );
  return Card;
};
