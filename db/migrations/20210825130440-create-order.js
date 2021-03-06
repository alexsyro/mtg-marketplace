module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
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
      UserId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Orders');
  },
};
