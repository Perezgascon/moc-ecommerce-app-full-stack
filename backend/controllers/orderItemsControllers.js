// import the model
const { OrderItem } = require('../models/orderItemsModel');
const { Product } = require('../models/productsModel');
const { Order } = require('../models/ordersModel');

// get all order items
exports.getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll();
        res.status(200).json(orderItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get order items with product details
exports.getOrderItemsWithProductDetails = async (req, res) => {
    try {
        const orderItemsWithProductDetails = await OrderItem.findAll({
            include: Product, // Include the Product model to fetch product details
        });
        res.json(orderItemsWithProductDetails);
    } catch (error) {
        console.error('Error fetching order items with product details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// get an order item by id
exports.getOrderItemById = async (req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id);
        if (!orderItem) {
            res.status(404).json({ message: 'Order item not found' });
        } else {
            res.status(200).json(orderItem);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// create a new order item
exports.createOrderItem = async (req, res) => {
    try {
        const orderItem = await OrderItem.create(req.body);
        res.status(201).json(orderItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// update an order item by id
exports.updateOrderItemById = async (req, res) => {
    try {
        const orderItem = await OrderItem.update(req.body, {
            where: {
                orderItemId: req.params.id
            }
        });
        if (!orderItem) {
            res.status(404).json({ message: 'Order item not found' });
        } else {
            res.status(200).json(orderItem);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// delete an order item by id
exports.deleteOrderItemById = async (req, res) => {
    try {
        const orderItem = await OrderItem.destroy({
            where: {
                orderItemId: req.params.id
            }
        });
        if (!orderItem) {
            res.status(404).json({ message: 'Order item not found' });
        } else {
            res.status(200).json({ message: 'Order item deleted' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// POST - /orderitems/:id/add-to-order/:id - add an order item to an order
// router.post('/:orderItemId/add-to-order/:orderId', OrderItemsControllers.addOrderItemToOrder);
exports.addOrderItemToOrder = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const orderId = req.params.orderId;

        // Check if the order exists
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if an OrderItem with the same orderId and productId already exists
        let orderItem = await OrderItem.findOne({
            where: {
                orderId: orderId,
                productId: productId
            }
        });

        if (orderItem) {
            // If exists, update the quantity (or handle according to your business logic)
            orderItem.quantity += quantity;
            await orderItem.save();
            res.status(200).json(orderItem);
        } else {
            // If not exists, create a new OrderItem
            orderItem = await OrderItem.create({
                orderId: orderId,
                productId: productId,
                quantity: quantity
            });
            res.status(200).json(orderItem);
        }
    } catch (error) {
        console.error('Error adding order item to order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
