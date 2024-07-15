// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const { authenticateJWT } = require('../middlewares/authMiddleware');

// Get all users
router.get('/', usersControllers.getAllUsers);

// Register a new user
router.post('/register', usersControllers.registerUser);

// Login an existing user
router.post('/login', usersControllers.loginUser);

// Verify token validity
router.get('/verifyToken', authenticateJWT, usersControllers.verifyToken);

// Update user information
router.put('/:userId', usersControllers.updateUser);

// Get user by ID
router.get('/:userId', usersControllers.getUserById);

exports.modules = router;