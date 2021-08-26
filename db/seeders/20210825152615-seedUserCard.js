module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserCards', [
      {
        card_id: 1,
        user_login: 'iren',
        city: 'Saint-Petersburg',
        status: 'for sale',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        card_id: 2,
        user_login: 'jack',
        city: 'Moscow',
        status: 'sold',
        price: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserCards', null, {});
  },
};

