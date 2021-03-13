const mongoose = require('mongoose');
const { Schema } = mongoose;

const userOptions = {
  discriminatorKey: 'type',
  collction: 'users',
};

const User = mongoose.model(
  'User',
  new Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        default: 'Unset Address',
      },
    },
    userOptions
  )
);

const Customer = User.discriminator('customer', new Schema({}));
const RestaurantOwner = User.discriminator('restaurantOwner', new Schema({}));
const DeliveryDriver = User.discriminator('driver', new Schema({}));

module.exports = {
  User,
  Customer,
  RestaurantOwner,
  DeliveryDriver,
};
