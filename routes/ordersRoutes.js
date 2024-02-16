const express = require('express');
const router = express.Router();
const OrdersControllers = require('../controllers/ordersControllers');

// get all products
router.get('/', OrdersControllers.getAllOrders);

// get a product by id
router.get('/:id', OrdersControllers.getOrderById);

// create a new product
router.post('/', OrdersControllers.createOrder);

// update a product by id
router.put('/:id', OrdersControllers.updateOrderById);

// delete a product by id
router.delete('/:id', OrdersControllers.deleteOrderById);

exports.modules = router;