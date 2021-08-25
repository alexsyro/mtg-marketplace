module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        nickname: 'jack',
        email: 'jack@jack.com',
        password: 'jack',
        city: 'Moscow',
        phone: '+79000000001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nickname: 'iren',
        email: 'iren@iren.com',
        password: 'iren',
        city: 'Moscow',
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
