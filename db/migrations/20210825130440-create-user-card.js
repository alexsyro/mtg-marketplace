module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserCards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cards',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      userNickname: {
        type: Sequelize.TEXT,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'nickname',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      status: {
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
