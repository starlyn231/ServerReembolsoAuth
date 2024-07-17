'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('UsersReembolso', 'username', 'username');
    await queryInterface.renameColumn('UsersReembolso', 'email', 'email');
     await queryInterface.renameColumn('UsersReembolso', 'password', 'password');
     await queryInterface.renameColumn('UsersReembolso', 'rol', 'roles');
     await queryInterface.renameColumn('UsersReembolso', 'notificationsWithEmail', 'notifications');
     await queryInterface.renameColumn('UsersReembolso', 'Id', 'id');
    // Agregar más renombramientos según sea necesario
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('UsersReembolso', 'username', 'username');
    await queryInterface.renameColumn('UsersReembolso', 'email', 'Email');
    await queryInterface.renameColumn('UsersReembolso', 'roles', 'rol');
    await queryInterface.renameColumn('UsersReembolso', 'notifications', 'notificationsWithEmail');
    await queryInterface.renameColumn('UsersReembolso', 'id', 'Id');
    // Agregar más renombramientos según sea necesario
  }
};
