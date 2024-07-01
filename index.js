const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { Sequelize } = require("sequelize");
config = require("./config");
const port =8000;
const sql = require("mssql");

const { User } = require("./test.js");
const authRoutes = require("./src/routes/auth");
const VerifyTokenRoutes = require("./src/routes/verifyToken.js");
const { sequelize } = require("./database/connection.js");
const errorHandler = require("./src/middlewares/errorHandler.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// route for auth
app.use("/api/auth", authRoutes);

app.use("/api", VerifyTokenRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});
app.get('/', (req, res) => {
  res.send('¡Hola, mundo lol!');
});

app.use(errorHandler);
console.log(port)
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
