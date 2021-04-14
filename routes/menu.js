const router = require('express').Router();
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');
const { RestaurantOwner } = require('../models/User');

const validateResource = require('../middleware/validateResource');

const schema = require('../schema/menu');

router.get('/:menuId', validateResource(schema.get, 'params'), (req, res) => {
  Menu.findOne({ _id: req.params.menuId }).exec((err, doc) => {
    if (err) {
      return res.status(500).json('error_retrieving_menu');
    }

    return res.json(doc);
  });
});

router.post(
  '/add/:ownerEmail',
  validateResource(schema.add),
  async (req, res) => {
    let main = req.body.main_course.map((item) => ({
      name: item.name,
      allergens: item.allergens,
      price: item.price,
    }));
    let dessert = req.body.dessert.map((item) => ({
      name: item.name,
      allergens: item.allergens,
      price: item.price,
    }));
    let sides = req.body.sides.map((item) => ({
      name: item.name,
      allergens: item.allergens,
      price: item.price,
    }));
    let drinks = req.body.drinks.map((item) => ({
      name: item.name,
      price: item.price,
    }));

    try {
      let owner = await RestaurantOwner.findOne({
        email: req.params.ownerEmail,
      });

      let menu = await new Menu({
        name: req.body.name,
        main_course: main,
        dessert: dessert,
        sides: sides,
        drinks: drinks,
      }).save();

      await Restaurant.findOneAndUpdate(
        { owner: owner._id },
        { $set: { menu: menu._id } },
        { useFindAndModify: true }
      );
      return res.json('Menu Added');
    } catch (e) {
      console.log(e);
      switch (e.code) {
        case 11000:
          // Duplicate Restaurant
          return res.status(400).json('Menu details must be unique');
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
