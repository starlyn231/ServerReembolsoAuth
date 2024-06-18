const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { Sequelize } = require("sequelize");
config = require("./config");

const sql = require("mssql");

const { User } = require("./test.js");
const authRoutes = require("./src/routes/auth");
const { sequelize } = require("./database/connection.js");
const errorHandler = require("./src/middlewares/errorHandler.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// route for auth
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
});
