const authenticateToken = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');
const express = require('express');
const router = express.Router();

// order route
router.post('/addOrder', authenticateToken, orderController.placeOrder);
router.get('/getOrders', authenticateToken, orderController.getUserOrders);

module.exports = router;
