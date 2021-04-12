const router = require('express').Router();
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');

const validateResource = require('../middleware/validateResource');

const schema = require('../schema/restaurant');

router.get('/', (req, res) => {
  Restaurant.find({}).exec((err, docs) => {
    if (err) {
      return res.status(500).json('error_retrieving_restaurants');
    }

    return res.json(docs);
  });
});

router.post('/add', validateResource(schema.add), async (req, res) => {
  try {
    let r = await new Restaurant({
      name: req.body.name,
      genre: req.body.genre,
    }).save();
    return res.json('Restaurant Added');
  } catch (e) {
    switch (e.code) {
      case 11000:
        // Duplicate Restaurant
        return res.status(400).json('Restaurant details must be unique');
    }
    return res.status(500).json(e);
  }
});

router.delete(
  '/:restaurantId',
  validateResource(schema.remove, 'params'),
  async (req, res) => {
    Customer.findByIdAndRemove(req.params.restaurantId).exec((err, docs) => {
      if (err) {
        return res.status(500).json('error_deleting_restaurant');
      }

      return res.json('Restaurant Deleted');
    });
  }
);

module.exports = router;
