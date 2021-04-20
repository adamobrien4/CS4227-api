const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  allergens: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = foodItemSchema;
