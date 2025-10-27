const authenticateToken = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');
const express = require('express');
const router = express.Router();

// Product route
router.post('/addProduct', authenticateToken, productController.product);
router.get('/getProducts', authenticateToken, productController.getProducts);
router.get('/getProductId/:productId', authenticateToken, productController.getProductId);

module.exports = router;
