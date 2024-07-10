// httpsServer.js
const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const clientTestRoutes = require("../src/routes/clientAuthTest");
require('dotenv').config(); // Cargar variables de entorno
const app = express();
// Middleware para parsear JSON en las peticiones
app.use(express.json());

app.use("/api/v1", clientTestRoutes);
app.get("/", (req, res) => {
    res.send("server with certificate with https!");
  });
  

function startHttpsServer() {
  const sslOptions = {
    cert: fs.readFileSync(process.env.SSL_CRT_FILE),
    key: fs.readFileSync(process.env.SSL_KEY_FILE),
  };

  const portHttps = 8443;
  https.createServer(sslOptions, app).listen(portHttps, () => {
    console.log(`Servidor HTTPS corriendo en el puerto ${portHttps}`);
  });
}

module.exports = startHttpsServer;
