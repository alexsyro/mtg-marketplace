module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserCards', [
      {
        card_id: 1,
        user_login: 'iren',
        city: 'Saint-Petersburg',
        status: 'for sale',
        quality: 'NM',
        price: 100,
        isFoil: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        card_id: 2,
        user_login: 'jack',
        city: 'Moscow',
        status: 'sold',
        quality: 'NM',
        price: 150,
        isFoil: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserCards', null, {});
  },
};

