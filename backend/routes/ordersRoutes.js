const express = require('express');
const router = express.Router();
const OrdersControllers = require('../controllers/ordersControllers');

// get all orders
router.get('/', OrdersControllers.getAllOrders);

// send order email
router.post('/send-email', OrdersControllers.sendOrderEmail);

// get an order by id
router.get('/:id', OrdersControllers.getOrderById);

// create a new order
router.post('/', OrdersControllers.createOrder);

// update an order by id
router.put('/:id', OrdersControllers.updateOrderById);

// delete an order by id
router.delete('/:id', OrdersControllers.deleteOrderById);

// clear an order by id
router.delete('/:id/clear', OrdersControllers.clearOrderById);

// get order total by id

router.get('/:id/total', OrdersControllers.getTotalPriceOrder);


exports.modules = router;