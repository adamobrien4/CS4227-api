const mongoose = require('mongoose');
const { Schema } = mongoose;

const discountSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Discount', discountSchema);
