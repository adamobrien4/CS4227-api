const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodItemSchema = require('./FoodItem');
const drinkItemSchema = require('./DrinkItem');

const menuSchema = new Schema({
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: 'Restaurant',
  },
  name: {
    type: String,
    required: true,
  },
  main_course: {
    type: [foodItemSchema],
  },
  dessert: {
    type: [foodItemSchema],
  },
  sides: {
    type: [foodItemSchema],
  },
  drinks: {
    type: [drinkItemSchema],
  },
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
