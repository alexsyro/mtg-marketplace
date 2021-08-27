module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cards', [
      {
        name: 'Supercard',
        type: 'land',
        img: 'zasnezhennoe_boloto.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'blablaCard',
        type: 'land',
        img: 'ravnina.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cards', null, {});
  },
};
