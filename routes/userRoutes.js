const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const profileController = require('../controllers/profileController');



const authenticateToken = require('../middleware/authMiddleware');

// Signup route
router.post('/signup', userController.signup);

// Login route
router.post('/login', userController.login);


// User profile
router.get('/profile', authenticateToken, profileController.getUserProfile);
router.post('/updateUserProfile', authenticateToken, profileController.updateProfile);
router.post('/updatePassword', authenticateToken, profileController.updatePassword);


module.exports = router;
module.exports = router;  // ✅ must export router
