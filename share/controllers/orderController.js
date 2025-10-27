const Cart = require('../models/Cart');
const Order = require('../models/Order');


exports.placeOrder = async (req, res) => {
  try {
    const { user_id } = req.user.id;

    if (!user_id) return res.status(400).json({ message: 'user_id is required' });
    
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: ['Product']
    });

    if (!cartItems.length) return res.status(200).json({ message: 'Cart is empty' });

    const totalAmount = cartItems.reduce((sum, item) => {
      const price = item.Product?.product_price || 0;
      return sum + item.quantity * price;
    }, 0);

    // Create a new order
    const order = await Order.create({
      user_id,
      total_amount: totalAmount,
      status: 'pending'
    });

    await Cart.destroy({ where: { user_id } });

    res.status(201).json({ message: 'Order placed successfully', order });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error placing order', error: err.message });
  }
};



exports.getUserOrders = async (req, res) => {
    
    try{
        const userId = req.user.id;
        const orders = await Order.findAll({ where: {'user_id': userId}});

        if(!orders) return res.status(200).json({message: "you don't have any order"});

        res.status(200).json({message:"order fetched", data: orders});

    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
}
};


