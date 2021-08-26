module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        login: 'jack',
        email: 'jack@jack.com',
        password: 'jack',
        city: 'Moscow',
        phone: '+79000000001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'iren',
        email: 'iren@iren.com',
        password: 'iren',
        city: 'Saint-Petersburg',
        phone: '+79000000002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
