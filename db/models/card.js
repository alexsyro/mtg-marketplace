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
    static associate(models) {
      // define association here
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
    is_foil: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};
