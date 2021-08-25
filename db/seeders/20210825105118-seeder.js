module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cards', [
      {
        name: 'Supercard',
        type: 'land',
        quality: 'NM',
        price: 100,
        img: '/img/cards/zasnezhennoe_boloto.jpeg',
        isFoil: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'blablaCard',
        type: 'land',
        quality: 'NM',
        price: 300,
        img: '/img/cards/ravnina.jpeg',
        isFoil: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cards', null, {});
  },
};
