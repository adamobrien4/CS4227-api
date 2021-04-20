const router = require('express').Router();
const Discount = require('../models/Discount');

const validateResource = require('../middleware/validateResource');

const schema = require('../schema/discount');

/**
 * @swagger
 *  /discount:
 *    get:
 *      summary: Retrieve a discount from the database
 *      tags:
 *        - Discount
 */
router.get('/:code', validateResource(schema.get, 'params'), (req, res) => {
  Discount.findOne({ code: req.params.code }).exec((err, doc) => {
    if (err) {
      return res.status(500).json('error_retrieving_discount');
    }

    return res.json(doc);
  });
});

module.exports = router;
