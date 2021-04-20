const express = require('express');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const customerRouter = require('./routes/customer');
const ownerRouter = require('./routes/owner');
const restaurantRouter = require('./routes/restaurant');
const menuRouter = require('./routes/menu');
const orderRouter = require('./routes/order');
const discountRouter = require('./routes/discount');

const app = express();

const { User } = require('./models/User');

const swaggerDoc = YAML.load('./SwaggerDefinitions.yaml');

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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/user', customerRouter);
app.use('/owner', ownerRouter);
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
