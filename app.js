const express = require('express');
require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const customerRouter = require('./routes/customer');
const restaurantRouter = require('./routes/restaurant');
const menuRouter = require('./routes/menu');
const orderRouter = require('./routes/order');
const discountRouter = require('./routes/discount');

const app = express();

const { User } = require('./models/User');

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
app.use('/user', customerRouter);
app.use('/restaurant', restaurantRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/discount', discountRouter);

app.get('/ping', (req, res) => {
  res.json('API Available');
});

app.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).json('user_not_found');
    }

    return res.json(user);
  });
});

module.exports = app;
