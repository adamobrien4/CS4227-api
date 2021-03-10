const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  menu: {
    type: mongoose.Types.ObjectId,
    ref: 'Menu',
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
