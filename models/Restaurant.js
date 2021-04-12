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
  type: {
    type: String,
    enum: ['Family_Friendly', 'Over_18', 'Verified_Only'],
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
