// httpServer.js
const express = require('express');

const app = express();
const clientTestRoutes = require("../src/routes/clientAuthTest");
// Middleware para parsear JSON en las peticiones
app.use(express.json());

app.use("/api/v1", clientTestRoutes);

function startHttpServer() {
  const portHttp = process.env.PORT || 3001;
  app.listen(portHttp, () => {
    console.log(`Servidor HTTP corriendo en el puerto ${portHttp}`);
  });
}

module.exports = startHttpServer;
