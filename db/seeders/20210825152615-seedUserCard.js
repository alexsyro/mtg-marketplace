module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserCards', [
      {
        cardId: 1,
        userNickname: 'iren',
        status: 'onsell',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardId: 2,
        userNickname: 'jack',
        status: 'onsell',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserCards', null, {});
  },
};

