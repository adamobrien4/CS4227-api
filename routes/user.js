const router = require('express').Router();

router.get('/', (req, res) => {
  User.find({}).exec((err, docs) => {
    if (err) {
      return res.status(500).json('error_retrieving_user');
    }

    return res.json({ users: docs });
  });
});

module.exports = router;
