module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserCards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CardId: {
        field: 'card_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cards',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      CardName: {
        field: 'card_name',
        allowNull: false,
        type: Sequelize.STRING,
      },
      CardType: {
        field: 'card_type',
        allowNull: false,
        type: Sequelize.STRING,
      },
      UserLogin: {
        field: 'user_login',
        type: Sequelize.TEXT,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'login',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      city: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      isFoil: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      quality: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      status: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserCards');
  },
};
