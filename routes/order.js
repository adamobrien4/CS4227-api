const router = require('express').Router();
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');

const validateResource = require('../middleware/validateResource');

const OrderSchema = require('../schema/order');

/**
 * @swagger
 *  /order{id}:
 *    get:
 *      summary: Retrieve an order from the database
 *      tags:
 *        - Order
 */
router.get(
  '/:menuId',
  validateResource(OrderSchema.get, 'params'),
  (req, res) => {
    Menu.findOne({ _id: req.params.menuId }).exec((err, doc) => {
      if (err) {
        return res.status(500).json('error_retrieving_menu');
      }

      return res.json(doc);
    });
  }
);

/**
 * @swagger
 *  /order/add:
 *    post:
 *      summary: Add a new order
 *      tags:
 *        - Order
 */
router.post('/add', validateResource(OrderSchema.add), (req, res) => {
  console.log(req.body);

  let discountIncluded = false;

  let orderItems = req.body.orderItems;

  orderItems = orderItems.substring(1, orderItems.length - 1);
  orderItems = orderItems.split(',');

  orderItems = orderItems.map((item) => item.replace(new RegExp('"', 'g'), ''));

  let orderDetails = {
    restaurant: req.body.restaurant,
    address: req.body.address,
    foodCost: req.body.foodCost,
    deliveryCost: req.body.deliveryCost,
    totalCost: req.body.totalCost,
    orderItems: orderItems,
  };

  if (req.body.discountCode) {
    discountIncluded = true;
    orderDetails = {
      ...orderDetails,
      discountCode: req.body.discountCode,
      discountAmount: req.body.discountAmount,
    };
  }

  new Order(orderDetails).save((err, doc) => {
    if (err) {
      return res.status(500).json('Could not add order');
    }

    if (discountIncluded) {
      // TODO: Update discount to be redeemed
    }

    return res.json('Order Added');
  });
});

/**
 * @swagger
 *  /order/edit:
 *    post:
 *      summary: Retrieve an order from the database
 *      tags:
 *        - Order
 */
router.post('/edit', validateResource(OrderSchema.add), (req, res) => {
  Menu.findOne({ _id: req.params.menuId }).exec((err, doc) => {
    if (err) {
      return res.status(500).json('error_retrieving_menu');
    }

    return res.json(doc);
  });
});

module.exports = router;
