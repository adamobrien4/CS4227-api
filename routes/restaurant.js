const router = require('express').Router();
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');

const validateResource = require('../middleware/validateResource');

const RestaurantSchema = require('../schema/restaurant');

/**
 * @swagger
 *  /restaurant:
 *    get:
 *      summary: Retrieve list of restaurants from the database
 *      tags:
 *        - Restaurant
 */
router.get('/', (req, res) => {
  Restaurant.find({}).exec((err, docs) => {
    if (err) {
      return res.status(500).json('error_retrieving_restaurants');
    }

    return res.json(docs);
  });
});

router.post('/addtest', (req, res) => {
  const menuObj = new Menu({
    name: 'the menu',
    main_course: [
      {
        name: 'Cheese Pizza',
        allergens: ['Wheat', 'Dairy'],
        price: 12.75,
      },
      {
        name: 'Pepperoni Pizza',
        allergens: ['Wheat', 'Dairy'],
        price: 14.75,
      },
    ],
    dessert: [
      {
        name: 'Ice-Cream Cone - 1 Scoop',
        allergens: ['Dairy'],
        price: 1.25,
      },
      {
        name: 'Ice-Cream Cone - 2 Scoop',
        allergens: ['Dairy'],
        price: 2.5,
      },
      {
        name: 'Ice-Cream Cone - 3 Scoop',
        allergens: ['Dairy'],
        price: 3.15,
      },
    ],
    sides: [
      {
        name: 'Chips',
        allergens: ['Gluten'],
        price: 3.2,
      },
      {
        name: 'Garlic Dip',
        allergens: ['Dairy'],
        price: 1.15,
      },
      {
        name: 'BBQ Dip',
        allergens: ['Dairy'],
        price: 1.15,
      },
    ],
    drinks: [
      {
        name: '7-Up',
        price: 2.5,
      },
      {
        name: 'Sprite',
        price: 2.25,
      },
      {
        name: 'CokeCola',
        price: 2.2,
      },
      {
        name: 'Fanta',
        price: 3.1,
      },
    ],
  });

  const restaurantObj = new Restaurant({
    name: 'Adam Restaurant',
    genre: 'Gastro Pub',
  }).save((err, rdoc) => {
    if (err) {
      console.error(err);
      return res.status(500).json('Could not add Restaurant');
    }

    menuObj.restaurant = rdoc._id;
    menuObj.save((err, mdoc) => {
      if (err) {
        console.error(err);
        return res.status(500).json('Could not add Menu');
      }

      rdoc.menu = mdoc._id;
      rdoc.save((err, doc) => {
        if (err) {
          console.error(err);
          return res.status(500).json('Could not add Menu');
        }

        return res.json('Restaurant Addded');
      });
    });
  });
});

router.post(
  '/add',
  /* validateResource(schema.add), */ async (req, res) => {
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
  }
);

router.delete(
  '/:customerId',
  // validateResource(schema.remove, 'params'),
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
