const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserCard }) {
      Card.hasMany(UserCard);
    }
  }
  Card.init({
    name: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.TEXT,
    },
    quality: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    img: {
      type: DataTypes.TEXT,
    },
    isFoil: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};
