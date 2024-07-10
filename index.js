const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { Sequelize } = require("sequelize");
config = require("./config");

const sql = require("mssql");
const authRoutes = require("./src/routes/auth");
const clientTestRoutes = require("./src/routes/clientAuthTest.js");
const VerifyTokenRoutes = require("./src/routes/verifyToken.js");
const { sequelize } = require("./database/connection.js");
const fs = require("fs");
const https = require("https");
// const startHttpsServer = require("./httpServerModules/httpsServer.js");
// const startHttpServer = require("./httpServerModules/httpServer.js");
const swaggerDefinition = require("./config/swaggerConfig.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
(swaggerJsdoc = require("swagger-jsdoc")),
  (swaggerUi = require("swagger-ui-express"));

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["src/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", clientTestRoutes);
app.use("/api", VerifyTokenRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});
app.get("/", (req, res) => {
  res.redirect('/api-docs');
});

// sequelize.sync().then(() => {
//   app.listen(process.env.PORT || 3001 , () => {
//     console.log(`Server listening on port ${process.env.PORT }`);
//   });
// });

function startHttpsServer() {
  const sslOptions = {
    cert: fs.readFileSync(process.env.SSL_CRT_FILE),
    key: fs.readFileSync(process.env.SSL_KEY_FILE),
  };

;
  https.createServer(sslOptions, app).listen(process.env.PORTHTTPS, () => {
    console.log(`Servidor HTTPS corriendo en el puerto ${process.env.PORTHTTPS}`);
  });
}

// Iniciar el servidor
sequelize.sync().then(() => {
  startHttpsServer();

  const portHttp = process.env.PORT || 3001;
  app.listen(portHttp, () => {
    console.log(`Servidor HTTP corriendo en el puerto ${portHttp}`);
  });
});