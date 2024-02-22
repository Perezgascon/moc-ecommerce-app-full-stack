const express = require('express');
const router = express.Router();
const OrderItemsControllers = require('../controllers/orderItemsControllers');

// get all products
router.get('/', OrderItemsControllers.getAllOrderItems);

// get a product by id
router.get('/:id', OrderItemsControllers.getOrderItemById);

// create a new product
router.post('/', OrderItemsControllers.createOrderItem);

// update a product by id
router.put('/:id', OrderItemsControllers.updateOrderItemById);

// delete a product by id
router.delete('/:id', OrderItemsControllers.deleteOrderItemById);

exports.modules = router;