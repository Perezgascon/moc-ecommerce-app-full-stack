const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/usersModel');
const { authenticateJWT } = require('../middlewares/authMiddleware');

//GET all users

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST - /register - register new user
router.post('/register', async (req, res) => {
    try {
        // define salt rounds
        const saltRounds = 10;

        // hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // create the user
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashedPassword,
            address: req.body.address,
            email: req.body.email,
        });

        // send the user back
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while registering the user.');
    }
});

// POST - /login - login existing user
router.post('/login', async (req, res) => {
    try {
        // find the user
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        // check if the user exists
        if (!user) {
            return res.status(400).send('User not found.');
        }

        // check if the password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid password.');
        }

        // create and assign a token
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ id: user.id, firstName: user.firstName, lastName: user.lastName }, process.env.TOKEN_SECRET);
            res.status(200).send({ token });
        } else {
            res.status(400).send('Invalid password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while logging in.');
    }
});

// GET - /verifyToken - authenticate JSON Web Token Validity
router.get('/verifyToken', authenticateJWT, async (req, res) => {
    res.status(200).send({ message: 'Token is valid.' });
});

// update user information

router.put('/:userId', async (req, res) => {
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
});

exports.modules = router;