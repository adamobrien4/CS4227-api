const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  driver: {
    type: mongoose.Types.ObjectId,
  },
  restaurant: {
    type: mongoose.Types.ObjectId,
  },
  status: {
    type: String,
    enum: ['pending_payment', 'pending', 'completed'],
    default: 'pending_payment',
  },
  address: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  foodCost: {
    type: Number,
    required: true,
  },
  deliveryCost: {
    type: Number,
    required: true,
  },
  discountCode: {
    type: String,
    nullable: true,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  orderItems: {
    type: [String],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  paid_at: {
    type: Date,
  },
});

module.exports = mongoose.model('Order', orderSchema);
