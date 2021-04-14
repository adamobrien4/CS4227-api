const router = require('express').Router();
const { RestaurantOwner } = require('../models/User');

const validateResource = require('../middleware/validateResource');

const schema = require('../schema/customer');

router.post('/add', validateResource(schema.add), async (req, res) => {
  try {
    await new RestaurantOwner({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      address: req.body.address,
    }).save();
    return res.json('Restaurant Owner Added');
  } catch (e) {
    console.log(e);
    switch (e.code) {
      case 11000:
        // Duplicate Customer
        return res.status(400).json('Restaurant Owner details must be unique');
    }
    return res.status(500).json(e);
  }
});

module.exports = router;
