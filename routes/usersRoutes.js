const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/usersControllers');

// get all products
router.get('/', UsersControllers.getAllUsers);

// get a product by id
router.get('/:id', UsersControllers.getUserById);

// create a new product
router.post('/', UsersControllers.createUser);

// update a product by id
router.put('/:id', UsersControllers.updateUserById);

// delete a product by id
router.delete('/:id', UsersControllers.deleteUserById);

exports.modules = router;