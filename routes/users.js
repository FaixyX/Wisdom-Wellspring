const express = require('express');

// Import controller functions for handling user operations
const { loginUser, signupUser } = require('../controllers/userController');

// Create a router instance
const router = express.Router();

// Route for handling user login
router.post('/login', loginUser);

// Route for handling user signup
router.post('/signup', signupUser);

// Export the router to use it in other parts of the application
module.exports = router;
