module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cards', [
      {
        name: 'Supercard',
        type: 'land',
        quality: 'NM',
        price: 100,
        img: 'zasnezhennoe_boloto.jpeg',
        isFoil: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'blablaCard',
        type: 'land',
        quality: 'NM',
        price: 300,
        img: 'ravnina.jpeg',
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
