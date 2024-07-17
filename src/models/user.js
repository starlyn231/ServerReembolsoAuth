// models/user.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/connection');

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true, // Permite valores NULL
      unique: false,
     
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roles: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    notifications: {
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