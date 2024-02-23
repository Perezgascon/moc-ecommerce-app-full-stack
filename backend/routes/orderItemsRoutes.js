const express = require('express');
const router = express.Router();
const OrderItemsControllers = require('../controllers/orderItemsControllers');

// get all products
router.get('/', OrderItemsControllers.getAllOrderItems);

// get order items with product details
router.get('/withProductDetails', OrderItemsControllers.getOrderItemsWithProductDetails);

// get a product by id
router.get('/:id', OrderItemsControllers.getOrderItemById);

// create a new product
router.post('/', OrderItemsControllers.createOrderItem);

// update a product by id
router.put('/:id', OrderItemsControllers.updateOrderItemById);

// delete a product by id
router.delete('/:id', OrderItemsControllers.deleteOrderItemById);

// POST - /orderitems/:id/add-to-order/:id - add an order item to an order
router.post('/orders/:orderId/add-item', OrderItemsControllers.addOrderItemToOrder);

exports.modules = router;