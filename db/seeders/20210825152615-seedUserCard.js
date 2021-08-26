module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserCards', [
      {
        cardCity: 'Saint-Petersburg',
        cardId: 1,
        userNickname: 'iren',
        status: 'for sale',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardCity: 'Moscow',
        cardId: 2,
        userNickname: 'jack',
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

