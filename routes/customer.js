const router = require('express').Router();
const { Customer } = require('../models/User');

const validateResource = require('../middleware/validateResource');

const schema = require('../schema/customer');

/**
 * @swagger
 *  /customer/{id}:
 *    get:
 *      summary: Retrieve a customer from the database using their _id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            example: 5fd0e0dfd7ee5227093099a7
 *          required: true
 */
router.get('/:id', (req, res) => {
  Customer.findOne({ _id: req.params.id }).exec((err, doc) => {
    if (err) {
      return res.status(500).json('error_retrieving_user');
    }

    return res.json(doc);
  });
});

router.get('/getAll', (req, res) => {
  Customer.find({}).exec((err, docs) => {
    if (err) {
      return res.status(500).json('error_retrieving_user');
    }

    console.log(docs);

    return res.json(docs);
  });
});

router.post('/add', validateResource(schema.add), async (req, res) => {
  try {
    let c = await new Customer({
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
    }).save();
    return res.json('inserted');
  } catch (e) {
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

      return res.json('deleted');
    });
  }
);

module.exports = router;
