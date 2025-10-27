require('dotenv').config();
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.placeOrder = async (req, res) => {
  try {
    const user_id = req.user.id; // user from authMiddleware

    if (!user_id) return res.status(400).json({ message: 'user_id is required' });
    
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: ['Product'],
    });

    if (!cartItems.length) return res.status(200).json({ message: 'Cart is empty' });

    const totalAmount = cartItems.reduce((sum, item) => {
      const price = item.Product?.product_price || 0;
      return sum + item.quantity * price;
    }, 0);

    const options = {
      amount: totalAmount * 100, // in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    await Order.create({
      user_id,
      total_amount: totalAmount,
      razorpay_order_id: razorpayOrder.id,
      status: 'pending',
      payment_method: req.body.payment_method || 'razorpay',
    });

    res.status(201).json({
      success: true,
      message: 'Razorpay order created successfully',
      orderId: razorpayOrder.id,
      amount: totalAmount,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      await Order.update(
        { status: "paid", razorpay_payment_id },
        { where: { razorpay_order_id } }
      );

      const order = await Order.findOne({ where: { razorpay_order_id } });
      await Cart.destroy({ where: { user_id: order.user_id } });

      return res.json({ success: true, message: "Payment verified successfully" });
    }

    res.status(400).json({ success: false, message: "Invalid signature" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error verifying payment", error: err.message });
  }
};
