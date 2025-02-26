const Order = require('../models/Order');

// Create new order
exports.createOrder = async (req, res) => {
  const { orderItems, totalPrice, userId } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }
  try {
    const order = new Order({
      orderItems,
      totalPrice,
      userId,
      isPaid: false
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all orders (Admin only)
exports.getOrders = async (req, res) => {
  try {
    // Populate orderItems.product to get product details (assuming your orderItems array stores product IDs)
    const orders = await Order.find({}).populate('orderItems.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
