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

const appInsights = require('applicationinsights');
appInsights.setup("77dd4ef2-a631-4c76-99c0-1bbed8869c2a")    .setAutoCollectRequests(true)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
    .start();

// Import the useAzureMonitor function and the AzureMonitorOpenTelemetryOptions class from the @azure/monitor-opentelemetry package.
const { useAzureMonitor, AzureMonitorOpenTelemetryOptions } = require("@azure/monitor-opentelemetry");

// Create a new AzureMonitorOpenTelemetryOptions object.
const options = {
  azureMonitorExporterOptions: {
    connectionString: "InstrumentationKey=77dd4ef2-a631-4c76-99c0-1bbed8869c2a;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=6df8d8e6-9fbf-49e9-95ea-1990a0aa3747"
  }
};

// Enable Azure Monitor integration using the useAzureMonitor function and the AzureMonitorOpenTelemetryOptions object.
useAzureMonitor(options);

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
