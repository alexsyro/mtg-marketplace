module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserCards', [
      {
        cardId: 1,
        userNickname: 'iren',
        cardCity: 'Saint-Petersburg',
        status: 'for sale',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardId: 2,
        userNickname: 'jack',
        cardCity: 'Moscow',
        status: 'sold',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserCards', null, {});
  },
};

