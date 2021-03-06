const express = require('express');
require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const customerRouter = require('./routes/customer');

const app = express();

// Swagger Setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'CS4227 Design Pattern Project',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It serves as a data server for the CS4227 Design Project.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'CS4227 Design Project API',
      url: 'http://localhost:5000/',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(express.json());

// Enable CORS for all routes
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/customer', customerRouter);

app.get('/', (req, res) => {
  res.json('api live');
});

module.exports = app;
