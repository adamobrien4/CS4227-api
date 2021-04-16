const router = require('express').Router();
const Restaurant = require('../models/Restaurant');
const { RestaurantOwner } = require('../models/User');

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

router.post(
  '/add/:ownerEmail',
  validateResource(schema.add),
  async (req, res) => {
    console.log(req.body);
    try {
      let owner = await RestaurantOwner.findOne({
        email: req.params.ownerEmail,
      });

      let rest = await new Restaurant({
        name: req.body.name,
        genre: req.body.genre,
        menu: req.body.menu,
        type: req.body.type,
        owner: owner._id,
      }).save();

      await RestaurantOwner.findOneAndUpdate(
        { _id: owner._id },
        { restaurant: rest._id }
      );

      return res.json('Restaurant Added');
    } catch (e) {
      console.log(e);
      switch (e.code) {
        case 11000:
          // Duplicate Restaurant
          return res.status(400).json('Restaurant details must be unique');
      }
      return res.status(500).json(e);
    }
  }
);

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
