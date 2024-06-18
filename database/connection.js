const sql = require("mssql");
const { Sequelize } = require("sequelize");
config = require("../config");

const sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_SERVER,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida con éxitow.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

module.exports = { sequelize };
