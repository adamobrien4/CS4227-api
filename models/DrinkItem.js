const mongoose = require('mongoose');
const { Schema } = mongoose;

const drinkItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = drinkItemSchema;
