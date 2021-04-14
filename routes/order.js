const router = require('express').Router();
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');

const validateResource = require('../middleware/validateResource');

const OrderSchema = require('../schema/order');

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

router.post('/add', validateResource(OrderSchema.add), (req, res) => {
  console.log(req.body);

  let discountIncluded = false;

  let orderItems = req.body.orderItems;

  orderItems = orderItems.substring(1, orderItems.length - 1);
  orderItems = orderItems.split(',');

  orderItems = orderItems.map((item) => item.replace(new RegExp('"', 'g'), ''));

  let orderDetails = {
    customer: req.body.customer,
    restaurant: req.body.restaurant,
    address: req.body.address,
    foodCost: req.body.foodCost,
    deliveryCost: req.body.deliveryCost,
    totalCost: req.body.totalCost,
    orderItems: orderItems,
    created_at: new Date(),
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
      console.log(err);
      return res.status(500).json('Could not add order');
    }

    if (discountIncluded) {
      // TODO: Update discount to be redeemed
    }

    return res.json('Order Added');
  });
});

router.post('/edit', validateResource(OrderSchema.add), (req, res) => {
  Menu.findOne({ _id: req.params.menuId }).exec((err, doc) => {
    if (err) {
      return res.status(500).json('error_retrieving_menu');
    }

    return res.json(doc);
  });
});

router.post('/pay', validateResource(OrderSchema.pay), (req, res) => {
  console.log(req.body);
  Order.updateOne(
    {
      customer: req.body.customer,
      restaurant: req.body.restaurant,
      status: 'pending_payment',
    },
    {
      status: 'pending',
      paid_at: Date.now(),
    }
  ).exec((err, doc) => {
    if (err) {
      return res.status(500).json('error_retrieving_order');
    }

    return res.json('Order Paid');
  });
});

module.exports = router;
