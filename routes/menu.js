const router = require('express').Router();
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');

const validateResource = require('../middleware/validateResource');

const MenuSchema = require('../schema/menu');

/**
 * @swagger
 *  /menu:
 *    get:
 *      summary: Retrieve a menu from the database
 *      tags:
 *        - Menu
 */
router.get(
  '/:menuId',
  validateResource(MenuSchema.get, 'params'),
  (req, res) => {
    Menu.findOne({ _id: req.params.menuId }).exec((err, doc) => {
      if (err) {
        return res.status(500).json('error_retrieving_menu');
      }

      return res.json(doc);
    });
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
