const authenticateToken = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');
const express = require('express');
const router = express.Router();


// cart route
router.post('/addToCart', authenticateToken, cartController.addToCart);
// router.get('/viewCart/:userId', authenticateToken, cartController.getCartItems);
router.get('/viewCart', authenticateToken, cartController.getCartItems);

router.get('/cartRemoveItem/:itemId', authenticateToken, cartController.removeCartItems);


module.exports = router;
