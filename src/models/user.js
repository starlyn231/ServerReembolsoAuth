// models/user.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/connection');

const User = sequelize.define('User', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    PasswordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Rol: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    NotificationsWithEmail: {
      type: DataTypes.BOOLEAN,
      allowNull: true, 
    },
    // DateField: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    //   defaultValue: Sequelize.NOW, // Default value is the current date
    // }
  }, {
    tableName: 'UsersReembolso', 
    timestamps: false,
  });
  
  module.exports = User;