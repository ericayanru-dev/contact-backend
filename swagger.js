const swaggerAutogen = require('swagger-autogen')();

require("dotenv").config()

const doc = {
  info: {
    title: 'Contact API',
    description: 'API documentation'
  },
  host: process.env.swagger
};

const outputFile = './swagger.json';
const routes = ['./routes/contactRoutes.js', './server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);