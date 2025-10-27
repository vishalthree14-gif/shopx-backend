const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authenticateToken = require('../middleware/authMiddleware');

// Create order route
router.post('/create-order', authenticateToken, paymentController.placeOrder);

// Verify payment route
router.post('/verify-payment', authenticateToken, paymentController.verifyPayment);

module.exports = router;
