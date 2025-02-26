const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      qty: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  userId: { type: String, required: true }, // Clerk user id
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
