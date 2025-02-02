
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Express API for JSONPlaceholder",
      version: "1.0.0",
      description:
        "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "JSONPlaceholder",
        url: "https://jsonplaceholder.typicode.com",
      },
    },
    servers: [
      {
      
        url: "https://oauthwws.azurewebsites.net/api/v1",
        description: "Development server azure",
      },
      {
        url: "http://localhost:3001/api/v1",
      description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  };

  module.exports = swaggerDefinition;