// import the model
const { User } = require('../models/usersModel');

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get a user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// create a new user
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// update a user by id
exports.updateUserById = async (req, res) => {
    try {
        const user = await User.update(req.body, {
            where: {
                user_id: req.params.id
            }
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// delete a user by id
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                user_id: req.params.id
            }
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User deleted' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
