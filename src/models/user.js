// models/user.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/connection');

const User = sequelize.define('User', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
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
  }, {
    tableName: 'Users', // Asegúrate de que el nombre de la tabla es correcto
    schema: 'dbo', 
    timestamps: false,
  });
  
  module.exports = User;