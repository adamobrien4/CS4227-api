const router = require('express').Router();
const { Customer } = require('../models/User');

const validateResource = require('../middleware/validateResource');

const schema = require('../schema/customer');

router.get('/:id', (req, res) => {
  Customer.findOne({ _id: req.params.id })
    .select('email password address')
    .exec((err, doc) => {
      if (err) {
        return res.status(500).json('error_retrieving_user');
      }

      return res.json(doc);
    });
});

router.post('/add', validateResource(schema.add), async (req, res) => {
  try {
    let c = await new Customer({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      address: req.body.address,
    }).save();
    return res.json('Customer Added');
  } catch (e) {
    switch (e.code) {
      case 11000:
        // Duplicate Customer
        return res.status(400).json('Customer details must be unique');
    }
    return res.status(500).json(e);
  }
});

router.delete(
  '/:customerId',
  validateResource(schema.remove, 'params'),
  async (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId).exec((err, docs) => {
      if (err) {
        return res.status(500).json('error_deleting_user');
      }

      return res.json('Customer Deleted');
    });
  }
);

module.exports = router;
