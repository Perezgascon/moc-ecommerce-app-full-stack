// controllers/userControllers.js

const { User } = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashedPassword,
            address: req.body.address,
            email: req.body.email,
        });

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while registering the user.');
    }
};

// Login an existing user
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(400).send('User not found.');
        }
        console.log("Password from request:", req.body.password);
        console.log("Hashed password from database:", user.password);

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid password.');
        }

        const token = jwt.sign({ id: user.id, firstName: user.first_name, lastName: user.last_name }, process.env.TOKEN_SECRET);
        res.status(200).send({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while logging in.');
    }
};

// Verify token validity
exports.verifyToken = (req, res) => {
    res.status(200).send({ message: 'Token is valid.' });
};

// Update user information
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (user) {
            user.address = req.body.address;
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
